"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import { getFeedMessageById } from "@/features/personal-feed/services/feed-messages";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useFeedMessage(messageId: string | undefined) {
  const supabase = useSupabaseBrowser();
  const messageQuery = useQuery({
    queryKey: messageId
      ? feedMessageKeys.detail(messageId)
      : [...feedMessageKeys.all, "detail", "disabled"],
    queryFn: () => getFeedMessageById(supabase, messageId!),
    enabled: Boolean(messageId),
  });

  const senderUserIds = useMemo(() => {
    const userId = messageQuery.data?.user_id;
    return userId ? [userId] : [];
  }, [messageQuery.data?.user_id]);

  const profilesQuery = useProfilesByUserIds(senderUserIds);

  const data = useMemo(() => {
    const message = messageQuery.data;
    if (!message) return message;

    if (!message.user_id) {
      return { ...message, sender_profile: null };
    }

    const profile = profilesQuery.data?.find((p) => p.id === message.user_id) ?? null;
    return { ...message, sender_profile: profile };
  }, [messageQuery.data, profilesQuery.data]);

  return {
    ...messageQuery,
    data,
    isError: messageQuery.isError || profilesQuery.isError,
    error: messageQuery.error ?? profilesQuery.error,
  };
}
