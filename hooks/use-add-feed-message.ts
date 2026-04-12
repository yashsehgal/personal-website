"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import { addMessageToFeed } from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useAddFeedMessage() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { feedId: string; content: string }) =>
      addMessageToFeed(supabase, vars.feedId, vars.content),
    onSuccess: (_, vars) => {
      void queryClient.invalidateQueries({
        queryKey: feedMessageKeys.forFeed(vars.feedId),
      });
    },
  });
}
