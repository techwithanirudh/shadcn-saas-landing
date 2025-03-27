import { baseUrl, createMetadata } from '@/lib/metadata';
import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import 'katex/dist/katex.css';
import { Body } from './layout.client';
import { description as homeDescription } from './layout.config';
import { Provider } from './provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = createMetadata({
  title: {
    template: '%s | Blog',
    default: 'Blog',
  },
  description: homeDescription,
  metadataBase: baseUrl,
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <Body>
        <Provider>{children}</Provider>
      </Body>
    </html>
  );
};

export default RootLayout;
