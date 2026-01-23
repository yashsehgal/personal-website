import { ROUTES } from '@/common/routes';
import { NavigationSidebar } from '@/components/navigation-sidebar';
import { NestedNavigationBreadcrumb } from '@/components/nested-navigation-breadcrumb';
import { cn } from '@/helpers/cn';
import Link from 'next/link';

type MainLayoutProps = React.HTMLAttributes<HTMLDivElement>;

const MAIN_LAYOUT_HEADER_LEFT_TITLE: string = 'Yash Sehgal' as const;

const MAIN_LAYOUT_HEADER_SOCIAL_OPTIONS = {
  X: 'https://x.com/yashsehgaldev',
  GitHub: 'https://github.com/yashsehgal',
  LinkedIn: 'https://linkedin.com/in/sehgalyash',
} as const;

export function MainLayout({ className, children, ...props }: MainLayoutProps) {
  return (
    <div
      className={cn(
        'divide-y divide-neutral-200 flex flex-col h-screen',
        className,
      )}
      {...props}>
      <header className="py-2 px-3 flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Link href={ROUTES.HOME}>
            <p className="font-medium select-none">
              {MAIN_LAYOUT_HEADER_LEFT_TITLE}
            </p>
          </Link>
          <NestedNavigationBreadcrumb />
        </div>
        <div className="flex items-center justify-end gap-3">
          {Object.entries(MAIN_LAYOUT_HEADER_SOCIAL_OPTIONS).map(
            ([key, value]) => (
              <Link
                key={key}
                href={value}
                target="_blank"
                rel="noopener noreferrer">
                <p className="font-medium select-none">{key}</p>
              </Link>
            ),
          )}
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto w-4xl max-w-full flex items-start justify-center h-full">
          <NavigationSidebar />
          <div className="flex-1 p-3">{children}</div>
        </div>
      </main>
    </div>
  );
}
