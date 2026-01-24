'use client';
import { NAVIGATION } from '@/common/navigation';
import { ApplicationRoute } from '@/common/routes';
import { cn } from '@/helpers/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationSidebar() {
  const pathname = usePathname();

  const isActive = (route: ApplicationRoute): boolean => pathname === route;

  const hasActiveInnerPage = (
    innerPages: { route: string; isExternal: boolean }[] | undefined,
  ): boolean =>
    innerPages?.some((p) => !p.isExternal && pathname === p.route) ?? false;

  const isAnyInnerPageActive = NAVIGATION.some((item) =>
    hasActiveInnerPage(item.innerPages),
  );

  return (
    <aside
      className={cn(
        'w-80 h-full p-6 max-lg:w-fit',
        isAnyInnerPageActive && 'max-lg:hidden',
      )}>
      <nav>
        <ul className="flex flex-col gap-1 items-end">
          {NAVIGATION.map((navigationItem, index) => {
            const hasInnerPages: boolean = Boolean(
              navigationItem.innerPages?.length,
            );
            if (hasInnerPages) {
              const showInnerPages = hasActiveInnerPage(
                navigationItem.innerPages,
              );
              return (
                <div className="flex flex-col items-end gap-1.5" key={index}>
                  <Link
                    href={navigationItem.route}
                    className={cn(
                      'font-serif italic',
                      isActive(navigationItem.route)
                        ? 'text-black'
                        : 'text-neutral-500',
                    )}>
                    {navigationItem.title}
                  </Link>
                  {showInnerPages && (
                    <div className="flex flex-col items-end justify-start max-lg:hidden">
                      {navigationItem.innerPages?.map((innerPage, index) => {
                        if (innerPage.isExternal) return;
                        return (
                          <Link key={index} href={innerPage.route}>
                            <div
                              className={cn(
                                'text-sm truncate h-8 flex items-center justify-start pr-8 pl-4 rounded-lg hover:bg-neutral-100 relative',
                                isActive(innerPage.route as ApplicationRoute)
                                  ? 'text-black bg-neutral-100'
                                  : 'text-neutral-500',
                              )}>
                              {innerPage.title}
                              <div
                                className={cn(
                                  'h-8 w-px absolute top-0 right-3',
                                  isActive(innerPage.route as ApplicationRoute)
                                    ? 'bg-black'
                                    : 'bg-neutral-300',
                                )}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else
              return (
                <li key={index}>
                  <Link
                    href={navigationItem.route}
                    className={cn(
                      'font-serif italic',
                      isActive(navigationItem.route)
                        ? 'text-black'
                        : 'text-neutral-500',
                    )}>
                    {navigationItem.title}
                  </Link>
                </li>
              );
          })}
        </ul>
      </nav>
    </aside>
  );
}
