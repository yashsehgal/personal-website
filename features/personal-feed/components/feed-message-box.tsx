"use client";

import { Textarea } from "@/components/ui/textarea";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeed } from "@/hooks/use-feed";
import { useEffect, useMemo, useRef } from "react";

export function FeedMessageBox() {
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feed, isLoading: isFeedLoading } = useFeed(feedSession);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const safeFeedName = useMemo(() => {
    if (isFeedLoading) {
      return "";
    }

    return feed?.name ?? "Untitled Feed";
  }, [feed, isFeedLoading]);

  useEffect(() => {
    if (isFeedLoading) return;
    const el = textareaRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [isFeedLoading]);

  return (
    <div className="w-full h-fit border border-border rounded-lg divide-y divide-border">
      <div className="w-full p-2"></div>
      <Textarea
        ref={textareaRef}
        disabled={isFeedLoading}
        aria-busy={isFeedLoading}
        className="resize-none min-h-24 max-h-64 w-full rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent"
        placeholder={`Write a message to #${safeFeedName}`}
      />
    </div>
  );
}
