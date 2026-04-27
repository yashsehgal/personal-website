"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IFeedMessage } from "@/features/personal-feed/interfaces";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";

interface FeedMessageBlockProps {
  message: IFeedMessage;
}

export function FeedMessageBlock({ message }: FeedMessageBlockProps) {
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

  return (
    <div className="drop-shadow-xs border border-border/30 rounded-md bg-background overflow-hidden divide-y divide-border/40">
      <div className={cn("w-full px-6 py-4", "space-y-4")}>
        <div className="w-full flex items-center justify-start gap-2">
          <Avatar size="sm">
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
        <pre className="text-sm whitespace-pre-wrap font-sans leading-6">
          {message.content}
        </pre>
      </div>
      <div className="h-8"></div>
    </div>
  );
}
