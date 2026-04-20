"use client";

import { useQuery } from "@tanstack/react-query";
import { feedMessageKeys } from "@/features/personal-feed/query-keys";
import { getFeedMessageById } from "@/features/personal-feed/services/feed-messages";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useFeedMessage(messageId: string | undefined) {
  const supabase = useSupabaseBrowser();
  return useQuery({
    queryKey: messageId
      ? feedMessageKeys.detail(messageId)
      : [...feedMessageKeys.all, "detail", "disabled"],
    queryFn: () => getFeedMessageById(supabase, messageId!),
    enabled: Boolean(messageId),
  });
}
