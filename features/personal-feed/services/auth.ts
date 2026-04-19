import type {
  AuthError,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";

/** Normalized profile fields for UI (from auth user + OAuth `user_metadata`). */
export type UserProfile = {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  userMetadata: User["user_metadata"];
};

export function userToProfile(user: User): UserProfile {
  const meta = user.user_metadata ?? {};
  const fullName =
    typeof meta.full_name === "string"
      ? meta.full_name
      : typeof meta.name === "string"
        ? meta.name
        : null;
  const avatarUrl =
    typeof meta.avatar_url === "string"
      ? meta.avatar_url
      : typeof meta.picture === "string"
        ? meta.picture
        : null;
  return {
    id: user.id,
    email: user.email ?? null,
    displayName: fullName ?? (user.email ? user.email.split("@")[0]! : null),
    avatarUrl,
    userMetadata: user.user_metadata ?? {},
  };
}

export type OAuthProvider = "github" | "google";

/** Builds the browser redirect URL Supabase should send users back to after OAuth. */
export function getOAuthCallbackUrl(origin: string, nextPath?: string): string {
  const base = origin.replace(/\/$/, "");
  const url = new URL(`${base}/auth/callback`);
  if (nextPath) {
    url.searchParams.set(
      "next",
      nextPath.startsWith("/") ? nextPath : `/${nextPath}`,
    );
  }
  return url.toString();
}

export async function signInWithOAuth(
  supabase: SupabaseClient,
  provider: OAuthProvider,
  redirectTo: string,
) {
  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
}

export async function signOut(
  supabase: SupabaseClient,
): Promise<{ error: AuthError | null }> {
  return supabase.auth.signOut();
}

export async function getSession(
  supabase: SupabaseClient,
): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getUser(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export type SessionWithProfile = {
  session: Session;
  user: User;
  profile: UserProfile;
};

export async function getSessionWithUserProfile(
  supabase: SupabaseClient,
): Promise<SessionWithProfile | null> {
  const session = await getSession(supabase);
  if (!session) return null;

  const user = await getUser(supabase);
  return {
    session,
    user,
    profile: userToProfile(user),
  };
}
