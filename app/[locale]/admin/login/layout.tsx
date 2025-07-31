import React from 'react';

import { Metadata } from 'next';
import { Baloo_Bhai_2, Inter } from 'next/font/google';
import '../../../globals.css';

const balooBhai = Baloo_Bhai_2({
  variable: '--font-baloo-bhai',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
      <body className={`${balooBhai.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default AdminLoginLayout;
