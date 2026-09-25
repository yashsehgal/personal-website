"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TOUCH_DEVICE_QUERY = "(hover: none) and (pointer: coarse)";

export function AppsDeviceGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia(TOUCH_DEVICE_QUERY).matches) {
      router.replace(WEBSITE_ROUTES.HOME);
    }
  }, [router]);

  return <div className="contents touch:hidden">{children}</div>;
}
