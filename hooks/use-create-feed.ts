"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreateFeedInput } from "@/features/personal-feed/interfaces";
import { feedKeys } from "@/features/personal-feed/query-keys";
import { createFeed } from "@/features/personal-feed/services/feed";
import { useSupabaseBrowser } from "@/hooks/use-supabase-browser";

export function useCreateFeed() {
  const supabase = useSupabaseBrowser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ICreateFeedInput) => createFeed(supabase, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.all });
    },
  });
}
