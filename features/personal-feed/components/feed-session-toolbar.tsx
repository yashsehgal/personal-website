import { Skeleton } from "@/components/ui/skeleton";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeed } from "@/hooks/use-feed";
import { Globe, Hash, Lock } from "lucide-react";
import { useMemo } from "react";

export function FeedSessionToolbar() {
  const { feedSession, isAnyFeedSessionActive } =
    useManageFeedSessionQueryState();

  const { data: feed, isLoading: isFeedLoading } = useFeed(feedSession);

  const safeFeedName = useMemo(() => {
    if (!isAnyFeedSessionActive) {
      return "";
    }

    return feed?.name ?? "Untitled Feed";
  }, [feed, isAnyFeedSessionActive]);

  if (isFeedLoading) {
    return (
      <header className="flex h-12 w-full shrink-0 items-center justify-between bg-linear-to-b from-white to-transparent px-3 backdrop-blur-lg">
        <div className="flex items-center justify-start gap-2">
          <div className="flex items-center justify-start gap-1">
            <Hash className="size-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2" />
      </header>
    );
  }

  return (
    <header className="flex h-12 w-full shrink-0 items-center justify-between bg-linear-to-b from-white to-transparent px-3 backdrop-blur-lg">
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-start gap-1">
          <Hash className="size-4 shrink-0" />
          <p className="text-sm font-medium select-none">{safeFeedName}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        {Boolean(feed?.is_public) ? (
          <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
            <Globe className="size-3.5 shrink-0" />
            <p className="text-sm select-none">Public</p>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-1.5 text-muted-foreground">
            <Lock className="size-3.5 shrink-0" />
            <p className="text-sm select-none">Private channel</p>
          </div>
        )}
      </div>
    </header>
  );
}
