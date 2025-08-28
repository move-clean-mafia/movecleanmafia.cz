import { redirect } from 'next/navigation';
import { defaultLanguage } from '@/lib/i18n';

export default function AdminLoginRedirect() {
  // Redirect to the default language admin login
  redirect(`/${defaultLanguage}/admin/login`);
}
