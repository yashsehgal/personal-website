'use client';
import { getRouteTitle } from '@/common/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconCheck, IconChevronRight, IconLink } from '@tabler/icons-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function NestedNavigationBreadcrumb() {
  const pathname = usePathname();
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const segments = pathname.split('/').filter(Boolean);

  const getSegmentPath = (index: number): string => {
    return segments.slice(0, index + 1).join('/');
  };

  const handleCopySegmentsPath = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + pathname);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      // clipboard API failed (e.g. permission denied)
    }
  };

  const showCopySegmentPathButton: boolean = segments.length > 1;

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
      {showCopySegmentPathButton ? (
        <button
          onClick={handleCopySegmentsPath}
          aria-label={showCopied ? 'Copied' : 'Copy link'}
          className="size-6 cursor-pointer hover:bg-neutral-200 flex items-center justify-center shrink-0 rounded-md">
          {showCopied ? (
            <motion.div
              key="copied"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}>
              <IconCheck size={16} />
            </motion.div>
          ) : (
            <IconLink size={16} />
          )}
        </button>
      ) : null}
    </div>
  );
}
