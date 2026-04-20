import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IFeedMessage } from "@/features/personal-feed/interfaces";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { useMemo } from "react";

interface FeedMessageProps {
  message: IFeedMessage;
}

export function FeedMessage({ message }: FeedMessageProps) {
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

  const showEmail =
    Boolean(sender?.email?.trim()) &&
    Boolean(sender?.full_name?.trim()) &&
    sender!.full_name!.trim() !== sender!.email!.trim();

  const safeAvatarUrl = useMemo(() => {
    if (isAnonymous) return undefined;
    if (!sender) return undefined;
    return sender.avatar_url ?? undefined;
  }, [isAnonymous, sender]);

  const safeEmail = useMemo(() => {
    if (!sender) return undefined;
    return sender.email?.trim() ?? undefined;
  }, [sender]);

  const safeMessageTimestamp = useMemo(() => {
    const date = formatDate(message.created_at, "h:mm a");
    return date;
  }, [message.created_at]);

  return (
    <div
      className={cn(
        "w-full h-fit relative px-8 py-2 items-start flex justify-start gap-3",
        "hover:bg-muted/50",
      )}
      aria-description={message.content}
    >
      <div className="flex items-center gap-2">
        <Avatar size="sm" className="rounded-md shrink-0">
          <AvatarImage
            src={safeAvatarUrl ?? undefined}
            alt={primaryLabel}
            className="rounded-md shrink-0"
          />
          <AvatarFallback className="shrink-0">
            {primaryLabel.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p className="font-semibold text-sm shrink-0">{primaryLabel}</p>
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
      <pre className="text-sm whitespace-pre-wrap font-sans mt-0.5 flex-1">
        {message.content}
      </pre>
    </div>
  );
}
