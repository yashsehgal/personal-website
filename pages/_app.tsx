import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

import { Navbar, NavbarLogo, NavbarOption, NavbarOptionList } from '@/components/layout/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Navbar>
        <NavbarLogo>
        </NavbarLogo>
        <NavbarOptionList>
          <NavbarOption></NavbarOption>
        </NavbarOptionList>
      </Navbar>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
