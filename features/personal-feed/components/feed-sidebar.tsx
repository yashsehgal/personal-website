"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { IFeed } from "@/features/personal-feed/interfaces";
import { useFeeds } from "@/hooks/use-feeds";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@base-ui/react";
import { Hash, MessagesSquare, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

export function FeedSidebar() {
  const { data: feeds, isLoading } = useFeeds();

  const safeShowStartNewChatButton = useMemo(() => {
    return Boolean(!isLoading);
  }, [isLoading]);

  const safeShowFeedsLoading = useMemo(() => {
    return Boolean(isLoading);
  }, [isLoading]);

  const safeShowFeeds = useMemo(() => {
    const feedsCount = feeds?.length ?? 0;
    return Boolean(feedsCount) && !safeShowFeedsLoading;
  }, [feeds, safeShowFeedsLoading]);

  return (
    <aside className="w-1/6 p-2.5 space-y-2">
      {/* FEEDS SIDEBAR HEADER CONTAINER */}
      <div className="flex items-center justify-between px-2 pt-1 pb-0">
        <div className="flex items-center justify-start gap-2 text-muted-foreground">
          <MessagesSquare className="size-3 shrink-0" />
          <p className="text-xs font-medium select-none">General</p>
        </div>
        {safeShowStartNewChatButton ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-xs">
                  <Plus className="size-3 shrink-0" />
                </Button>
              }
            />
            <TooltipContent>Start new chat</TooltipContent>
          </Tooltip>
        ) : null}
      </div>

      {/* FEED SESSIONS LIST CONTAINER */}
      {safeShowFeeds ? (
        <div className="flex flex-col items-stretch w-full gap-px">
          {feeds?.map((feed) => {
            return <FeedSidebarItem key={feed.id} feed={feed} />;
          })}
        </div>
      ) : null}

      {/* FEEDS LOADING CONTAINER */}
      {safeShowFeedsLoading ? (
        <div className="flex flex-col items-stretch w-full gap-px"></div>
      ) : null}
    </aside>
  );
}

interface FeedSidebarItemProps extends ButtonProps {
  feed: IFeed;
}

function FeedSidebarItem({ feed, className, ...props }: FeedSidebarItemProps) {
  const { checkIfFeedSessionIsActive, openFeedSession } =
    useManageFeedSessionQueryState();

  const isFeedSessionActive = checkIfFeedSessionIsActive(feed.id);

  const handleFeedSessionButtonClick = useCallback((): void => {
    openFeedSession(feed.id);
  }, [feed.id, openFeedSession]);

  return (
    <Button
      onClick={handleFeedSessionButtonClick}
      variant="ghost"
      size="sm"
      className={cn(
        "w-full flex items-center justify-between transition-transform",
        isFeedSessionActive
          ? "bg-foreground text-background hover:bg-foreground hover:text-background"
          : "",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-start gap-1">
        <Hash
          className={cn(
            "size-4 shrink-0",
            isFeedSessionActive ? "text-background" : "text-muted-foreground",
          )}
        />
        <p className="text-sm font-normal">{feed.name}</p>
      </div>
      <div className="flex items-center justify-end gap-2"></div>
    </Button>
  );
}
