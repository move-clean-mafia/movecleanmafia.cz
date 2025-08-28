import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Admin - MoveCleanMafia',
  description: 'Admin access for MoveCleanMafia',
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <>{children}</>;
};

export default AdminLayout;
