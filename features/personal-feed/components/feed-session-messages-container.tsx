"use client";

import { FeedMessageBox } from "@/features/personal-feed/components/feed-message-box";
import { FeedSessionToolbar } from "@/features/personal-feed/components/feed-session-toolbar";

export function FeedSessionMessagesContainer() {
  return (
    <div className="flex min-h-0 min-w-0 flex-2 flex-col divide-y divide-border">
      <FeedSessionToolbar />
      <div className="min-h-0 min-w-0 flex-2 relative">
        <div className="h-fit w-full absolute bottom-0 p-6 left-0">
          <FeedMessageBox />
        </div>
      </div>
    </div>
  );
}
