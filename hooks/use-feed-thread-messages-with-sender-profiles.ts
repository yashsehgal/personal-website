"use client";

import { useMemo } from "react";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useFeedThreadMessages } from "@/hooks/use-feed-thread-messages";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";

export function useFeedThreadMessagesWithSenderProfiles(
  feedId: string | undefined,
  parentMessageId: string | undefined,
) {
  const threadMessagesQuery = useFeedThreadMessages(feedId, parentMessageId);

  const senderUserIds = useMemo(() => {
    const ids =
      threadMessagesQuery.data
        ?.map((m) => m.user_id)
        .filter((id): id is string => Boolean(id)) ?? [];
    return [...new Set(ids)];
  }, [threadMessagesQuery.data]);

  const profilesQuery = useProfilesByUserIds(senderUserIds);

  const data = useMemo((): IFeedMessage[] | undefined => {
    if (!threadMessagesQuery.data) return undefined;
    const profileById = new Map((profilesQuery.data ?? []).map((p) => [p.id, p]));
    return threadMessagesQuery.data.map((m) => ({
      ...m,
      sender_profile: m.user_id ? (profileById.get(m.user_id) ?? null) : null,
    }));
  }, [threadMessagesQuery.data, profilesQuery.data]);

  return {
    ...threadMessagesQuery,
    data,
    isError: threadMessagesQuery.isError || profilesQuery.isError,
    error: threadMessagesQuery.error ?? profilesQuery.error,
  };
}
