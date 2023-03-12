import { ReactNode } from "react";
import { ActionPropsType } from "../component-types/action-type";

type NavbarPropsType = {
    children?: ReactNode;
};

type NavbarLogoPropsType = {
    children?: ReactNode;
};

type NavbarOptionListPropsType = {
    children?: ReactNode | Array<NavbarOptionProps>;
};

type NavbarOptionPropsType = {
    children?: ReactNode | ActionPropsType;
};

type NavbarActionPropsType = {
    children?: ReactNode;
};

export type {
    NavbarPropsType,
    NavbarLogoPropsType,
    NavbarOptionListPropsType,
    NavbarOptionPropsType,
    NavbarActionPropsType
}