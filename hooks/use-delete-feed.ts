"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedKeys, feedMessageKeys } from "@/features/personal-feed/query-keys";
import { deleteFeed } from "@/features/personal-feed/services/feed";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useDeleteFeed() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedId: string) => deleteFeed(supabase, feedId),
    onSuccess: (_, feedId) => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.all });
      void queryClient.invalidateQueries({ queryKey: feedKeys.detail(feedId) });
      void queryClient.invalidateQueries({
        queryKey: feedMessageKeys.forFeed(feedId),
      });
    },
  });
}
