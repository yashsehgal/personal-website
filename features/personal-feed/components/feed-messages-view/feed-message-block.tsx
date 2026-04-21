import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useManageFeedMessageThreadQueryState } from "@/features/personal-feed/hooks/use-manage-feed-message-thread-query-state";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Bookmark, CornerDownRight, Ellipsis, TextQuote } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface FeedMessageProps {
  message: IFeedMessage;
  insideThread?: boolean;
}

export function FeedMessage({
  message,
  insideThread = false,
}: FeedMessageProps) {
  const [isMessageBlockHovered, setIsMessageBlockHovered] =
    useState<boolean>(false);
  const { openThread } = useManageFeedMessageThreadQueryState();

  const sender = message.sender_profile;
  const isAnonymous = message.user_id == null;

  const primaryLabel = (() => {
    if (isAnonymous) return "Anonymous";
    if (!sender) return "Member";
    const name = sender.full_name?.trim();
    const email = sender.email?.trim();
    if (name) return name;
    if (email) return email;
    return "Member";
  })();

  const safeMessageTimestamp = useMemo(() => {
    const date = formatDate(message.created_at, "h:mm a");
    return date;
  }, [message.created_at]);

  const handleMessageBlockMouseEnter = useCallback((): void => {
    setIsMessageBlockHovered(true);
  }, []);

  const handleMessageBlockMouseLeave = useCallback((): void => {
    setIsMessageBlockHovered(false);
  }, []);

  const safeShowMessageBlockHoverActions = useMemo(() => {
    return Boolean(!insideThread && isMessageBlockHovered);
  }, [insideThread, isMessageBlockHovered]);

  return (
    <div
      className={cn(
        "w-full h-fit relative px-10 py-2.5 items-start flex flex-col justify-start gap-2",
        "hover:bg-muted",
        insideThread && "p-5",
      )}
      aria-description={message.content}
      onMouseEnter={handleMessageBlockMouseEnter}
      onMouseLeave={handleMessageBlockMouseLeave}
    >
      <div className="flex items-center gap-2 justify-start">
        <p className="font-semibold text-sm shrink-0 text-pink-600">
          {primaryLabel}
        </p>
        <Tooltip>
          <TooltipTrigger
            render={
              <p className="text-xs text-muted-foreground mt-px cursor-default shrink-0">
                {safeMessageTimestamp}
              </p>
            }
          />
          <TooltipContent>
            {formatDate(message.created_at, "MMM d, yyyy, h:mm a")}
          </TooltipContent>
        </Tooltip>
      </div>
      <pre className="text-sm whitespace-pre-wrap font-sans flex-1 px-px leading-6">
        {message.content}
      </pre>
      {safeShowMessageBlockHoverActions ? (
        <div
          className={cn(
            "size-fit p-1 rounded-full bg-background border border-border absolute -top-4 right-6 flex items-center",
          )}
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Reply in thread"
                  onClick={() => {
                    openThread(message.id);
                  }}
                >
                  <CornerDownRight />
                </Button>
              }
            />
            <TooltipContent>Reply in thread</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button size="icon-sm" variant="ghost">
                  <TextQuote />
                </Button>
              }
            />
            <TooltipContent>Quote in a new message</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button size="icon-sm" variant="ghost">
                  <Bookmark />
                </Button>
              }
            />
            <TooltipContent>Save this message</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button size="icon-sm" variant="ghost">
                  <Ellipsis />
                </Button>
              }
            />
            <TooltipContent>More options</TooltipContent>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
}
