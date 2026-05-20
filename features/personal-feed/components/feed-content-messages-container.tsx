"use client";

import { FeedMessageBlock } from "@/features/personal-feed/components/feed-message-block";
import { FeedMessageBox } from "@/features/personal-feed/components/feed-message-box";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeedMessages } from "@/hooks/use-feed-messages";

export function FeedContentMessagesContainer() {
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feedMessages, isLoading: areFeedMessagesLoading } =
    useFeedMessages(feedSession);

  return (
    <div className="flex-1 min-h-0 w-full overflow-y-auto overscroll-y-contain relative space-y-2">
      {feedMessages?.map((message) => {
        return <FeedMessageBlock key={message.id} message={message} />;
      })}

      {/* Feed Messagbox Component */}
      <FeedMessageBox className="absolute bottom-0 left-0" key={feedSession} />
    </div>
  );
}
