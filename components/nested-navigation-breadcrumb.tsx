'use client';
import { getRouteTitle } from '@/common/navigation';
import { ApplicationRoute } from '@/common/routes';
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
    <div className="flex items-center justify-start gap-1.5">
      {segments.map((segment, index) => {
        return (
          <div className="flex items-center justify-start gap-2" key={index}>
            {index < segments.length && <IconChevronRight className="size-4" />}
            <Link href={getSegmentPath(index)}>
              <p className="font-medium select-none">
                {getRouteTitle(segment as ApplicationRoute)}
              </p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
