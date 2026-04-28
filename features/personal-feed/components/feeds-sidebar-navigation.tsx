"use client";

import { FeedSidebarButton } from "@/features/personal-feed/components/feed-sidebar-button";
import { FeedsSidebarGroup } from "@/features/personal-feed/components/feeds-sidebar-group";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useFeeds } from "@/hooks/use-feeds";

export function FeedsSidebarNavigation() {
  const { data: feeds = [] } = useFeeds();
  const { data: session } = useAuthSession();

  // Collection of feeds that are public.
  const globalFeeds = feeds.filter((feed) => feed.is_public);

  // Collection of feeds that are not public and are owned by the current user.
  const personalFeeds = feeds.filter(
    (feed) =>
      !feed.is_public &&
      !!session?.user &&
      feed.created_by_user_id === session.user.id,
  );

  return (
    <aside className="shrink-0 w-64 h-full min-h-0 overflow-y-auto py-2 space-y-3">
      {/* GLOBAL FEEDS CONTAINER */}
      <FeedsSidebarGroup label="Global feeds">
        {globalFeeds.map((feed) => (
          <FeedSidebarButton key={feed.id} feed={feed} />
        ))}
      </FeedsSidebarGroup>
      {/* PRIVATE FEEDS CONTAINER */}
      <FeedsSidebarGroup label="Personal feeds">
        {personalFeeds.map((feed) => (
          <FeedSidebarButton key={feed.id} feed={feed} />
        ))}
      </FeedsSidebarGroup>
    </aside>
  );
}
