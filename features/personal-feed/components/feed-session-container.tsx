import { FeedSessionMessagesContainer } from "@/features/personal-feed/components/feed-session-messages-container";
import { FeedSessionToolbar } from "@/features/personal-feed/components/feed-session-toolbar";

export function FeedSessionContainer() {
  return (
    <div className="w-full h-full flex flex-col items-stretch min-h-0 relative">
      <FeedSessionToolbar />
      <FeedSessionMessagesContainer />
    </div>
  );
}
