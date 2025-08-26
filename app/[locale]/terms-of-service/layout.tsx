import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service - MoveCleanMafia',
  description:
    'Terms of Service and legal conditions for using MoveCleanMafia services',
  openGraph: {
    title: 'Terms of Service - MoveCleanMafia',
    description:
      'Terms of Service and legal conditions for using MoveCleanMafia services',
    url: 'https://movecleanmafia.cz/terms-of-service',
    siteName: 'MoveCleanMafia',
    images: [
      {
        url: '/images/logo.png',
        width: 1024,
        height: 1024,
        alt: 'MoveCleanMafia Terms of Service',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - MoveCleanMafia',
    description:
      'Terms of Service and legal conditions for using MoveCleanMafia services',
    images: ['/images/logo.png'],
  },
  alternates: {
    canonical: 'https://movecleanmafia.cz/terms-of-service',
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
