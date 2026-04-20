"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreateFeedMessageInput } from "@/features/personal-feed/interfaces";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import { createFeedMessage } from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

function invalidateAfterMessageChange(
  queryClient: ReturnType<typeof useQueryClient>,
  feedId: string,
  replyToMessageId: string | null | undefined,
) {
  void queryClient.invalidateQueries({
    queryKey: feedMessageKeys.forFeed(feedId),
  });
  if (replyToMessageId) {
    void queryClient.invalidateQueries({
      queryKey: feedMessageKeys.thread(feedId, replyToMessageId),
    });
  }
}

export function useAddFeedMessage() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ICreateFeedMessageInput) =>
      createFeedMessage(supabase, input),
    onSuccess: (msg) => {
      invalidateAfterMessageChange(
        queryClient,
        msg.feed_id,
        msg.reply_to_message_id,
      );
    },
  });
}
