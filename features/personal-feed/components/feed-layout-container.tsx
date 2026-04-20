import { FeedMobileNavigation } from "@/features/personal-feed/components/feed-mobile-navigation";
import { FeedSessionContainer } from "@/features/personal-feed/components/feed-messages-view/feed-session-container";
import { FeedSidebar } from "@/features/personal-feed/components/feed-sidebar";

export function FeedLayoutContainer() {
  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <div className="hidden min-h-0 w-full min-w-0 flex-1 flex-row items-stretch divide-x divide-border lg:flex">
        <FeedSidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <FeedSessionContainer />
        </div>
      </div>
      <div className="relative min-h-0 w-full flex-1 lg:hidden">
        <FeedMobileNavigation />
      </div>
    </div>
  );
}
