'use client';
import { getRouteTitle } from '@/common/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronRight } from '@tabler/icons-react';

export function NestedNavigationBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const getSegmentPath = (index: number): string => {
    return segments.slice(0, index + 1).join('/');
  };

  return (
    <div className="flex items-center justify-start gap-1.5 truncate">
      {segments.map((_, index) => {
        const path = getSegmentPath(index);
        const title = getRouteTitle(path);
        const isLast = index === segments.length - 1;

        return (
          <div
            className="flex items-center justify-start gap-2 truncate"
            key={index}>
            {index > 0 && <IconChevronRight className="size-4 shrink-0" />}
            {isLast ? (
              <p className="font-medium select-none truncate">{title}</p>
            ) : (
              <Link href={`/${path}`}>
                <p className="font-medium select-none text-neutral-400 hover:text-neutral-500">
                  {title}
                </p>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
