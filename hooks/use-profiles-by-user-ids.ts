"use client";

import { useQuery } from "@tanstack/react-query";
import { profileKeys } from "@/features/personal-feed/query-keys";
import { listProfilesByUserIds } from "@/features/personal-feed/services/profiles";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useProfilesByUserIds(userIds: string[]) {
  const supabase = useSupabaseBrowser();
  const stableIds = [...new Set(userIds)].filter(Boolean).sort();

  return useQuery({
    queryKey: profileKeys.byUserIds(stableIds),
    queryFn: () => listProfilesByUserIds(supabase, stableIds),
    enabled: stableIds.length > 0,
  });
}
