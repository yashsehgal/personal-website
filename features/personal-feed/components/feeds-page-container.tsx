import { FeedsContentViewContainer } from "@/features/personal-feed/components/feeds-content-view-container";
import { FeedsSidebarNavigation } from "@/features/personal-feed/components/feeds-sidebar-navigation";

export function FeedsPageContainer() {
  return (
    <div className="flex-1 min-h-0 w-full flex items-stretch justify-start divide-x">
      <FeedsSidebarNavigation />
      <FeedsContentViewContainer />
    </div>
  );
}
