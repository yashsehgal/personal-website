import { ViewContainerPropsType } from "@/types";

export const ViewContainer: React.FunctionComponent<ViewContainerPropsType> = ({ children, ...viewContainerHTMLAttributes }) => {
    return (
        <div className={`view-container ${viewContainerHTMLAttributes?.className}`} {...viewContainerHTMLAttributes}>
            {children}
        </div>
    )
};