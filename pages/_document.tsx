import { Html, Head, Main, NextScript } from 'next/document';
import { Analytics } from '@vercel/analytics/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=outfit@400,900,800,300,500,600,200,100,700&display=swap"
          rel="stylesheet"
        />
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
