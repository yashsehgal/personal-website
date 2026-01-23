'use client';
import { NAVIGATION } from '@/common/navigation';
import { ApplicationRoute } from '@/common/routes';
import { cn } from '@/helpers/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationSidebar() {
  const pathname = usePathname();

  const isActive = (route: ApplicationRoute): boolean => pathname === route;

  return (
    <aside className="max-w-80 min-w-12 h-full p-6">
      <nav>
        <ul className="flex flex-col gap-1">
          {NAVIGATION.map((navigationItem, index) => {
            return (
              <li key={index} className="flex items-center justify-start gap-2">
                <Link
                  href={navigationItem.route}
                  className={cn(
                    '',
                    isActive(navigationItem.route)
                      ? 'text-black'
                      : 'text-neutral-400',
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
