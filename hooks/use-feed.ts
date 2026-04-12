"use client";

import { useQuery } from "@tanstack/react-query";
import { feedKeys } from "@/features/personal-feed/query-keys";
import { getFeedById } from "@/features/personal-feed/services/feed";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useFeed(feedId: string | undefined) {
  const supabase = useSupabaseBrowser();
  return useQuery({
    queryKey: feedId
      ? feedKeys.detail(feedId)
      : [...feedKeys.all, "detail", "disabled"],
    queryFn: () => getFeedById(supabase, feedId!),
    enabled: Boolean(feedId),
  });
}
