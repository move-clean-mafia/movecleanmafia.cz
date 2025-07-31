import React from 'react';

import { Metadata } from 'next';
import { ProtectedRoute } from '../../../../components/protected-route';

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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <ProtectedRoute requireAdmin={true}>{children}</ProtectedRoute>;
};

export default DashboardLayout;
