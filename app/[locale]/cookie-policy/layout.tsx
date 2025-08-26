import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cookie Policy - MoveCleanMafia',
  description:
    'Learn about how MoveCleanMafia uses cookies and similar technologies on our website',
  openGraph: {
    title: 'Cookie Policy - MoveCleanMafia',
    description:
      'Learn about how MoveCleanMafia uses cookies and similar technologies on our website',
    url: 'https://movecleanmafia.cz/cookie-policy',
    siteName: 'MoveCleanMafia',
    images: [
      {
        url: '/images/logo.png',
        width: 1024,
        height: 1024,
        alt: 'MoveCleanMafia Cookie Policy',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy - MoveCleanMafia',
    description:
      'Learn about how MoveCleanMafia uses cookies and similar technologies on our website',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://movecleanmafia.cz/cookie-policy',
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
