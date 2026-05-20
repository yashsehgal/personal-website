import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IFeedMessage } from "@/features/personal-feed/interfaces";
import { cn } from "@/lib/utils";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";

interface FeedMessageBlockProps {
  message: IFeedMessage;
}

export function FeedMessageBlock({ message }: FeedMessageBlockProps) {
  const safeUserDisplayName = useMemo(() => {
    return (
      message?.sender_profile?.full_name ??
      message?.sender_profile?.email ??
      "Anonymous"
    );
  }, [message.sender_profile]);

  const safeFormattedCreatedAt = useMemo(() => {
    return formatDistanceToNow(new Date(message.created_at), {
      addSuffix: true,
    });
  }, [message.created_at]);

  return (
    <div className={cn("py-2 px-6 w-full hover:bg-muted/80 relative")}>
      <div className="w-full flex items-start gap-3 justify-start">
        {/* USER AVATAR CONTAINER */}
        <div className="size-fit shrink-0">
          <Avatar>
            <AvatarImage
              className="rounded-md"
              src={message.sender_profile?.avatar_url ?? ""}
              alt={safeUserDisplayName}
            />
            <AvatarFallback className="bg-blue-500 text-white rounded-md">
              <HugeiconsIcon icon={UserIcon} size={18} strokeWidth={2} />
            </AvatarFallback>
          </Avatar>
        </div>
        {/* USER DISPLAY NAME AND MESSAGE SENT AT DATE/TIME CONTAINER */}
        <div className="flex flex-col gap-0.5 items-start">
          <div className="flex justify-start gap-1.5 items-center">
            <p className="text-sm font-semibold">{safeUserDisplayName}</p>
            <p className="text-xs text-muted-foreground mt-px">
              {safeFormattedCreatedAt}
            </p>
          </div>
          {/* MESSAGE CONTENT CONTAINER */}
          <div>
            <p className="text-base whitespace-pre-wrap leading-snug">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
