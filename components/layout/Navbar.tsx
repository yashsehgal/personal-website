import { NavbarLogoPropsType, NavbarOptionListPropsType, NavbarOptionPropsType, NavbarPropsType } from "@/types";
import Link from "next/link";
import { Action } from "@/components/ui/Action";

const Navbar: React.FunctionComponent<NavbarPropsType> = ({ children }, props: any) => {
    return (
        <nav className="navbar">

        </nav>
    )
};

const NavbarLogo: React.FunctionComponent<NavbarLogoPropsType> = ({ children }, props: any) => {
    return (
        <Link href="/" {...props}>
            <Action>
                {children}
            </Action>
        </Link>
    )
};

const NavbarOptionList: React.FunctionComponent<NavbarOptionListPropsType> = ({ children }, props: any) => {
    return (
        <ul className="navbar-options-list" {...props}>
            {children}
        </ul>
    )
};

const NavbarOption: React.FunctionComponent<NavbarOptionPropsType> = ({ children }, props: any) => {
    return (
        <li className="navbar-option-item" {...props}>
            {children}
        </li>
    )
};

export {
    Navbar,
    NavbarLogo,
    NavbarOptionList,
    NavbarOption
};