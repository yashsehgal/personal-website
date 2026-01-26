import { cn } from "@/helpers/cn";

type MainLayoutProps = React.HTMLAttributes<HTMLDivElement>;

export function MainLayout({className, children, ...props}: MainLayoutProps) {
    return <div className={cn('main-layout h-screen mx-auto w-7xl max-w-full content-container', className)} {...props}>
        {children}
    </div>
}