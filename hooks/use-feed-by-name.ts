"use client";

import { useQuery } from "@tanstack/react-query";
import { feedKeys } from "@/features/personal-feed/query-keys";
import { getFeedByName } from "@/features/personal-feed/services/feed";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useFeedByName(name: string | undefined) {
  const supabase = useSupabaseBrowser();
  return useQuery({
    queryKey: name
      ? feedKeys.byName(name)
      : [...feedKeys.all, "name", "disabled"],
    queryFn: () => getFeedByName(supabase, name!),
    enabled: Boolean(name),
  });
}
