import { redirect } from 'next/navigation';
import { defaultLanguage } from '@/lib/i18n';

export default function AdminPage() {
  // Redirect to the default language admin dashboard
  redirect(`/${defaultLanguage}/admin/dashboard`);
}
