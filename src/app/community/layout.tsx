import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Community - Connect with Indian Founders',
  description: 'Join the vibrant community of Indian founders. Share experiences, ask questions, and network with entrepreneurs building startups in India.',
  path: '/community',
});

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
