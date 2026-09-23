"use client";

import { WEBSITE_ROUTES } from "@/common/routes";
import { MainSidebarNavigation } from "@/components/layouts/main-sidebar-navigation";
import { cn } from "cn";
import { usePathname } from "next/navigation";

type MainLayoutContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function MainLayoutContainer({
  className,
  children: layoutMainContent,
  ...props
}: MainLayoutContainerProps) {
  const pathname = usePathname();
  const isHomePage = pathname === WEBSITE_ROUTES.HOME;

  return (
    <div
      className={cn(
        "main-layout-container relative flex min-w-0 flex-col gap-8 p-8 wide:gap-0",
        isHomePage
          ? "wide:min-h-dvh wide:justify-between"
          : "wide:flex-row wide:items-start wide:justify-start",
        className,
      )}
      {...props}
    >
      <MainSidebarNavigation />
      <main className={cn("min-w-0 w-full", !isHomePage && "wide:flex-1")}>
        {layoutMainContent}
      </main>
    </div>
  );
}
