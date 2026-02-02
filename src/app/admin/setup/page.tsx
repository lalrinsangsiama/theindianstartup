import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import AdminSetupClient from './AdminSetupClient';

export default async function AdminSetupPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect('/login');
  }

  return <AdminSetupClient />;
}
