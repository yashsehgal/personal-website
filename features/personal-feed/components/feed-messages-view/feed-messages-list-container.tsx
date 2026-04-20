"use client";

import { FeedMessage } from "@/features/personal-feed/components/feed-messages-view/feed-message-block";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeedMessagesWithSenderProfiles } from "@/hooks/use-feed-messages-with-sender-profiles";
import { useLayoutEffect, useMemo, useRef } from "react";

export function FeedMessagesListContainer() {
  const { feedSession } = useManageFeedSessionQueryState();

  const { data: feedMessages, isLoading: isFeedMessagesLoading } =
    useFeedMessagesWithSenderProfiles(feedSession);

  const safeFeedMessages = useMemo(() => {
    if (isFeedMessagesLoading) return [];
    return feedMessages?.slice().reverse() ?? [];
  }, [feedMessages, isFeedMessagesLoading]);

  const scrollRootRef = useRef<HTMLDivElement>(null);
  const lastMessageId = safeFeedMessages.at(-1)?.id;

  useLayoutEffect(() => {
    const el = scrollRootRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
  }, [lastMessageId, safeFeedMessages.length, feedSession]);

  return (
    <div
      ref={scrollRootRef}
      className="h-[calc(100vh-17rem)] overflow-y-auto no-scrollbar scroll-smooth pt-3 pb-1"
    >
      {safeFeedMessages.map((message) => {
        return <FeedMessage key={message.id} message={message} />;
      })}
    </div>
  );
}
