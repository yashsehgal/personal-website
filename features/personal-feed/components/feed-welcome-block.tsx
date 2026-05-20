import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeed } from "@/hooks/use-feed";
import { HashtagIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function FeedWelcomeBlock() {
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feed, isLoading: isFeedLoading } = useFeed(feedSession);

  if (!feed) return null;

  if (isFeedLoading) return <div>loading welcome block</div>;

  return (
    <div className="w-full p-6 flex flex-col items-start gap-2 border-b border-border">
      <div className="size-12 rounded-full shrink-0 bg-muted flex items-center justify-center">
        <HugeiconsIcon icon={HashtagIcon} />
      </div>
      <p className="text-xl font-semibold mt-2">Welcome to #{feed.name}</p>
      <p className="text-muted-foreground">
        This is the start of the #{feed.name} channel.
      </p>
    </div>
  );
}
