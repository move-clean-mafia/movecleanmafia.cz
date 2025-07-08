import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Pulmonology.cz',
    default: 'Pulmonology.cz - Professional Pulmonological Care',
  },
  description:
    'Specialized pulmonological care and respiratory health services in Czech Republic',
  keywords: [
    'pulmonology',
    'respiratory health',
    'lung care',
    'pulmonologist',
    'Czech Republic',
  ],
  authors: [{ name: 'Pulmonology.cz' }],
  creator: 'Pulmonology.cz',
  publisher: 'Pulmonology.cz',
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
        color: '#000000',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://pulmonology.cz',
    title: 'Pulmonology.cz - Professional Pulmonological Care',
    description:
      'Specialized pulmonological care and respiratory health services',
    siteName: 'Pulmonology.cz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulmonology.cz - Professional Pulmonological Care',
    description:
      'Specialized pulmonological care and respiratory health services',
  },
  verification: {
    google: 'tAjavF9M2DplYyPZUChDkwHhQKU7ewlYPJdAGG62nUY',
  },
  alternates: {
    canonical: 'https://pulmonology.cz',
    languages: {
      cs: 'https://pulmonology.cz/cs',
      en: 'https://pulmonology.cz/en',
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
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
