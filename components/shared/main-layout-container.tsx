import { Navigation } from "@/components/shared/navigation";
import { cn } from "@/lib/utils";

export function MainLayoutContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col min-h-full overflow-hidden", className)}
      {...props}
    >
      <Navigation />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
