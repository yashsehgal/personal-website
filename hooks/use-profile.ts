"use client";

import { useQuery } from "@tanstack/react-query";
import { profileKeys } from "@/features/personal-feed/query-keys";
import { getProfileByUserId } from "@/features/personal-feed/services/profiles";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useProfile(userId: string | undefined) {
  const supabase = useSupabaseBrowser();
  return useQuery({
    queryKey: userId
      ? profileKeys.detail(userId)
      : [...profileKeys.all, "detail", "disabled"],
    queryFn: () => getProfileByUserId(supabase, userId!),
    enabled: Boolean(userId),
  });
}
