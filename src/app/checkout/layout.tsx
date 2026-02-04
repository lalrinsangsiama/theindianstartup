import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Checkout',
  description: 'Complete your purchase securely. Instant access to courses after payment.',
  path: '/checkout',
  noIndex: true, // Checkout pages should not be indexed
});

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
