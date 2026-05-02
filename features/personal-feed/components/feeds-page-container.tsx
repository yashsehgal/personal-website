import { FeedsListNavigation } from "@/features/personal-feed/components/feeds-list-navigation";
import { FeedsPrimarySidebar } from "@/features/personal-feed/components/feeds-primary-sidebar";

export function FeedsPageContainer() {
  return (
    <div className="flex-1 min-h-0 w-full flex items-stretch justify-start overflow-hidden bg-foreground/5 py-4 pr-4">
      <FeedsPrimarySidebar />
      <div className="flex-1 min-h-0 flex items-stretch justify-start overflow-hidden border border-border rounded-lg">
        <FeedsListNavigation />
        <main className="flex-1 min-h-0 flex items-stretch justify-start overflow-hidden divide-y divide-border bg-background"></main>
      </div>
    </div>
  );
}
