"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  authKeys,
  feedKeys,
  feedMessageKeys,
} from "@/features/personal-feed/query-keys";
import { signOut } from "@/features/personal-feed/services/auth";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useSignOut() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await signOut(supabase);
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authKeys.session() });
      void queryClient.invalidateQueries({ queryKey: feedKeys.all });
      void queryClient.invalidateQueries({ queryKey: feedMessageKeys.all });
    },
  });
}
