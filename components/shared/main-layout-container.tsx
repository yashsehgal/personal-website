"use client";

import { ApplicationRoute, ROUTES } from "@/common/routes";
import { Navigation } from "@/components/shared/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const PAGES_WITHOUT_PADDING: ApplicationRoute[] = [ROUTES.FEED] as const;

export function MainLayoutContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const isPageEmpty = PAGES_WITHOUT_PADDING.includes(
    pathname as ApplicationRoute,
  );

  return (
    <div
      className={cn(
        "flex h-screen min-h-0 flex-col items-stretch justify-start overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="shrink-0">{isPageEmpty ? null : <Navigation />}</div>
      <main
        className={cn(
          "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-8",
          isPageEmpty && "overflow-hidden p-0",
        )}
      >
        {children}
      </main>
    </div>
  );
}
