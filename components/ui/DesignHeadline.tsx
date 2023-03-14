import { DesignHeadlineProps } from "@/types/component-types/design-headline-type";

export const DesignHeadline: React.FunctionComponent<DesignHeadlineProps> = ({ children, ...designHeadlineHTMLAttributes }) => {
    return (
        <div className={`relative px-2 py-1 border-2 border-gray-600 w-fit h-auto ${designHeadlineHTMLAttributes?.className}`}>
            <p className="absolute headling-tag-wrapper px-2 py-1 w-fit h-auto rounded-t-md bg-violet-500 text-white text-sm font-medium font-general
                -top-8 -left-0.5
            ">
                {"headline"}
            </p>
            <h1 className="leading-snug headline-content-wrapper">{children}</h1>
        </div>
    )
};