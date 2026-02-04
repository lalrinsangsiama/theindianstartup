import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Sign Up - Join the Founder Community',
  description: 'Create your free account to access startup playbooks, connect with founders, and start your entrepreneurial journey in India.',
  path: '/signup',
});

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
