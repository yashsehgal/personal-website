"use client";

import { Button } from "@/components/ui/button";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { IFeed } from "@/features/personal-feed/interfaces";
import { useSoundEffect } from "@/hooks/use-sound-effect";
import { cn } from "@/lib/utils";
import { Hash } from "lucide-react";
import { useCallback } from "react";

interface FeedSidebarButtonProps {
  feed: IFeed;
}

export function FeedSidebarButton({ feed }: FeedSidebarButtonProps) {
  const { checkIfFeedSessionIsActive, openFeedSession } =
    useManageFeedSessionQueryState();
  const { playSoundEffect } = useSoundEffect();
  const isFeedSelected = checkIfFeedSessionIsActive(feed.id);

  const handleSidebarButtonClick = useCallback(() => {
    openFeedSession(feed.id);
  }, [feed.id, openFeedSession]);

  const playSoundOnMouseDown = useCallback(() => {
    playSoundEffect("SINGLE_KEYBOARD_KEY_PRESS");
  }, [playSoundEffect]);

  return (
    <Button
      withoutMicroInteractions={isFeedSelected}
      onClick={handleSidebarButtonClick}
      onMouseDown={playSoundOnMouseDown}
      className={cn(
        "w-full justify-start truncate h-7 px-2 gap-1.5",
        isFeedSelected &&
          "bg-background hover:bg-background border-border shadow-2xs pl-3.5 transition-[padding]",
      )}
      variant="ghost"
      size="sm"
    >
      <Hash className="size-3.5 text-muted-foreground" />
      <p className="text-xs leading-0">{feed.name}</p>
    </Button>
  );
}
