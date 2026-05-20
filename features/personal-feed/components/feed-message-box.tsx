"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useAddFeedMessage } from "@/hooks/use-add-feed-message";
import { useFeed } from "@/hooks/use-feed";
import { cn } from "@/lib/utils";
import { ArrowUp02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChangeEvent, useMemo, useState } from "react";

type FeedMessageBoxProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>;

export function FeedMessageBox({ className, ...props }: FeedMessageBoxProps) {
  const [messageInput, setMessageInput] = useState<string>("");
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feed } = useFeed(feedSession);
  const { mutate: addFeedMessage, isPending: isSendingMessage } =
    useAddFeedMessage();

  const handleMessageInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessageInput(value);
  };

  const handleSendMessage = () => {
    if (!feed || !messageInput.trim() || isSendingMessage) return;

    addFeedMessage(
      { feed_id: feed.id, content: messageInput },
      { onSuccess: () => setMessageInput("") },
    );
  };

  const safeDisableMessageSendButton = useMemo(() => {
    if (!feed || isSendingMessage) return true;
    return !messageInput.trim().length;
  }, [messageInput, feed, isSendingMessage]);

  if (!feed) return;

  return (
    <div
      className={cn(
        "w-full p-4 bg-linear-to-b from-transparent to-background backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <div className="w-full bg-background border border-border rounded-lg py-2 pl-3 pr-2 flex items-end justify-between">
        <Textarea
          autoFocus
          value={messageInput}
          onChange={handleMessageInputChange}
          disabled={isSendingMessage}
          placeholder={`Message in #${feed.name}`}
          className="resize-none text-base! flex-1 min-h-8 mb-0.5 border-transparent focus-visible:ring-0 focus-visible:border-transparent p-0.5"
        />
        <div className="flex items-center justify-end gap-1.5">
          <Button
            size="icon-lg"
            type="button"
            onClick={handleSendMessage}
            disabled={safeDisableMessageSendButton}
          >
            <HugeiconsIcon icon={ArrowUp02Icon} />
          </Button>
        </div>
      </div>
    </div>
  );
}
