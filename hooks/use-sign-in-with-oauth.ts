"use client";

import { useMutation } from "@tanstack/react-query";
import type { OAuthProvider } from "@/features/personal-feed/services/auth";
import {
  getOAuthCallbackUrl,
  signInWithOAuth,
} from "@/features/personal-feed/services/auth";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useSignInWithOAuth() {
  const supabase = useSupabaseBrowser();

  return useMutation({
    mutationFn: async (provider: OAuthProvider) => {
      const next = `${window.location.pathname}${window.location.search}`;
      const redirectTo = getOAuthCallbackUrl(window.location.origin, next);
      const { data, error } = await signInWithOAuth(
        supabase,
        provider,
        redirectTo,
      );
      if (error) throw error;
      if (data?.url) {
        window.location.assign(data.url);
      }
      return data;
    },
  });
}
