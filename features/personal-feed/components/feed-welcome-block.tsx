import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeed } from "@/hooks/use-feed";

export function FeedWelcomeBlock() {
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feed, isLoading: isFeedLoading } = useFeed(feedSession);

  if (!feed) return null;

  return <div></div>;
}
