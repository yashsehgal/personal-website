import { NavbarActionPropsType, NavbarLogoPropsType, NavbarOptionListPropsType, NavbarOptionPropsType, NavbarPropsType } from "@/types";
import Link from "next/link";
import { Action } from "@/components/ui/Action"
import { ViewContainer } from "../layout/ViewContainer";

export const Navbar: React.FunctionComponent<NavbarPropsType> = ({ children }, props: any) => {
    return (
        <ViewContainer>
            <nav className="navbar py-4 border-b flex flex-row items-center justify-between" {...props}>
                {children}
            </nav>
        </ViewContainer>
    )
};

export const NavbarLogo: React.FunctionComponent<NavbarLogoPropsType> = ({ children }, props: any) => {
    return (
        <Link href="/" {...props} className="animate-bounce">
            <Action>
                {children}
            </Action>
        </Link>
    )
};

export const NavbarOptionList: React.FunctionComponent<NavbarOptionListPropsType> = ({ children }, props: any) => {
    return (
        <ul className="navbar-options-list flex flex-row items-center gap-6 justify-center" {...props}>
            {children}
        </ul>
    )
};

export const NavbarOption: React.FunctionComponent<NavbarOptionPropsType> = ({ children }, props: any) => {
    return (
        <li className="navbar-option-item" {...props}>
            {children}
        </li>
    )
};

export const NavbarAction: React.FunctionComponent<NavbarActionPropsType> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
};