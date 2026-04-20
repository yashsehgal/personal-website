import { FeedMessageBlock } from "@/features/personal-feed/components/feed-message-block";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeedMessagesWithSenderProfiles } from "@/hooks/use-feed-messages-with-sender-profiles";
import { useMemo } from "react";

export function FeedMessagesContentCollectionContainer() {
  const { feedSession } = useManageFeedSessionQueryState();

  const { data: feedMessages, isLoading: isFeedMessagesLoading } =
    useFeedMessagesWithSenderProfiles(feedSession);

  const safeFeedMessages = useMemo(() => {
    if (isFeedMessagesLoading) return [];
    return feedMessages?.slice().reverse() ?? [];
  }, [feedMessages, isFeedMessagesLoading]);

  return (
    <div className="h-[calc(100vh-20rem)] overflow-y-auto no-scrollbar scroll-smooth px-3 pt-3 pb-1">
      {safeFeedMessages.map((message) => {
        return <FeedMessageBlock key={message.id} message={message} />;
      })}
    </div>
  );
}
