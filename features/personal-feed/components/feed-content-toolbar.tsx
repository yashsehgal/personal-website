"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeed } from "@/hooks/use-feed";
import { Hashtag } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function FeedContentToolbar() {
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feed, isLoading: isFeedLoading } = useFeed(feedSession);

  if (!feed) return;

  if (isFeedLoading) {
    return (
      <header className="h-12 shrink-0 flex items-center justify-between px-4">
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="w-24 h-6" />
        </div>
      </header>
    );
  }

  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-4">
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-start gap-1.5">
          <HugeiconsIcon
            icon={Hashtag}
            size={16}
            className="text-muted-foreground"
          />
          <p className="text-sm font-medium">{feed.name}</p>
        </div>
      </div>
    </header>
  );
}
