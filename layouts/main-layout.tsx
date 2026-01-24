'use client';
import { NavigationSidebar } from '@/components/navigation-sidebar';
import { NestedNavigationBreadcrumb } from '@/components/nested-navigation-breadcrumb';
import { cn } from '@/helpers/cn';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type MainLayoutProps = React.HTMLAttributes<HTMLDivElement>;

const MAIN_LAYOUT_HEADER_SOCIAL_OPTIONS = {
  X: 'https://x.com/yashsehgaldev',
  GitHub: 'https://github.com/yashsehgal',
  LinkedIn: 'https://linkedin.com/in/sehgalyash',
} as const;

export function MainLayout({ className, children, ...props }: MainLayoutProps) {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        'divide-y divide-neutral-200 flex flex-col h-screen overflow-hidden',
        className,
      )}
      {...props}>
      <header className="py-2 px-3 flex items-center justify-between gap-4">
        <NestedNavigationBreadcrumb />
        <div className="flex items-center justify-end gap-3">
          {Object.entries(MAIN_LAYOUT_HEADER_SOCIAL_OPTIONS).map(
            ([key, value]) => (
              <Link
                key={key}
                href={value}
                target="_blank"
                rel="noopener noreferrer">
                <p className="select-none text-neutral-500 hover:text-black">
                  {key}
                </p>
              </Link>
            ),
          )}
        </div>
      </header>
      <main className="flex-1 h-full">
        <div className="mx-auto w-full max-w-7xl min-w-0 flex items-start justify-center h-full divide-x divide-neutral-200">
          <NavigationSidebar />
          <motion.div
            className="flex-1 h-full border-r border-neutral-200 overflow-y-scroll hide-scroll max-xl:border-r-0"
            key={pathname}
            initial={{ filter: 'blur(4px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ delay: 0.2, duration: 0.4 }}>
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
