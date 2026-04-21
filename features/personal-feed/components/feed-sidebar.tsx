"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FeedAuthenticationCTA } from "@/features/personal-feed/components/feed-authentication-cta";
import { FeedCreateNewFeedManager } from "@/features/personal-feed/components/feed-create-new-feed-manager";
import { useManageFeedSessionQueryState } from "@/features/personal-feed/hooks/use-manage-feed-session-query-state";
import { IFeed } from "@/features/personal-feed/interfaces";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useFeeds } from "@/hooks/use-feeds";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@base-ui/react";
import { Hash, MessageSquareLock, MessagesSquare, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

export function FeedSidebar() {
  const { data: session } = useAuthSession();
  const { data: feeds, isLoading } = useFeeds();

  const publicFeeds = useMemo(
    () => (feeds ?? []).filter((f) => f.is_public),
    [feeds],
  );

  const privateFeeds = useMemo(
    () => (feeds ?? []).filter((f) => !f.is_public),
    [feeds],
  );

  const safeShowStartNewChatButton = useMemo(() => {
    return Boolean(!isLoading);
  }, [isLoading]);

  const safeShowFeedsLoading = useMemo(() => {
    return Boolean(isLoading);
  }, [isLoading]);

  return (
    <aside className="w-1/6 shrink-0 space-y-2 p-2.5">
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
                <FeedCreateNewFeedManager>
                  <Button variant="ghost" size="icon-xs">
                    <Plus className="size-3 shrink-0" />
                  </Button>
                </FeedCreateNewFeedManager>
              }
            />
            <TooltipContent>Start new chat</TooltipContent>
          </Tooltip>
        ) : null}
      </div>

      {/* FEED SESSIONS LIST CONTAINER */}
      {safeShowFeedsLoading ? (
        <div className="flex flex-col items-stretch w-full gap-px"></div>
      ) : (
        <>
          <div className="flex flex-col items-stretch w-full gap-px">
            {publicFeeds.map((feed) => {
              return <FeedSidebarItem key={feed.id} feed={feed} />;
            })}
          </div>
          {session ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 pt-1 pb-0">
                <div className="flex items-center justify-start gap-2 text-muted-foreground">
                  <MessageSquareLock className="size-3 shrink-0" />
                  <p className="text-xs font-medium select-none">
                    Private feeds
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-full gap-px">
                {privateFeeds.map((feed) => {
                  return <FeedSidebarItem key={feed.id} feed={feed} />;
                })}
              </div>
            </div>
          ) : null}
        </>
      )}

      {/* FEED AUTHENTICATION MANAGER CONTAINER */}
      <div className="py-4 px-1">
        <FeedAuthenticationCTA />
      </div>
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
      withoutMicroInteractions
      onClick={handleFeedSessionButtonClick}
      variant="ghost"
      size="sm"
      className={cn(
        "w-full flex items-center justify-between transition-transform",
        isFeedSessionActive
          ? "bg-muted text-foreground hover:bg-muted hover:text-foreground"
          : "",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-start gap-1 truncate">
        <Hash
          className={cn(
            "size-4 shrink-0",
            isFeedSessionActive ? "text-foreground" : "text-muted-foreground",
          )}
        />
        <p className="text-sm font-normal truncate">{feed.name}</p>
      </div>
      <div className="flex items-center justify-end gap-2"></div>
    </Button>
  );
}
