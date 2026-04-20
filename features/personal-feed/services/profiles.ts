import type { SupabaseClient } from "@supabase/supabase-js";
import type { IProfile, IUpsertProfileInput } from "@/features/personal-feed/interfaces";

const profileSelect =
  "id, email, full_name, avatar_url, created_at, updated_at" as const;

function mapProfile(row: {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}): IProfile {
  return {
    id: row.id,
    email: row.email,
    full_name: row.full_name,
    avatar_url: row.avatar_url,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getProfileByUserId(
  supabase: SupabaseClient,
  userId: string,
): Promise<IProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select(profileSelect)
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProfile(data) : null;
}

/** Batch fetch for message lists (dedupe ids before calling). */
export async function listProfilesByUserIds(
  supabase: SupabaseClient,
  userIds: string[],
): Promise<IProfile[]> {
  const unique = [...new Set(userIds)].filter(Boolean);
  if (unique.length === 0) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select(profileSelect)
    .in("id", unique);

  if (error) throw error;
  return (data ?? []).map(mapProfile);
}

/** Update the signed-in user's profile row (RLS: own row only). */
export async function updateMyProfile(
  supabase: SupabaseClient,
  patch: IUpsertProfileInput,
): Promise<IProfile> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Must be signed in to update profile");

  const row: Record<string, string | null | undefined> = {};
  if (patch.full_name !== undefined) row.full_name = patch.full_name;
  if (patch.avatar_url !== undefined) row.avatar_url = patch.avatar_url;
  if (patch.email !== undefined) row.email = patch.email;

  if (Object.keys(row).length === 0) {
    const current = await getProfileByUserId(supabase, user.id);
    if (current) return current;
    throw new Error("No profile fields to update");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(row)
    .eq("id", user.id)
    .select(profileSelect)
    .single();

  if (error) throw error;
  return mapProfile(data);
}

/** Insert own profile if missing (e.g. legacy user without trigger row). */
export async function ensureMyProfile(
  supabase: SupabaseClient,
): Promise<IProfile> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Must be signed in");

  const existing = await getProfileByUserId(supabase, user.id);
  if (existing) return existing;

  const row = {
    id: user.id,
    email: user.email ?? null,
    full_name:
      (typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : null) ??
      (typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : null),
    avatar_url:
      (typeof user.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : null) ??
      (typeof user.user_metadata?.picture === "string"
        ? user.user_metadata.picture
        : null),
  };

  const { data, error } = await supabase
    .from("profiles")
    .insert(row)
    .select(profileSelect)
    .single();

  if (!error && data) return mapProfile(data);

  if (error && "code" in error && error.code === "23505") {
    const again = await getProfileByUserId(supabase, user.id);
    if (again) return again;
  }

  if (error) throw error;
  throw new Error("Failed to create profile");
}
