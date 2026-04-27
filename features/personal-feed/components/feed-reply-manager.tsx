"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useAddFeedMessage } from "@/hooks/use-add-feed-message";
import { useAuthSessionWithProfile } from "@/hooks/use-auth-session-with-profile";
import { useSoundEffect } from "@/hooks/use-sound-effect";
import { ArrowUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface FeedReplyManagerProps {
  message: IFeedMessage;
}

export function FeedReplyManager({ message }: FeedReplyManagerProps) {
  const [replyContent, setReplyContent] = useState<string>("");
  const { data: authSessionWithProfile } = useAuthSessionWithProfile();
  const { mutateAsync: addFeedMessage, isPending: isReplySubmitting } =
    useAddFeedMessage();
  const { playSoundEffect } = useSoundEffect();

  const handleReplyContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReplyContent(event.target.value);
  };

  const safeCurrentAuthenticatedUserAvatarUrl = useMemo(() => {
    return authSessionWithProfile?.profile.avatarUrl ?? undefined;
  }, [authSessionWithProfile?.profile.avatarUrl]);

  const safeCurrentAuthenticatedUserDisplayName = useMemo(() => {
    if (authSessionWithProfile) {
      return (
        authSessionWithProfile?.profile.displayName ??
        authSessionWithProfile?.profile.email?.split("@")[0] ??
        "Unknown User"
      );
    }

    return "Anonymous User";
  }, [authSessionWithProfile]);

  const safeHasReplyContent = useMemo(() => {
    return replyContent.trim() !== "";
  }, [replyContent]);

  const handleSendReply = useCallback(async () => {
    const trimmedReplyContent = replyContent.trim();
    if (!trimmedReplyContent) return;

    await addFeedMessage({
      feed_id: message.feed_id,
      content: trimmedReplyContent,
      reply_to_message_id: message.id,
    });

    playSoundEffect("MESSAGE_REPLY_SEND");
    setReplyContent("");
  }, [
    addFeedMessage,
    message.feed_id,
    message.id,
    playSoundEffect,
    replyContent,
  ]);

  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-start justify-start gap-2.5 flex-1">
        <Tooltip>
          <TooltipTrigger
            render={
              <Avatar size="sm" className="size-5!">
                <AvatarImage src={safeCurrentAuthenticatedUserAvatarUrl} />
                <AvatarFallback>
                  {safeCurrentAuthenticatedUserDisplayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            }
          />
          <TooltipContent>
            Replying as {safeCurrentAuthenticatedUserDisplayName}
          </TooltipContent>
        </Tooltip>
        <Textarea
          onChange={handleReplyContentChange}
          value={replyContent}
          className="resize-none w-full rounded-none bg-transparent p-0 -mt-px min-h-4 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent"
          placeholder="Leave a reply..."
        />
      </div>
      <Button
        size="icon-xs"
        variant={safeHasReplyContent ? "default" : "ghost"}
        disabled={!safeHasReplyContent || isReplySubmitting}
        onClick={handleSendReply}
      >
        <ArrowUp />
      </Button>
    </div>
  );
}
