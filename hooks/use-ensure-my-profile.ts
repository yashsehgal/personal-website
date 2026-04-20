"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authKeys, profileKeys } from "@/features/personal-feed/query-keys";
import { ensureMyProfile } from "@/features/personal-feed/services/profiles";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

/** Ensures a `profiles` row exists for the current user (idempotent). */
export function useEnsureMyProfile() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ensureMyProfile(supabase),
    onSuccess: (profile) => {
      void queryClient.invalidateQueries({
        queryKey: profileKeys.detail(profile.id),
      });
      void queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}
