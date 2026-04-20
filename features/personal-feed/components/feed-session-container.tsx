import { FeedSessionMessagesContainer } from "@/features/personal-feed/components/feed-session-messages-container";
import { FeedSessionToolbar } from "@/features/personal-feed/components/feed-session-toolbar";

export function FeedSessionContainer() {
  return (
    <div className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <FeedSessionToolbar />
      <FeedSessionMessagesContainer />
    </div>
  );
}
