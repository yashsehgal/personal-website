import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeeds } from "@/hooks/use-feeds";
import { cn } from "@/lib/utils";
import { Hashtag } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MouseEventHandler, useCallback, useMemo } from "react";

export function PublicFeedsListContainer() {
  const { data: allFeeds, isLoading: areAllFeedsLoading } = useFeeds();
  const { checkIfFeedSessionIsActive, openFeedSession } =
    useManageFeedSessionQueryState();

  const safePublicFeeds = useMemo(() => {
    const feeds = allFeeds ?? [];
    return feeds.filter((feed) => feed.is_public);
  }, [allFeeds]);

  const handlePublicFeedClick = useCallback(
    (feedId: string): MouseEventHandler<HTMLButtonElement> => {
      return (): void => {
        if (checkIfFeedSessionIsActive(feedId)) return;
        openFeedSession(feedId);
      };
    },
    [checkIfFeedSessionIsActive, openFeedSession],
  );

  if (areAllFeedsLoading) {
    return (
      <div className="p-2 space-y-1">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <Skeleton className="h-7 w-full bg-foreground/7" key={index} />
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-2">
      {safePublicFeeds.map((feed) => {
        return (
          <Button
            key={feed.id}
            onClick={handlePublicFeedClick(feed.id)}
            className={cn(
              "w-full hover:bg-foreground/5 text-left justify-start transition-none",
              checkIfFeedSessionIsActive(feed.id) && "bg-foreground/5",
            )}
            variant="ghost"
          >
            <HugeiconsIcon icon={Hashtag} className="text-muted-foreground" />
            {feed.name}
          </Button>
        );
      })}
    </div>
  );
}
