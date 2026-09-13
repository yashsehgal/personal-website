"use client";

import { ROUTES, RouteType } from "@/common/routes";
import { ResponsiveControl } from "@/components/layouts/responsive-control";
import { MainNavigationMoreDropdownMenu } from "@/components/shared/main-navigation-more-dropdown-menu";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NAVIGATION: Record<RouteType, { label: string; href: string }> = {
  HOME: { label: "Home", href: ROUTES.HOME },
  ABOUT: { label: "About", href: ROUTES.ABOUT },
  WORK: { label: "Work", href: ROUTES.WORK },
};

export function MainNavigation() {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return Object.values(NAVIGATION).find(({ href }) => href === pathname);
  }, [pathname]);

  return (
    <div className="border-b border-border py-4">
      <ResponsiveControl className="flex items-center justify-start gap-4">
        {Object.values(NAVIGATION).map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "text-sm uppercase font-mono text-muted-foreground hover:text-foreground",
              isActive?.href === href && "text-foreground",
            )}
          >
            {label}
          </Link>
        ))}
        <MainNavigationMoreDropdownMenu />
      </ResponsiveControl>
    </div>
  );
}
