"use client";

import { getPageTheme } from "@/common/page-theme";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function PageThemeController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const theme = getPageTheme(pathname);

    if (theme) {
      document.documentElement.dataset.theme = theme;
      return;
    }

    delete document.documentElement.dataset.theme;
  }, [pathname]);

  return null;
}
