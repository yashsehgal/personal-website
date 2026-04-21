"use client";

import { FeedMessage } from "@/features/personal-feed/components/feed-messages-view/feed-message-block";
import { FeedMessagesDayDateGroup } from "@/features/personal-feed/components/feed-messages-view/feed-messages-daydate-group";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeedMessagesWithSenderProfiles } from "@/hooks/use-feed-messages-with-sender-profiles";
import { startOfDay, parseISO } from "date-fns";
import { useLayoutEffect, useMemo, useRef } from "react";
import { FeedStartingBlock } from "@/features/personal-feed/components/feed-messages-view/feed-starting-block";
import { useFeed } from "@/hooks/use-feed";

export function FeedMessagesListContainer() {
  const { feedSession } = useManageFeedSessionQueryState();

  const { data: feed } = useFeed(feedSession);

  const { data: feedMessages, isLoading: isFeedMessagesLoading } =
    useFeedMessagesWithSenderProfiles(feedSession, { roots_only: true });

  const safeFeedMessages = useMemo(() => {
    if (isFeedMessagesLoading) return [];
    return feedMessages?.slice().reverse() ?? [];
  }, [feedMessages, isFeedMessagesLoading]);

  const messagesGroupedByDay = useMemo(() => {
    const groups: { day: Date; messages: IFeedMessage[] }[] = [];
    for (const message of safeFeedMessages) {
      const dayStart = startOfDay(parseISO(message.created_at));
      const last = groups.at(-1);
      if (last && last.day.getTime() === dayStart.getTime()) {
        last.messages.push(message);
      } else {
        groups.push({ day: dayStart, messages: [message] });
      }
    }
    return groups;
  }, [safeFeedMessages]);

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
      className="h-[calc(100vh-17rem)] overflow-y-auto no-scrollbar scroll-smooth pt-6 pb-1"
    >
      {feed ? <FeedStartingBlock feed={feed} /> : null}
      {messagesGroupedByDay.map((group) => (
        <FeedMessagesDayDateGroup
          key={group.day.toISOString()}
          timestamp={group.day}
        >
          {group.messages.map((message) => (
            <FeedMessage key={message.id} message={message} />
          ))}
        </FeedMessagesDayDateGroup>
      ))}
    </div>
  );
}
