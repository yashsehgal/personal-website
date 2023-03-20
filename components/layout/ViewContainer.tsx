import { cn } from "@/lib/utils";

const ViewContainer: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({ ...attr }) => {
    return (
        <div className={cn("view-container", attr?.className)} {...attr}>
            {attr?.children}
        </div>
    )
}

export default ViewContainer;