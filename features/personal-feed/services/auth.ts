import type { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";

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
