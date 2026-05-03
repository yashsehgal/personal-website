"use client";

import { ROUTES } from "@/common/routes";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function FeedListnavigationHeader() {
  const pathname = usePathname();

  const isGeneralChannelActive = useMemo((): boolean => {
    return pathname === ROUTES.FEED;
  }, [pathname]);

  const safeFeedName = useMemo((): string => {
    return isGeneralChannelActive
      ? "General Feed"
      : "Sign in to create a channel";
  }, [isGeneralChannelActive]);

  return (
    <header className="h-12 flex items-center justify-between px-4">
      <div className="flex items-center justify-start gap-2">
        <p className="text-sm font-medium">{safeFeedName}</p>
      </div>
    </header>
  );
}
