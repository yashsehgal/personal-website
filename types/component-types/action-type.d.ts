import { ReactNode } from "react";

interface ActionPropsType extends React.AllHTMLAttributes<HTMLElement> {
    children?: ReactNode;
};

export {
    ActionPropsType
}