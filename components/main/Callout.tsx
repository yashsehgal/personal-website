import { cn } from "@/lib/utils";

const Callout: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...attr }) => {
    return (
        <div className={cn("rounded-lg bg-zinc-200 text-zinc-500 text-sm font-normal p-4 leading-6", className)} {...attr}>
            {attr?.children}
        </div>
    )
};

export default Callout;