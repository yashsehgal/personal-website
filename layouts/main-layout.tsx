import { MainLayoutNavigation } from '@/components/sections/main-layout-navigation';
import { cn } from '@/helpers/cn';

type MainLayoutProps = React.HTMLAttributes<HTMLDivElement>;

export function MainLayout({ className, children, ...props }: MainLayoutProps) {
  return (
    <div
      className={cn(
        'main-layout h-screen mx-auto max-w-7xl content-container p-12',
        className,
      )}
      {...props}>
      <MainLayoutNavigation />
      <div className="main-layout-children-container">{children}</div>
    </div>
  );
}
