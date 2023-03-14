import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

import { Navbar, NavbarAction, NavbarLogo, NavbarOption, NavbarOptionList } from '@/components/main/Navbar'
import Link from 'next/link';
import { Action } from '@/components/ui/Action';
import { HireMeButton } from '@/components/ui/Button';

const NavbarOptionsData: Array<{ name: string; path: string }> = [
  { name: "Work", path: "/#work" },
  { name: "Experience", path: "/#experience" },
  { name: "Tech", path: "/#tech" },
  { name: "Blogs", path: "/#blogs" },
  { name: "About", path: "/#about" }
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Navbar>
        <NavbarLogo>
          {"👋 Hi, Yash this side."}
        </NavbarLogo>
        <NavbarOptionList>
          {NavbarOptionsData?.map((navbarOptionItem, navbarOptionIndex) => (
            <NavbarOption key={navbarOptionIndex}>
              <Link href={navbarOptionItem?.path}>
                <Action>
                  {navbarOptionItem?.name}
                </Action>
              </Link>
            </NavbarOption>
          ))}
        </NavbarOptionList>
        <NavbarAction>
          <HireMeButton />
        </NavbarAction>
      </Navbar>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
