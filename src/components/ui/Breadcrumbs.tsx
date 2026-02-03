'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  maxItems?: number; // For mobile truncation
  separator?: React.ReactNode;
}

// Route to label mappings for auto-generation
const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  products: 'Products',
  settings: 'Settings',
  community: 'Community',
  portfolio: 'Portfolio',
  journey: 'Journey',
  resources: 'Resources',
  pricing: 'Pricing',
  checkout: 'Checkout',
  purchase: 'Purchase',
  success: 'Success',
  admin: 'Admin',
  help: 'Help',
  profile: 'Profile',
  security: 'Security',
  '2fa': 'Two-Factor Auth',
  sessions: 'Active Sessions',
  billing: 'Billing',
  refunds: 'Refund History',
  notifications: 'Notifications',
  email: 'Email Preferences',
  data: 'Data & Export',
  account: 'Account',
  delete: 'Delete Account',
  onboarding: 'Onboarding',
  login: 'Login',
  signup: 'Sign Up',
  investors: 'Investor Database',
  schemes: 'Government Schemes',
  'government-schemes': 'Government Schemes',
  'state-schemes': 'State Schemes',
  'expert-sessions': 'Expert Sessions',
  day: 'Day',
  lessons: 'Lesson',
};

// Product code mappings
const PRODUCT_LABELS: Record<string, string> = {
  p1: 'P1: 30-Day Launch Sprint',
  p2: 'P2: Incorporation & Compliance',
  p3: 'P3: Funding Mastery',
  p4: 'P4: Finance Stack',
  p5: 'P5: Legal Stack',
  p6: 'P6: Sales & GTM',
  p7: 'P7: State-wise Schemes',
  p8: 'P8: Data Room',
  p9: 'P9: Government Schemes',
  p10: 'P10: Patent Mastery',
  p11: 'P11: Branding & PR',
  p12: 'P12: Marketing Mastery',
  // Add more as needed
};

/**
 * Generate breadcrumb items from the current pathname
 */
export function useBreadcrumbs(customItems?: BreadcrumbItem[]): BreadcrumbItem[] {
  const pathname = usePathname();

  if (customItems) return customItems;

  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];

  let currentPath = '';

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    // Get label
    let label = ROUTE_LABELS[segment.toLowerCase()] ||
                PRODUCT_LABELS[segment.toLowerCase()] ||
                segment.charAt(0).toUpperCase() + segment.slice(1);

    // Handle dynamic segments (numbers, IDs)
    if (/^\d+$/.test(segment)) {
      // It's a number (like day number or lesson ID)
      const prevSegment = segments[i - 1]?.toLowerCase();
      if (prevSegment === 'day') {
        label = `Day ${segment}`;
      } else if (prevSegment === 'lessons') {
        label = `Lesson ${segment}`;
      } else {
        label = `#${segment}`;
      }
    }

    // Check if it's a UUID (skip showing these)
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
      continue;
    }

    items.push({
      label,
      href: i < segments.length - 1 ? currentPath : undefined,
    });
  }

  return items;
}

export function Breadcrumbs({
  items: customItems,
  className,
  showHome = true,
  maxItems = 4,
  separator = <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />,
}: BreadcrumbsProps) {
  const generatedItems = useBreadcrumbs(customItems);
  let items = generatedItems;

  // Mobile truncation - show first, ellipsis, last few items
  if (items.length > maxItems) {
    const truncated: BreadcrumbItem[] = [
      items[0],
      { label: '...' },
      ...items.slice(-(maxItems - 2)),
    ];
    items = truncated;
  }

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {showHome && (
          <>
            <li>
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-black transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {items.length > 0 && <li>{separator}</li>}
          </>
        )}

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className={cn(
              'flex items-center',
              item.label === '...' && 'text-gray-400'
            )}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-black transition-colors max-w-[150px] truncate"
                  title={item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'max-w-[200px] truncate',
                    item.label === '...'
                      ? 'text-gray-400'
                      : 'font-medium text-gray-900'
                  )}
                  title={item.label}
                  aria-current={item.label !== '...' ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
            {index < items.length - 1 && <li>{separator}</li>}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Breadcrumb wrapper with responsive styling
 */
export function PageBreadcrumbs({
  items,
  className,
}: {
  items?: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <div className={cn('mb-4', className)}>
      <Breadcrumbs
        items={items}
        className="hidden md:flex"
        maxItems={6}
      />
      <Breadcrumbs
        items={items}
        className="flex md:hidden"
        maxItems={3}
        showHome={false}
      />
    </div>
  );
}
