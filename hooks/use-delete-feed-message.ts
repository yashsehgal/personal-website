"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import { deleteFeedMessage } from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useDeleteFeedMessage() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { messageId: string; feedId: string }) =>
      deleteFeedMessage(supabase, vars.messageId),
    onSuccess: (_, vars) => {
      void queryClient.invalidateQueries({
        queryKey: feedMessageKeys.forFeed(vars.feedId),
      });
    },
  });
}
