import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { AdminCMS } from '@/components/admin/AdminCMS';

export default async function AdminCMSPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect('/login');
  }

  return <AdminCMS />;
}