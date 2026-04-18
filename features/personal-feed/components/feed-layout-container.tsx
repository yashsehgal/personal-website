import { FeedMobileNavigation } from "@/features/personal-feed/components/feed-mobile-navigation";
import { FeedSessionContainer } from "@/features/personal-feed/components/feed-session-container";
import { FeedSidebar } from "@/features/personal-feed/components/feed-sidebar";

export function FeedLayoutContainer() {
  return (
    <>
      <div className="flex min-h-0 w-full flex-1 items-stretch divide-x divide-border max-lg:hidden">
        <FeedSidebar />
        <div className="w-4/5">
          <FeedSessionContainer />
        </div>
      </div>
      <div className="block lg:hidden min-h-0 flex-1 w-full relative">
        <FeedMobileNavigation />
      </div>
    </>
  );
}
