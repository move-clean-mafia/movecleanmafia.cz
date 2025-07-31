import { Metadata } from 'next';
import { LoginForm } from '../../../../components/admin/login-form';

export const metadata: Metadata = {
  title: 'Admin Login - MoveCleanMafia',
  description: 'Admin login page for MoveCleanMafia',
};

const AdminLoginPage = () => {
  return <LoginForm />;
};

export default AdminLoginPage;
