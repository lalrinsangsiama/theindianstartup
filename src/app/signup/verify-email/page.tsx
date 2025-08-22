'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Heading } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { createClient } from '@/lib/supabase/client';
import { Mail, CheckCircle, Sparkles, Clock, RefreshCw } from 'lucide-react';

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
        {/* Email Icon with Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-blue-600 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-3">
          <Text className="text-lg font-semibold">
            Check your inbox! 📧
          </Text>
          <Text>
            We've sent a verification email to your registered email address.
          </Text>
          <Text color="muted" size="sm">
            Click the link in the email to verify your account and start building your startup empire.
          </Text>
        </div>

        {/* Timeline Steps */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <Text size="xs" className="font-medium">Email Sent</Text>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <Text size="xs" className="font-medium">Click Link</Text>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-gray-600" />
              </div>
              <Text size="xs" className="font-medium">Start Journey</Text>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {resendSuccess && (
          <Alert variant="success" title="Email sent!" icon={<CheckCircle className="w-5 h-5" />}>
            We've resent the verification email. Please check your inbox.
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
            className="w-full group border-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
            onClick={handleResendEmail}
            isLoading={isResending}
            loadingText="Resending..."
          >
            <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
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
            Didn't receive the email?
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