import { Button } from "@/components/ui/button";
import { IFeed } from "@/features/personal-feed/interfaces";
import { Brackets, Link, Lock } from "lucide-react";

interface FeedStartingBlockProps {
  feed: IFeed;
}

export function FeedStartingBlock({ feed }: FeedStartingBlockProps) {
  return (
    <div className="w-full pb-10 px-6 flex items-start justify-between">
      <header className="space-y-3 px-1">
        <div className="flex items-center justify-start gap-2">
          <Lock className="shrink-0 size-4" />
          <p className="text-sm font-medium">{feed.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            This is the very beginning of this channel. You can chat here with
            Yash, say hello, ask questions, tell about yourself.
          </p>
        </div>
      </header>
      <div className="flex items-center justify-around gap-3 w-fit">
        <Button variant="outline" size="xs">
          <Link />
          Copy feed link
        </Button>
        <Button variant="outline" size="xs">
          <Brackets />
          Copy feed ID
        </Button>
      </div>
    </div>
  );
}
