'use client';
import { ROUTES } from '@/common/route';
import { MainLayoutNavigation } from '@/components/sections/main-layout-navigation';
import { cn } from '@/helpers/cn';
import { usePathname } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';

type MainLayoutProps = React.HTMLAttributes<HTMLDivElement>;

export function MainLayout({ className, children, ...props }: MainLayoutProps) {
  const pathname = usePathname();

  const isInsidePost: boolean = pathname.includes(ROUTES.POSTS);

  return (
    <Suspense>
      <NuqsAdapter>
        <div
          className={cn(
            'main-layout min-h-screen mx-auto max-w-7xl content-container px-12 py-8 max-lg:p-6 space-y-16',
            isInsidePost && 'space-y-24',
            className,
          )}
          {...props}>
          <MainLayoutNavigation />
          <div className="main-layout-children-container flex-1">
            {children}
          </div>
        </div>
      </NuqsAdapter>
    </Suspense>
  );
}
