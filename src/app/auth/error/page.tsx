'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';
import { Loader2, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function AuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('message') || 'An authentication error occurred';
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  const isSessionError = error.includes('PKCE') ||
                         error.includes('code verifier') ||
                         error.includes('session') ||
                         error.includes('expired') ||
                         error === 'No verification code found';

  const handleResendVerification = async () => {
    if (!email) {
      setResendError('Please enter your email address');
      return;
    }

    setIsResending(true);
    setResendError('');
    setResendSuccess(false);

    try {
      const response = await fetch('/api/user/email/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendSuccess(true);
      } else {
        setResendError(data.error || 'Failed to send verification email');
      }
    } catch {
      setResendError('Failed to send verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verification Issue"
      subtitle="Let's get you verified"
      showBackButton={false}
    >
      <div className="space-y-6">
        {isSessionError ? (
          <>
            <Alert variant="warning" title="Link opened in different browser">
              Verification links must be opened in the same browser where you signed up.
              Don&apos;t worry - your account is created! You can either:
            </Alert>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <Text weight="medium">Option 1: Login directly</Text>
              <Text size="sm" color="muted">
                Your account exists. Just login with your email and password.
              </Text>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => router.push('/login')}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to Login
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <Text weight="medium">Option 2: Request new verification email</Text>
              <Text size="sm" color="muted">
                Open the new link in THIS browser.
              </Text>

              {resendSuccess ? (
                <Alert variant="success" title="Email sent!">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Check your inbox and open the link in THIS browser.
                  </div>
                </Alert>
              ) : (
                <>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isResending}
                  />
                  {resendError && (
                    <Text size="sm" className="text-red-600">{resendError}</Text>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResendVerification}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send New Verification Email
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Alert variant="error" title="Verification failed">
              {error}
            </Alert>
            <div className="space-y-4">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => router.push('/login')}
              >
                Go to Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/signup')}
              >
                Create New Account
              </Button>
            </div>
          </>
        )}

        <div className="text-center pt-4 border-t">
          <Text size="sm" color="muted">
            Having trouble?{' '}
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
