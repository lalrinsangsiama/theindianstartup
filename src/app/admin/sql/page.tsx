import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import SQLCommandsClient from './SQLCommandsClient';

export default async function SQLCommandsPage() {
  try {
    await requireAdmin();
  } catch (error) {
    redirect('/login');
  }

  return <SQLCommandsClient />;
}
