"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { useFeedMessages } from "@/hooks/use-feed-messages";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { FeedMessageBlockPreviewReplies } from "@/features/personal-feed/components/feed-message-block-preview-replies";
import { FeedReplyManager } from "@/features/personal-feed/components/feed-reply-manager";

interface FeedMessageBlockProps {
  message: IFeedMessage;
  isMessageReply?: boolean;
}

export function FeedMessageBlock({
  message,
  isMessageReply = false,
}: FeedMessageBlockProps) {
  const { feedSession } = useManageFeedSessionQueryState();
  const { data: feedMessages = [] } = useFeedMessages(feedSession);

  const { data: senderProfiles = [] } = useProfilesByUserIds(
    message.user_id ? [message.user_id] : [],
  );

  const senderProfile = senderProfiles[0] ?? message.sender_profile;

  const safeSenderDisplayName = useMemo(() => {
    if (message.user_id) {
      return (
        senderProfile?.full_name ??
        senderProfile?.email?.split("@")[0] ??
        "Unknown User"
      );
    }
    return "Anonymous User";
  }, [message.user_id, senderProfile?.email, senderProfile?.full_name]);

  const safeSenderProfileAvatar = useMemo(() => {
    return senderProfile?.avatar_url ?? undefined;
  }, [senderProfile?.avatar_url]);

  const safeCreatedAt = useMemo(() => {
    return formatDistanceToNow(new Date(message.created_at), {
      addSuffix: true,
      includeSeconds: true,
    });
  }, [message.created_at]);

  const safeRepliesUnderThisMessage = useMemo(() => {
    return feedMessages
      .filter((feedMessage) => feedMessage.reply_to_message_id === message.id)
      .sort(
        (messageA, messageB) =>
          new Date(messageA.created_at).getTime() -
          new Date(messageB.created_at).getTime(),
      );
  }, [feedMessages, message.id]);

  const safeShowRepliesManager = useMemo(() => {
    return !isMessageReply;
  }, [isMessageReply]);

  const safeShowPreviewReplies = useMemo(() => {
    return safeRepliesUnderThisMessage.length > 0 && !isMessageReply;
  }, [isMessageReply, safeRepliesUnderThisMessage]);

  return (
    <div
      className={cn(
        "rounded-md bg-background overflow-hidden divide-y divide-border/40",
        isMessageReply
          ? "border-none"
          : "border border-border/50 divide-y divide-border/50 drop-shadow-xs",
      )}
    >
      <div
        className={cn(
          "w-full px-4 py-4 space-y-2",
          isMessageReply && "px-4 py-2.5",
        )}
      >
        <div className="w-full flex items-center justify-start gap-2">
          <Avatar size="sm" className={cn(isMessageReply && "size-5!")}>
            <AvatarImage
              src={safeSenderProfileAvatar}
              alt={safeSenderDisplayName}
            />
            <AvatarFallback>{safeSenderDisplayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium leading-0">
            {safeSenderDisplayName}
          </p>
          <p className="text-xs text-muted-foreground leading-0 mt-px">
            {safeCreatedAt}
          </p>
        </div>
        <pre
          className={cn(
            "text-sm whitespace-pre-wrap font-sans leading-6",
            isMessageReply ? "ml-[30px]" : "ml-[34px]",
          )}
        >
          {message.content}
        </pre>
      </div>
      {safeShowPreviewReplies ? (
        <div className="p-1 flex items-center">
          <FeedMessageBlockPreviewReplies
            replies={safeRepliesUnderThisMessage}
          />
        </div>
      ) : null}
      {safeShowRepliesManager ? (
        <div className="p-1">
          <FeedReplyManager message={message} />
        </div>
      ) : null}
    </div>
  );
}
