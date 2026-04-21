"use client";

import { FeedSessionMessagesContainer } from "@/features/personal-feed/components/feed-messages-view/feed-session-messages-container";
import { FeedThreadContainer } from "@/features/personal-feed/components/feed-messages-view/feed-thread-container";
import { useManageFeedMessageThreadQueryState } from "@/features/personal-feed/hooks/use-manage-feed-message-thread-query-state";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { cn } from "@/lib/utils";

export function FeedSessionContainer() {
  const { isAnyFeedSessionActive } = useManageFeedSessionQueryState();
  const { isActiveThread } = useManageFeedMessageThreadQueryState();

  if (!isAnyFeedSessionActive) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex min-h-0 w-full min-w-0 flex-1 flex-row items-stretch",
        isActiveThread && "divide-x divide-border",
      )}
    >
      <FeedSessionMessagesContainer />
      {isActiveThread ? <FeedThreadContainer /> : null}
    </div>
  );
}
