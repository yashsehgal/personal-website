"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUpsertProfileInput } from "@/features/personal-feed/interfaces";
import { authKeys, profileKeys } from "@/features/personal-feed/query-keys";
import { updateMyProfile } from "@/features/personal-feed/services/profiles";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useUpdateMyProfile() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patch: IUpsertProfileInput) =>
      updateMyProfile(supabase, patch),
    onSuccess: (profile) => {
      void queryClient.invalidateQueries({
        queryKey: profileKeys.detail(profile.id),
      });
      void queryClient.invalidateQueries({ queryKey: profileKeys.all });
      void queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}
