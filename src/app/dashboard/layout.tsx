import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Dashboard',
  description: 'Your personal startup dashboard. Track your progress, access courses, manage your portfolio, and connect with the founder community.',
  path: '/dashboard',
  noIndex: true, // Dashboard pages should not be indexed
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
