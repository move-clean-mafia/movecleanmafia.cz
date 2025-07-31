import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin Dashboard - MoveCleanMafia',
  description: 'Admin dashboard for MoveCleanMafia',
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

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <>{children}</>;
};

export default AdminLayout;
