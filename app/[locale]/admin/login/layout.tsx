import React from 'react';

import { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import '../../../globals.css';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Admin Login - MoveCleanMafia',
  description: 'Admin login page for MoveCleanMafia',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  other: {
    googlebot: 'noindex, nofollow',
    robots: 'noindex, nofollow',
  },
};

interface AdminLoginLayoutProps {
  children: React.ReactNode;
}

const AdminLoginLayout = ({ children }: AdminLoginLayoutProps) => {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${oswald.variable} ${sourceSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default AdminLoginLayout;
