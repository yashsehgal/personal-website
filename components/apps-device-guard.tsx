"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import { track } from "@/lib/analytics/client";
import { AnalyticsEvent } from "@/lib/analytics/events";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TOUCH_DEVICE_QUERY = "(hover: none) and (pointer: coarse)";
let hasRedirectedTouchDevice = false;

export function AppsDeviceGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (hasRedirectedTouchDevice) {
      return;
    }

    if (window.matchMedia(TOUCH_DEVICE_QUERY).matches) {
      hasRedirectedTouchDevice = true;
      track(AnalyticsEvent.APPS_MUSIC_TOUCH_REDIRECT);
      router.replace(WEBSITE_ROUTES.HOME);
    }
  }, [router]);

  return <div className="contents touch:hidden">{children}</div>;
}
