import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

interface BasicLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>, LinkProps {
  withoutHighlight?: boolean;
}

export function BasicLink({
  className,
  withoutHighlight = false,
  ...props
}: BasicLinkProps) {
  return (
    <Link
      className={cn(
        !withoutHighlight && "border-b hover:border-b-primary hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
