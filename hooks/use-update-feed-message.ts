"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUpdateFeedMessageInput } from "@/features/personal-feed/interfaces";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import { updateFeedMessage } from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useUpdateFeedMessage() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vars: {
      messageId: string;
      feedId: string;
      patch: IUpdateFeedMessageInput;
    }) => {
      return updateFeedMessage(supabase, vars.messageId, vars.patch);
    },
    onSuccess: (msg, vars) => {
      void queryClient.invalidateQueries({
        queryKey: feedMessageKeys.forFeed(vars.feedId),
      });
      void queryClient.invalidateQueries({
        queryKey: feedMessageKeys.detail(vars.messageId),
      });
      if (msg.reply_to_message_id) {
        void queryClient.invalidateQueries({
          queryKey: feedMessageKeys.thread(
            vars.feedId,
            msg.reply_to_message_id,
          ),
        });
      }
    },
  });
}
