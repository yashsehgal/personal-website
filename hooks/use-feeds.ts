"use client";

import { useQuery } from "@tanstack/react-query";
import { feedKeys } from "@/features/personal-feed/query-keys";
import { listVisibleFeeds } from "@/features/personal-feed/services/feed";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useFeeds() {
  const supabase = useSupabaseBrowser();
  return useQuery({
    queryKey: feedKeys.list(),
    queryFn: () => listVisibleFeeds(supabase),
  });
}
