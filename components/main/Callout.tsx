import { cn } from "@/lib/utils";

const Callout: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({ ...attr }) => {
    return (
        <div className={cn("rounded-lg bg-gray-200 text-gray-500 text-sm font-normal p-4 leading-6", attr?.className)} {...attr}>
            {attr?.children}
        </div>
    )
};

export default Callout;