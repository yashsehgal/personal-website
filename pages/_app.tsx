import Navbar from '@/components/layout/Navbar';
import ViewContainer from '@/components/layout/ViewContainer';
import Header from '@/components/main/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const pathName = useRouter()?.pathname;
  return (
    <React.Fragment>
      <Navbar />
      {!(pathName === '/resume') && (
        <ViewContainer>
          <Header />
        </ViewContainer>
      )}
      <Component {...pageProps} />
    </React.Fragment>
  );
}
