import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MoveCleanMafia.cz',
    default: 'MoveCleanMafia.cz - Moving & Cleaning Services',
  },
  description:
    'Professional moving and cleaning services for households and businesses in Czech Republic. Reliable, affordable, and professional moving and cleaning solutions.',
  keywords: [
    'moving services',
    'cleaning services',
    'professional cleaning',
    'house moving',
    'office cleaning',
    'Czech Republic',
    'Prague moving',
    'Prague cleaning',
    'stěhování Praha',
    'úklid Praha',
    'profesionální stěhování',
    'profesionální úklid',
    'moving company Prague',
    'cleaning company Prague',
  ],
  authors: [{ name: 'MoveCleanMafia.cz' }],
  creator: 'MoveCleanMafia.cz',
  publisher: 'MoveCleanMafia.cz',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tAjavF9M2DplYyPZUChDkwHhQKU7ewlYPJdAGG62nUY',
  },
  alternates: {
    languages: {
      cs: 'https://movecleanmafia.cz/cs',
      en: 'https://movecleanmafia.cz/en',
      uk: 'https://movecleanmafia.cz/ua',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://movecleanmafia.cz',
    title: 'MoveCleanMafia.cz - Moving & Cleaning Services',
    description:
      'Professional moving and cleaning services for households and businesses in Czech Republic. Reliable, affordable, and professional solutions.',
    siteName: 'MoveCleanMafia.cz',
    images: [
      {
        url: '/images/logo.png',
        width: 1024,
        height: 1024,
        alt: 'MoveCleanMafia Logo - Professional Moving and Cleaning Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoveCleanMafia.cz - Moving & Cleaning Services',
    description:
      'Professional moving and cleaning services for households and businesses in Czech Republic.',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
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
  category: 'business',
  classification: 'Business',
  other: {
    'geo.region': 'CZ',
    'geo.placename': 'Prague',
    'geo.position': '50.0755;14.4378',
    ICBM: '50.0755, 14.4378',
    'msapplication-TileColor': '#6B4F2C',
    'theme-color': '#D6B977',
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
    <html lang="cs" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
