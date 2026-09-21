"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function MainSidebarNavigation() {
  const pathname = usePathname();

  const isHomePageActive = useMemo(
    () => pathname === WEBSITE_ROUTES.HOME,
    [pathname],
  );

  return (
    <aside className="">
      <header className="w-96">
        <Link href={WEBSITE_ROUTES.HOME} className="size-fit block">
          <div
            className={cn(
              "flex flex-col gap-0.5 size-fit",
              isHomePageActive ? "text-foreground" : "text-muted-foreground",
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
    </aside>
  );
}
