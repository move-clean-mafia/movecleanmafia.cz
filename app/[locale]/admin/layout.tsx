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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {children}
    </div>
  );
};

export default AdminLayout;
