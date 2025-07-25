import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MoveCleanMafia.cz',
    default: 'MoveCleanMafia.cz - Professional Moving & Cleaning Services',
  },
  description:
    'Professional moving and cleaning services for households and businesses in Czech Republic',
  keywords: [
    'moving services',
    'cleaning services',
    'professional cleaning',
    'house moving',
    'office cleaning',
    'Czech Republic',
  ],
  authors: [{ name: 'MoveCleanMafia.cz' }],
  creator: 'MoveCleanMafia.cz',
  publisher: 'MoveCleanMafia.cz',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#6B4F2C',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://movecleanmafia.cz',
    title: 'MoveCleanMafia.cz - Professional Moving & Cleaning Services',
    description:
      'Professional moving and cleaning services for households and businesses',
    siteName: 'MoveCleanMafia.cz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoveCleanMafia.cz - Professional Moving & Cleaning Services',
    description:
      'Professional moving and cleaning services for households and businesses',
  },
  verification: {
    google: 'tAjavF9M2DplYyPZUChDkwHhQKU7ewlYPJdAGG62nUY',
  },
  alternates: {
    canonical: 'https://movecleanmafia.cz',
    languages: {
      cs: 'https://movecleanmafia.cz/cs',
      en: 'https://movecleanmafia.cz/en',
      uk: 'https://movecleanmafia.ua/ua',
    },
  },
};

// This layout is only used for the root redirect
// The actual content is handled by the [locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#6B4F2C" />
        <meta name="theme-color" content="#D6B977" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
