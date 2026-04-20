"use client";

import { useQuery } from "@tanstack/react-query";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import {
  FEED_MESSAGES_DEFAULT_PAGE_SIZE,
  listMessagesForFeed,
  type IListFeedMessagesOptions,
} from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

/** Messages that are replies to a specific parent message (thread). */
export function useFeedThreadMessages(
  feedId: string | undefined,
  parentMessageId: string | undefined,
  options: Omit<
    IListFeedMessagesOptions,
    "reply_to_message_id" | "roots_only"
  > = {},
) {
  const supabase = useSupabaseBrowser();
  const limit = options.limit ?? FEED_MESSAGES_DEFAULT_PAGE_SIZE;
  const before = options.before ?? null;

  return useQuery({
    queryKey:
      feedId && parentMessageId
        ? [...feedMessageKeys.thread(feedId, parentMessageId), limit, before]
        : [...feedMessageKeys.all, "thread", "disabled"],
    queryFn: () =>
      listMessagesForFeed(supabase, feedId!, {
        ...options,
        limit,
        before: before ?? undefined,
        reply_to_message_id: parentMessageId!,
      }),
    enabled: Boolean(feedId && parentMessageId),
  });
}
