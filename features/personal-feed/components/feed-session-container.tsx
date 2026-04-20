"use client";

import { FeedSessionMessagesContainer } from "@/features/personal-feed/components/feed-session-messages-container";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";

export function FeedSessionContainer() {
  const { isAnyFeedSessionActive } = useManageFeedSessionQueryState();

  if (!isAnyFeedSessionActive) {
    return null;
  }

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-row items-stretch divide-x divide-border">
      <FeedSessionMessagesContainer />
      <div className="min-h-0 min-w-0 flex-1" />
    </div>
  );
}
