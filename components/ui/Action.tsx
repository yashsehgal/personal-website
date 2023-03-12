import { ActionPropsType } from "@/types";

const Action: React.FunctionComponent<ActionPropsType> = ({ children }, props: any) => {
    return (
        <span 
            className=""
            {...props}
        >
            {children}
        </span>
    )
};

export {
    Action
};