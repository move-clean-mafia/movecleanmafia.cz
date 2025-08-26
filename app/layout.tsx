import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | MoveCleanMafia.cz',
    default: 'MoveCleanMafia.cz - Professional Moving & Cleaning Services',
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
    canonical: 'https://movecleanmafia.cz',
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
    title: 'MoveCleanMafia.cz - Professional Moving & Cleaning Services',
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
    title: 'MoveCleanMafia.cz - Professional Moving & Cleaning Services',
    description:
      'Professional moving and cleaning services for households and businesses in Czech Republic.',
    images: ['/images/logo.png'],
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
  category: 'business',
  classification: 'Business',
  other: {
    'geo.region': 'CZ',
    'geo.placename': 'Prague',
    'geo.position': '50.0755;14.4378',
    ICBM: '50.0755, 14.4378',
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
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

        {/* Additional SEO meta tags */}
        <meta name="author" content="MoveCleanMafia" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://movecleanmafia.cz" />

        {/* Alternate language versions */}
        <link
          rel="alternate"
          hrefLang="cs"
          href="https://movecleanmafia.cz/cs"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://movecleanmafia.cz/en"
        />
        <link
          rel="alternate"
          hrefLang="ua"
          href="https://movecleanmafia.cz/ua"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://movecleanmafia.cz/cs"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'MoveCleanMafia',
              description:
                'Professional moving and cleaning services for households and businesses in Czech Republic',
              url: 'https://movecleanmafia.cz',
              telephone: '+420 774 635 981',
              email: 'move.cleanmafia@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Prague',
                addressCountry: 'CZ',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 50.0755,
                longitude: 14.4378,
              },
              openingHours: 'Mo-Su 00:00-23:59',
              priceRange: '$$',
              serviceArea: {
                '@type': 'City',
                name: 'Prague',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Moving and Cleaning Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Moving Services',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Cleaning Services',
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
