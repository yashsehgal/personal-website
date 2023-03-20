import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

interface LinkTextProps extends LinkProps {
    children?: React.ReactNode;
    className?: string;
}

const LinkText: React.FunctionComponent<LinkTextProps> = ({ children, ...attr }) => {
    return (
        <Link 
            className={cn("text-base font-medium transition-all text-zinc-900 hover:underline hover:underline-offset-2 active:text-zinc-600", attr?.className)}
            {...attr}
        >
            {children}
        </Link>
    )
};

export default LinkText;