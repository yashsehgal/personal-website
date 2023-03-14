import { ActionPropsType } from "@/types";

const Action: React.FunctionComponent<ActionPropsType> = ({ children, className, ...actionHTMLAttributes }) => {
    return (
        <p 
            className={`hover:bg-zinc-100 px-3 py-1.5 rounded-md hover:scale-105 transition-all cursor-action ${className}`}
            {...actionHTMLAttributes}
        >
            {children}
        </p>
    )
};

export {
    Action
};