"use client";

import { Button } from "@/components/ui/button";
import { useManageFeedMessageThreadQueryState } from "@/features/personal-feed/hooks/use-manage-feed-message-thread-query-state";
import { X } from "lucide-react";

export function FeedThreadContainer() {
  const { closeThread } = useManageFeedMessageThreadQueryState();

  return (
    <div className="min-h-0 min-w-0 flex-1 divide-y divide-border">
      <div className="flex h-12 w-full shrink-0 items-center justify-between bg-linear-to-b from-white to-transparent px-3 backdrop-blur-lg">
        <div className="flex items-center justify-start gap-2">
          <p className="text-sm font-medium select-none">Thread</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close thread"
            onClick={closeThread}
          >
            <X />
          </Button>
        </div>
      </div>
      <div className="min-h-0 min-w-0 flex-1"></div>
    </div>
  );
}
