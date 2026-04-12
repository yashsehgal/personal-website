import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ICreateFeedInput,
  IFeed,
} from "@/features/personal-feed/interfaces";

function mapFeed(row: {
  id: string;
  created_at: string;
  name: string;
  is_public: boolean;
  created_by_user_id: string | null;
}): IFeed {
  return {
    id: row.id,
    created_at: row.created_at,
    name: row.name,
    is_public: row.is_public,
    created_by_user_id: row.created_by_user_id,
  };
}

/** Lists feeds visible to the current Supabase session (public feeds + own private feeds when signed in). */
export async function listVisibleFeeds(
  supabase: SupabaseClient,
): Promise<IFeed[]> {
  const { data, error } = await supabase
    .from("feeds")
    .select("id, created_at, name, is_public, created_by_user_id")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapFeed);
}

export async function getFeedById(
  supabase: SupabaseClient,
  feedId: string,
): Promise<IFeed | null> {
  const { data, error } = await supabase
    .from("feeds")
    .select("id, created_at, name, is_public, created_by_user_id")
    .eq("id", feedId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapFeed(data) : null;
}

export async function getFeedByName(
  supabase: SupabaseClient,
  name: string,
): Promise<IFeed | null> {
  const { data, error } = await supabase
    .from("feeds")
    .select("id, created_at, name, is_public, created_by_user_id")
    .eq("name", name)
    .maybeSingle();

  if (error) throw error;
  return data ? mapFeed(data) : null;
}

export async function createFeed(
  supabase: SupabaseClient,
  input: ICreateFeedInput,
): Promise<IFeed> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Must be signed in to create a feed");

  const { data, error } = await supabase
    .from("feeds")
    .insert({
      name: input.name,
      is_public: input.is_public,
      created_by_user_id: user.id,
    })
    .select("id, created_at, name, is_public, created_by_user_id")
    .single();

  if (error) throw error;
  return mapFeed(data);
}

export async function updateFeed(
  supabase: SupabaseClient,
  feedId: string,
  patch: Partial<Pick<ICreateFeedInput, "name" | "is_public">>,
): Promise<IFeed> {
  const { data, error } = await supabase
    .from("feeds")
    .update(patch)
    .eq("id", feedId)
    .select("id, created_at, name, is_public, created_by_user_id")
    .single();

  if (error) throw error;
  return mapFeed(data);
}

export async function deleteFeed(
  supabase: SupabaseClient,
  feedId: string,
): Promise<void> {
  const { error } = await supabase.from("feeds").delete().eq("id", feedId);
  if (error) throw error;
}
