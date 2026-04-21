import { Button } from "@/components/ui/button";
import { FeedMessageMoreActionsDropdown } from "@/features/personal-feed/components/feed-messages-view/feed-message-more-actions-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useManageFeedMessageThreadQueryState } from "@/features/personal-feed/hooks/use-manage-feed-message-thread-query-state";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Bookmark, CornerDownRight, TextQuote } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const safeAvatarFallback = useMemo(() => {
    if (isAnonymous) return "A";
    if (!sender) return "M";
    return sender.full_name?.charAt(0) ?? "M";
  }, [isAnonymous, sender]);

  const safeAvatarImageUrl = useMemo(() => {
    if (isAnonymous) return undefined;
    if (!sender) return undefined;
    return sender.avatar_url ?? undefined;
  }, [isAnonymous, sender]);

  return (
    <div
      key={message.id}
      aria-description={message.content}
      className={cn(
        "w-full h-fit relative px-6 py-2.5 items-start flex flex-col justify-start gap-2",
        "hover:bg-muted",
        insideThread && "px-5 py-2",
      )}
      onMouseEnter={handleMessageBlockMouseEnter}
      onMouseLeave={handleMessageBlockMouseLeave}
    >
      <div className="flex items-center gap-1.5 justify-start">
        <Avatar size="sm" className="size-5!">
          <AvatarImage src={safeAvatarImageUrl} alt={safeAvatarFallback} />
          <AvatarFallback>{safeAvatarFallback}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-sm shrink-0">{primaryLabel}</p>
        <Tooltip>
          <TooltipTrigger
            render={
              <p className="text-xs text-muted-foreground mt-px cursor-default shrink-0 ml-1">
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
                  size="xs"
                  variant="ghost"
                  aria-label="Reply in thread"
                  className="gap-2"
                  onClick={() => {
                    openThread(message.id);
                  }}
                >
                  <CornerDownRight />
                  Reply
                </Button>
              }
            />
            <TooltipContent>Reply in thread</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <FeedMessageMoreActionsDropdown
                  message={message}
                  onReplyInThread={() => {
                    openThread(message.id);
                  }}
                />
              }
            />
            <TooltipContent>More options</TooltipContent>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
}
