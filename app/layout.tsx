import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/layouts/main-layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Yash Sehgal's blog",
  description: 'Yash is a design engineer based out of India.',
};

const META_IMAGE_URL: string =
  'https://ik.imagekit.io/eawrckp8wfi/personal%20website/meta_0IaDxeW2A.png' as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/demo.png" as="image" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={META_IMAGE_URL} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={META_IMAGE_URL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
