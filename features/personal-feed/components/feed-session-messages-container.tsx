"use client";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";

export function FeedSessionMessagesContainer() {
  const { isAnyFeedSessionActive } = useManageFeedSessionQueryState();

  if (!isAnyFeedSessionActive) {
    return null;
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row items-stretch divide-x divide-border pt-12">
      <div className="min-h-0 min-w-0 flex-2" />
      <div className="min-h-0 min-w-0 flex-1" />
    </div>
  );
}
