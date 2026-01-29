'use client';
import { ApplicationRoute, ROUTES } from '@/common/route';
import { MainLayoutNavigation } from '@/components/sections/main-layout-navigation';
import { cn } from '@/helpers/cn';
import { usePathname } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

type MainLayoutProps = React.HTMLAttributes<HTMLDivElement>;

const SHOW_NAVIGATION_ON_ROUTES: ApplicationRoute[] = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.ART,
  ROUTES.WORK,
  ROUTES.POSTS,
] as const;

export function MainLayout({ className, children, ...props }: MainLayoutProps) {
  const pathname = usePathname();
  const shouldShowNavigation: boolean = SHOW_NAVIGATION_ON_ROUTES.includes(
    pathname as unknown as ApplicationRoute,
  );

  return (
    <NuqsAdapter>
      <div
        className={cn(
          'main-layout min-h-screen mx-auto max-w-7xl content-container p-12 max-lg:p-8 space-y-16 flex items-start justify-between max-lg:flex-col',
          className,
        )}
        {...props}>
        {shouldShowNavigation && <MainLayoutNavigation />}
        <div className="main-layout-children-container flex-1">{children}</div>
      </div>
    </NuqsAdapter>
  );
}
