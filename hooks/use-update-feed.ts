"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedKeys } from "@/features/personal-feed/query-keys";
import { updateFeed } from "@/features/personal-feed/services/feed";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useUpdateFeed() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: {
      feedId: string;
      patch: Partial<{ name: string; is_public: boolean }>;
    }) => updateFeed(supabase, vars.feedId, vars.patch),
    onSuccess: (feed) => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.all });
      void queryClient.invalidateQueries({
        queryKey: feedKeys.detail(feed.id),
      });
      void queryClient.invalidateQueries({
        queryKey: feedKeys.byName(feed.name),
      });
    },
  });
}
