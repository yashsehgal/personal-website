"use client";

import { Button } from "@/components/ui/button";
import { FeedMessage } from "@/features/personal-feed/components/feed-messages-view/feed-message-block";
import { FeedMessageBox } from "@/features/personal-feed/components/feed-messages-view/feed-message-box";
import { useManageFeedMessageThreadQueryState } from "@/features/personal-feed/hooks/use-manage-feed-message-thread-query-state";
import { useFeedMessage } from "@/hooks/use-feed-message";
import { X } from "lucide-react";

export function FeedThreadContainer() {
  const { activeThreadMessageId, closeThread } =
    useManageFeedMessageThreadQueryState();
  const { data: threadRootMessage } = useFeedMessage(
    activeThreadMessageId || undefined,
  );

  return (
    <div className="min-h-0 min-w-0 flex-1 divide-y divide-border flex flex-col justify-start items-stretch">
      <div className="flex h-12 w-full shrink-0 items-center justify-between bg-linear-to-b from-white to-transparent px-3 backdrop-blur-lg">
        <div className="flex items-center justify-start gap-2">
          <p className="text-sm font-medium select-none">Thread</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close thread"
            onClick={closeThread}
          >
            <X />
          </Button>
        </div>
      </div>
      <div className="min-h-0 min-w-0 h-full relative">
        <div className="min-h-0 min-w-0 overflow-y-auto no-scrollbar scroll-smooth">
          {threadRootMessage ? (
            <FeedMessage message={threadRootMessage} insideThread />
          ) : null}
        </div>
        <div className="h-fit w-full pb-6 px-3 absolute bottom-0">
          <FeedMessageBox key={activeThreadMessageId} insideThread />
        </div>
      </div>
    </div>
  );
}
