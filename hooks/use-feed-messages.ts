"use client";

import { useQuery } from "@tanstack/react-query";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import {
  FEED_MESSAGES_DEFAULT_PAGE_SIZE,
  listMessagesForFeed,
  type IListFeedMessagesOptions,
} from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useFeedMessages(
  feedId: string | undefined,
  options: IListFeedMessagesOptions = {},
) {
  const supabase = useSupabaseBrowser();
  const limit = options.limit ?? FEED_MESSAGES_DEFAULT_PAGE_SIZE;
  const before = options.before ?? null;

  return useQuery({
    queryKey: feedId
      ? [...feedMessageKeys.forFeed(feedId), limit, before]
      : [...feedMessageKeys.all, "disabled"],
    queryFn: () =>
      listMessagesForFeed(supabase, feedId!, {
        ...options,
        limit,
        before: before ?? undefined,
      }),
    enabled: Boolean(feedId),
  });
}
