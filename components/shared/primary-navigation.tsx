"use client";

import { Route, RouteKey, ROUTES } from "@/common/routes";
import { ResponsiveLayoutController } from "@/components/layouts/responsive-layout-controller";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_ITEMS: { id: RouteKey; label: string; href: Route }[] = [
  { id: "ABOUT", label: "About", href: ROUTES.ABOUT },
  { id: "WORK", label: "Work", href: ROUTES.WORK },
  { id: "WRITINGS", label: "Writings", href: ROUTES.WRITINGS },
  { id: "PHOTOS", label: "Photos", href: ROUTES.PHOTOS },
  { id: "ARCHIVE", label: "Archive", href: ROUTES.ARCHIVE },
] as const;

export function PrimaryNavigation() {
  const pathname = usePathname();
  const isActive = (href: Route) => {
    if (href === ROUTES.HOME) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const getLinkClassName = (href: Route) =>
    cn(
      "font-mono text-muted-foreground uppercase hover:text-foreground",
      isActive(href) && "text-foreground",
    );

  return (
    <div className="border-b border-border">
      <ResponsiveLayoutController className="py-4 flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Link href={ROUTES.HOME} className={getLinkClassName(ROUTES.HOME)}>
            Yash Sehgal
          </Link>
        </div>
        <nav className="flex items-center justify-end gap-4">
          {NAVIGATION_ITEMS.map((navigationItem) => {
            return (
              <Link
                key={navigationItem.id}
                href={navigationItem.href}
                className={getLinkClassName(navigationItem.href)}
              >
                {navigationItem.label}
              </Link>
            );
          })}
        </nav>
      </ResponsiveLayoutController>
    </div>
  );
}
