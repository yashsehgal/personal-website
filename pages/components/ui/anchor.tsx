import { AnchorType } from "@/types/components";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Anchor: React.FunctionComponent<AnchorType> = ({ className, children, href, ...props }) => {
  return (
    <Link
      href={href || "/"}
      className={cn("page-anchor-element hover:bg-orange-200 inline-block", className)}
      {...props}
    >
      {children}
    </Link>
  )
};

export default Anchor;