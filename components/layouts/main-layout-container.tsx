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
        "main-layout-container relative p-8",
        isHomePage
          ? "flex min-h-dvh flex-col justify-between"
          : "flex items-start justify-start",
        className,
      )}
      {...props}
    >
      <MainSidebarNavigation />
      <main>{layoutMainContent}</main>
    </div>
  );
}
