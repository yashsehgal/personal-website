"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";
import { CornerDownRight } from "lucide-react";
import { useMemo } from "react";

interface FeedMessageBlockPreviewRepliesProps {
  replies: IFeedMessage[];
}

export function FeedMessageBlockPreviewReplies({
  replies,
}: FeedMessageBlockPreviewRepliesProps) {
  const safeRepliesCount = useMemo(() => {
    return replies.length;
  }, [replies]);

  if (safeRepliesCount === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className="w-full h-fit py-1 rounded-md flex items-center justify-between gap-2 text-muted-foreground group/message-block-preview-replies-button"
            size="xs"
            variant="ghost"
            withoutMicroInteractions
          >
            <div className="flex items-center justify-start gap-2">
              <CornerDownRight className="size-3" />
              <SafeRepliesAvatarContainer replies={replies} />
              <p className="text-xs leading-0">{safeRepliesCount} replies</p>
            </div>
            <p className="text-xs group-hover/message-block-preview-replies-button:visible invisible leading-0 text-muted-foreground">
              View replies
            </p>
          </Button>
        }
      />
      <TooltipContent>
        This message has {safeRepliesCount} replies. Click to reply
      </TooltipContent>
    </Tooltip>
  );
}

interface SafeRepliesAvatarContainerProps {
  replies: IFeedMessage[];
}

function SafeRepliesAvatarContainer({
  replies,
}: SafeRepliesAvatarContainerProps) {
  const replyUserIds = useMemo(() => {
    return [
      ...new Set(
        replies
          .map((reply) => reply.user_id)
          .filter((userId): userId is string => !!userId),
      ),
    ];
  }, [replies]);

  const { data: replyProfiles = [] } = useProfilesByUserIds(replyUserIds);

  const safePreviewProfiles = useMemo(() => {
    if (replyProfiles.length > 0) return replyProfiles.slice(0, 3);

    // Fallback when replies include sender_profile inline but query profile rows are not ready.
    return replies
      .map((reply) => reply.sender_profile)
      .filter((profile): profile is NonNullable<typeof profile> => !!profile)
      .slice(0, 3);
  }, [replies, replyProfiles]);

  return (
    <div className="flex items-center justify-start gap-1">
      {safePreviewProfiles.map((profile) => (
        <Avatar key={profile.id} size="sm" className="size-4!">
          <AvatarImage
            src={profile.avatar_url ?? undefined}
            alt="Reply user avatar"
          />
          <AvatarFallback>
            {(
              profile.full_name?.charAt(0) ??
              profile.email?.charAt(0) ??
              "R"
            ).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
