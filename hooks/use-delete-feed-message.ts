"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import { deleteFeedMessage } from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useDeleteFeedMessage() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: { messageId: string; feedId: string }) => {
      const deleted = await deleteFeedMessage(supabase, vars.messageId);
      return {
        ...vars,
        replyToMessageId: deleted.reply_to_message_id,
      };
    },
    onSuccess: (result) => {
      void queryClient.invalidateQueries({
        queryKey: feedMessageKeys.forFeed(result.feedId),
      });
      void queryClient.invalidateQueries({
        queryKey: feedMessageKeys.detail(result.messageId),
      });
      if (result.replyToMessageId) {
        void queryClient.invalidateQueries({
          queryKey: feedMessageKeys.thread(
            result.feedId,
            result.replyToMessageId,
          ),
        });
      }
    },
  });
}
