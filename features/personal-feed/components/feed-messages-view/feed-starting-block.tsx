import { Button } from "@/components/ui/button";
import { FeedActionsManager } from "@/features/personal-feed/components/feed-actions-manager";
import { IFeed } from "@/features/personal-feed/interfaces";
import { useProfilesByUserIds } from "@/hooks/use-profiles-by-user-ids";
import { Lock, MessageSquareLock } from "lucide-react";
import { useMemo } from "react";

interface FeedStartingBlockProps {
  feed: IFeed;
}

export function FeedStartingBlock({ feed }: FeedStartingBlockProps) {
  return (
    <div className="w-full pb-4 px-6 space-y-5">
      <header className="space-y-3 px-1">
        <div className="flex items-center justify-start gap-2">
          <MessageSquareLock className="shrink-0 size-5" />
          <p className="text-lg font-medium">{feed.name}</p>
        </div>
        <div>
          <p className="">
            This is the very beginning of this feed channel{" "}
            <span className="py-1 px-2 rounded-md bg-blue-100 text-blue-600">
              # {feed.name}
            </span>
            . This is where you can introduce yourself and get to know each
            other.
          </p>
        </div>
      </header>
      <div className="flex items-center justify-around gap-3 w-fit">
        <Button variant="outline" size="sm">
          Copy feed link
        </Button>
        <Button variant="outline" size="sm">
          Copy feed ID
        </Button>
        <FeedActionsManager feed={feed} withoutTooltip>
          <Button variant="outline" size="sm">
            More options...
          </Button>
        </FeedActionsManager>
      </div>
    </div>
  );
}
