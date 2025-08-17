'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { Text } from '../../components/ui/Typography';
import { Alert } from '../../components/ui/Alert';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      // Get the hash fragment from the URL
      const hashFragment = window.location.hash;
      
      if (!hashFragment) {
        setError('Invalid callback URL');
        return;
      }

      // Parse the hash fragment
      const params = new URLSearchParams(hashFragment.substring(1));
      const accessToken = params.get('access_token');
      const type = params.get('type');
      const errorParam = params.get('error');
      const errorDescription = params.get('error_description');

      if (errorParam) {
        setError(errorDescription || 'Authentication failed');
        return;
      }

      if (!accessToken) {
        setError('No access token received');
        return;
      }

      // Handle different callback types
      switch (type) {
        case 'signup':
          // Email verification successful - redirect to onboarding for new users
          router.push('/onboarding');
          break;
        
        case 'recovery':
          // Password reset link clicked
          router.push('/reset-password');
          break;
        
        case 'invite':
          // Handle team invites (future feature)
          router.push('/dashboard');
          break;
        
        default:
          // Default to dashboard
          router.push('/dashboard');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <AuthLayout 
      title="Processing..."
      subtitle="Please wait while we verify your request"
      showBackButton={false}
    >
      <div className="space-y-6">
        {error ? (
          <>
            <Alert variant="error" title="Verification failed">
              {error === 'Invalid callback URL' 
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
              
              <div className="text-center">
                <Text size="sm" color="muted">
                  Having trouble? {' '}
                  <a 
                    href="mailto:support@theindianstartup.in" 
                    className="text-black font-medium underline hover:no-underline"
                  >
                    Contact our support team
                  </a>
                </Text>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            <Text color="muted">Verifying your request...</Text>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}