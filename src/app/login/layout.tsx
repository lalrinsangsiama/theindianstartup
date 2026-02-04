import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Login',
  description: 'Sign in to your The Indian Startup account to access your courses, track progress, and connect with the founder community.',
  path: '/login',
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
