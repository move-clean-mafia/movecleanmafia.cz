import { Metadata } from 'next';
import { Dashboard } from '../../../../components/admin/dashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard - MoveCleanMafia',
  description: 'Admin dashboard for managing reservations and services',
};

const AdminDashboardPage = () => {
  return <Dashboard />;
};

export default AdminDashboardPage;
