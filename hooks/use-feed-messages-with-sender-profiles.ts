"use client";

import { useMemo } from "react";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useFeedMessages } from "@/hooks/use-feed-messages";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";
import type { IListFeedMessagesOptions } from "@/features/personal-feed/services/feed-messages";

/**
 * Loads feed messages and batches `public.profiles` for non-anonymous senders,
 * merging into `sender_profile` on each message.
 */
export function useFeedMessagesWithSenderProfiles(
  feedId: string | undefined,
  options: IListFeedMessagesOptions = {},
) {
  const messagesQuery = useFeedMessages(feedId, options);

  const senderUserIds = useMemo(() => {
    const ids =
      messagesQuery.data
        ?.map((m) => m.user_id)
        .filter((id): id is string => Boolean(id)) ?? [];
    return [...new Set(ids)];
  }, [messagesQuery.data]);

  const profilesQuery = useProfilesByUserIds(senderUserIds);

  const data = useMemo((): IFeedMessage[] | undefined => {
    if (!messagesQuery.data) return undefined;
    const profileById = new Map(
      (profilesQuery.data ?? []).map((p) => [p.id, p]),
    );
    return messagesQuery.data.map((m) => ({
      ...m,
      sender_profile: m.user_id ? (profileById.get(m.user_id) ?? null) : null,
    }));
  }, [messagesQuery.data, profilesQuery.data]);

  return {
    ...messagesQuery,
    data,
    isError: messagesQuery.isError || profilesQuery.isError,
    error: messagesQuery.error ?? profilesQuery.error,
  };
}
