'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Alert } from '@/components/ui/Alert';
import { createClient } from '@/lib/supabase/client';
import { Mail, CheckCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState('');

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendError('');
    setResendSuccess(false);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.email) {
        setResendError('No email found. Please sign up again.');
        return;
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setResendError(error.message);
      } else {
        setResendSuccess(true);
      }
    } catch (error) {
      setResendError('Failed to resend email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout 
      title="Check Your Email"
      subtitle="We've sent you a verification link"
      showBackButton={false}
    >
      <div className="space-y-6">
        {/* Email Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Mail className="w-10 h-10 text-gray-600" />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-3">
          <Text>
            We&apos;ve sent a verification email to your registered email address.
          </Text>
          <Text color="muted" size="sm">
            Click the link in the email to verify your account and start your 30-day journey.
          </Text>
        </div>

        {/* Success Alert */}
        {resendSuccess && (
          <Alert variant="success" title="Email sent!" icon={<CheckCircle className="w-5 h-5" />}>
            We&apos;ve resent the verification email. Please check your inbox.
          </Alert>
        )}

        {/* Error Alert */}
        {resendError && (
          <Alert variant="error" title="Failed to resend">
            {resendError}
          </Alert>
        )}

        {/* Resend Button */}
        <div className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleResendEmail}
            isLoading={isResending}
            loadingText="Resending..."
          >
            Resend Verification Email
          </Button>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Go to Login
          </Button>
        </div>

        {/* Help Text */}
        <div className="border-t border-gray-200 pt-6">
          <Heading as="h3" variant="h6" className="mb-3">
            Didn&apos;t receive the email?
          </Heading>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <Text size="sm" color="muted">
                Check your spam or junk folder
              </Text>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <Text size="sm" color="muted">
                Make sure you entered the correct email address
              </Text>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <Text size="sm" color="muted">
                Email delivery can take up to 5 minutes
              </Text>
            </li>
          </ul>
        </div>

        {/* Support Link */}
        <div className="text-center pt-4">
          <Text size="sm" color="muted">
            Still having issues?{' '}
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