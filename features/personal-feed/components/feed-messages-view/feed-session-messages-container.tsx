"use client";

import { FeedMessageBox } from "@/features/personal-feed/components/feed-messages-view/feed-message-box";
import { FeedMessagesListContainer } from "@/features/personal-feed/components/feed-messages-view/feed-messages-list-container";
import { FeedSessionToolbar } from "@/features/personal-feed/components/feed-session-toolbar";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";

export function FeedSessionMessagesContainer() {
  const { feedSession, isAnyFeedSessionActive } =
    useManageFeedSessionQueryState();

  const showMessageBox = isAnyFeedSessionActive && Boolean(feedSession);

  return (
    <div className="flex min-h-0 min-w-0 flex-2 flex-col divide-y divide-border">
      <FeedSessionToolbar />
      <div className="min-h-0 min-w-0 flex-2 relative">
        <FeedMessagesListContainer key={feedSession} />
        {showMessageBox ? (
          <div className="h-fit w-full absolute bottom-0 left-0 pb-6 px-3">
            <FeedMessageBox key={feedSession} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
