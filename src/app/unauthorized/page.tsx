'use client';

import Link from 'next/link';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { ShieldX } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <AuthLayout 
      title="Access Denied"
      subtitle="You don't have permission to view this page"
      showBackButton={false}
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldX className="w-10 h-10 text-red-600" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-3">
          <Text>
            The page you're trying to access requires special permissions.
          </Text>
          <Text color="muted" size="sm">
            If you believe this is an error, please contact support.
          </Text>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/dashboard" className="block">
            <Button variant="primary" size="lg" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
          
          <Link href="/" className="block">
            <Button variant="outline" size="lg" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support Link */}
        <div className="text-center pt-4">
          <Text size="sm" color="muted">
            Need help?{' '}
            <a 
              href="mailto:support@theindianstartup.in" 
              className="text-black font-medium underline hover:no-underline"
            >
              Contact support
            </a>
          </Text>
        </div>
      </div>
    </AuthLayout>
  );
}