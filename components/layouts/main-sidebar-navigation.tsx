"use client";

import { WEBSITE_ROUTES, WebsiteRouteType } from "@/common/routes";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

const NAVIGATION_ITEMS: { label: string; href: WebsiteRouteType }[] = [
  { label: "Work", href: WEBSITE_ROUTES.WORK },
  { label: "Writings", href: WEBSITE_ROUTES.WRITINGS },
  { label: "Photography", href: WEBSITE_ROUTES.PHOTOGRAPHY },
] as const;

const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "X (Twitter)", href: "https://x.com/yashsehgaldev" },
  { label: "GitHub", href: "https://github.com/yashsehgal" },
  { label: "Instagram", href: "https://www.instagram.com/sehgalyash_/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sehgalyash/" },
  { label: "hi@yashsehgal.com", href: "mailto:hi@yashsehgal.com" },
] as const;

export function MainSidebarNavigation() {
  const pathname = usePathname();

  const isHomePageActive = useMemo(
    () => pathname === WEBSITE_ROUTES.HOME,
    [pathname],
  );

  const isNavigationItemActive = useCallback(
    (href: WebsiteRouteType) => {
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  return (
    <aside className="flex flex-col items-start gap-4 w-72 sticky top-8 shrink-0">
      <header>
        <Link href={WEBSITE_ROUTES.HOME} className="size-fit block">
          <div
            className={cn(
              "flex flex-col gap-0.5 size-fit",
              isHomePageActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="Yash Sehgal, Design Engineer"
          >
            <p
              className="font-medium tracking-tight text-sm"
              aria-hidden="true"
            >
              Yash Sehgal
            </p>
            <p className="tracking-tight text-sm" aria-hidden="true">
              Design Engineer
            </p>
          </div>
        </Link>
      </header>
      <nav>
        <ul>
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm tracking-tight font-medium",
                  isNavigationItemActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <footer>
        <ul>
          {SOCIAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={link.href}
                className="text-sm tracking-tight text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </aside>
  );
}
