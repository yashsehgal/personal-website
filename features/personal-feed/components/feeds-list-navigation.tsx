"use client";

import { FeedListnavigationHeader } from "@/features/personal-feed/components/feed-list-navigation-header";
import { PublicFeedsListContainer } from "@/features/personal-feed/components/public-feeds-list-container";
import { useManageServerQueryState } from "@/features/personal-feed/hooks/use-manage-server-query-state";
import { useMemo } from "react";

export function FeedsListNavigation() {
  const { serverSession } = useManageServerQueryState();

  const safeShowGeneralServerFeedOptions = useMemo(() => {
    return !Boolean(serverSession);
  }, [serverSession]);

  return (
    <aside className="w-64 divide-y divide-border">
      <FeedListnavigationHeader />
      {safeShowGeneralServerFeedOptions ? <PublicFeedsListContainer /> : null}
    </aside>
  );
}
