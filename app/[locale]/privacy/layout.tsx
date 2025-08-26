import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy - MoveCleanMafia',
  description:
    'Learn about how MoveCleanMafia collects, uses, and protects your personal information',
  openGraph: {
    title: 'Privacy Policy - MoveCleanMafia',
    description:
      'Learn about how MoveCleanMafia collects, uses, and protects your personal information',
    url: 'https://movecleanmafia.cz/privacy',
    siteName: 'MoveCleanMafia',
    images: [
      {
        url: '/images/logo.png',
        width: 1024,
        height: 1024,
        alt: 'MoveCleanMafia Privacy Policy',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - MoveCleanMafia',
    description:
      'Learn about how MoveCleanMafia collects, uses, and protects your personal information',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://movecleanmafia.cz/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
