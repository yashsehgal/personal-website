"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FeedMessage } from "@/features/personal-feed/components/feed-messages-view/feed-message-block";
import { FeedMessageBox } from "@/features/personal-feed/components/feed-messages-view/feed-message-box";
import { useManageFeedMessageThreadQueryState } from "@/features/personal-feed/hooks/use-manage-feed-message-thread-query-state";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeedMessage } from "@/hooks/use-feed-message";
import { useFeedThreadMessagesWithSenderProfiles } from "@/hooks/use-feed-thread-messages-with-sender-profiles";
import { X } from "lucide-react";
import { useMemo } from "react";

export function FeedThreadContainer() {
  const { activeThreadMessageId, closeThread } =
    useManageFeedMessageThreadQueryState();
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: threadRootMessage } = useFeedMessage(
    activeThreadMessageId || undefined,
  );
  const { data: threadMessages } = useFeedThreadMessagesWithSenderProfiles(
    feedSession || undefined,
    activeThreadMessageId || undefined,
  );

  const safeThreadMessages = useMemo(() => {
    return threadMessages?.slice().reverse() ?? [];
  }, [threadMessages]);

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
        <div className="min-h-0 min-w-0 overflow-y-auto no-scrollbar scroll-smooth py-2.5">
          {threadRootMessage ? (
            <FeedMessage message={threadRootMessage} insideThread />
          ) : null}
          <div className="flex items-center justify-start gap-3 px-3.5 my-2 select-none">
            <p className="text-xs text-muted-foreground">
              {`${safeThreadMessages.length} ${safeThreadMessages.length === 1 ? "reply" : "replies"} in this thread`}
            </p>
            <Separator orientation="horizontal" className="flex-1" />
          </div>
          {safeThreadMessages.map((message) => (
            <FeedMessage key={message.id} message={message} insideThread />
          ))}
        </div>
        <div className="h-fit w-full pb-6 px-3 absolute bottom-0">
          <FeedMessageBox
            key={activeThreadMessageId}
            insideThread
            replyToMessageId={activeThreadMessageId}
          />
        </div>
      </div>
    </div>
  );
}
