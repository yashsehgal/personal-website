import type { AppProps } from 'next/app';
import React from 'react';
import '@/styles/globals.css';
import BackToHomeAction from './components/ui/back-to-home-action';
import { useRouter } from 'next/router';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  const pathname = useRouter().pathname;
  return (
    <React.Fragment>
      {!(pathname === "/") && <BackToHomeAction />}
      <Component {...pageProps} />
    </React.Fragment>
  );
}
