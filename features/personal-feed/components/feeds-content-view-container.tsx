"use client";

import { FeedMessageBlock } from "@/features/personal-feed/components/feed-message-block";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeedMessages } from "@/hooks/use-feed-messages";
import { useMemo } from "react";

export function FeedsContentViewContainer() {
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feedMessages } = useFeedMessages(feedSession);

  const feedMessageBlocks = useMemo(() => {
    return feedMessages?.map((message) => (
      <FeedMessageBlock key={message.id} message={message} />
    ));
  }, [feedMessages]);

  return (
    <div className="flex-1 h-full min-h-0 min-w-0 w-full overflow-y-auto bg-foreground/2">
      <div className="w-3xl mx-auto">
        {/* FEED MESSAGE BLOCKS CONTAINER */}
        <div className="space-y-4">{feedMessageBlocks}</div>
      </div>
    </div>
  );
}
