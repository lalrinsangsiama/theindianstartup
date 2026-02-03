'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { Loader2 } from 'lucide-react';

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('message') || 'An authentication error occurred';

  return (
    <AuthLayout
      title="Verification Failed"
      subtitle="There was a problem verifying your request"
      showBackButton={false}
    >
      <div className="space-y-6">
        <Alert variant="error" title="Verification failed">
          {error === 'No verification code found'
            ? 'The verification link is invalid or has expired. Please request a new verification email.'
            : error}
        </Alert>
        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push('/signup/verify-email')}
          >
            Request New Verification Email
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Back to Login
          </Button>

          <div className="text-center">
            <Text size="sm" color="muted">
              Having trouble?{' '}
              <a
                href="mailto:support@theindianstartup.in"
                className="text-black font-medium underline hover:no-underline"
              >
                Contact our support team
              </a>
            </Text>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

function LoadingFallback() {
  return (
    <AuthLayout
      title="Loading..."
      subtitle="Please wait"
      showBackButton={false}
    >
      <div className="flex justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    </AuthLayout>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthErrorContent />
    </Suspense>
  );
}
