import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing - Startup Courses & Playbooks',
  description: 'Explore our modular product ecosystem with courses from Rs 4,999 to Rs 9,999. All-Access Bundle available at Rs 1,49,999. 30-day money-back guarantee.',
  path: '/pricing',
});

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
