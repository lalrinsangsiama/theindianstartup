'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { cn } from '@/lib/cn';

interface FooterProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

const footerLinks = {
  product: [
    { label: 'Products', href: '/products' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'All-Access Bundle', href: '/pricing#all-access' },
  ],
  resources: [
    { label: 'Community', href: '/community' },
    { label: 'Help Center', href: '/help' },
    { label: 'Government Schemes', href: '/government-schemes' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Cancellation Policy', href: '/cancellation-policy' },
  ],
};

export function Footer({ className, variant = 'default' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className={cn('border-t border-gray-200 bg-white', className)}>
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center">
              <Logo variant="full" className="h-6 text-black" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-black transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-black transition-colors">
                Terms
              </Link>
              <Link href="/refund-policy" className="hover:text-black transition-colors">
                Refunds
              </Link>
              <a
                href="mailto:support@theindianstartup.in"
                className="hover:text-black transition-colors"
              >
                Support
              </a>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {currentYear} The Indian Startup
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn('border-t border-gray-200 bg-gray-50', className)}>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Logo variant="full" className="h-8 text-black" />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Empowering Indian founders with modular, step-by-step playbooks from idea to global scale.
            </p>
            <a
              href="mailto:support@theindianstartup.in"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              support@theindianstartup.in
            </a>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} The Indian Startup. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made with care for Indian founders
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
