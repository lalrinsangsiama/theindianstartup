'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const hashFragment = window.location.hash;
        
        // Parse hash fragment for OAuth tokens
        let params = new URLSearchParams();
        if (hashFragment) {
          params = new URLSearchParams(hashFragment.substring(1));
        }
        
        const accessToken = params.get('access_token');
        const type = params.get('type');
        const errorParam = params.get('error') || urlParams.get('error');
        const errorDescription = params.get('error_description') || urlParams.get('error_description');
        const redirectTo = urlParams.get('redirectTo');

        if (errorParam) {
          setError(errorDescription || 'Authentication failed');
          return;
        }

        // Handle successful authentication
        if (accessToken || type) {
          // Check for saved cart information
          const savedCart = localStorage.getItem('preSignupCart');
          const earlyBird = localStorage.getItem('earlyBirdPurchase');
          
          // Check for minimal signup flow
          const isMinimalSignup = urlParams.get('minimal') === 'true' || localStorage.getItem('minimalSignup') === 'true';

          // Handle different callback types
          switch (type) {
            case 'signup':
              // Email verification successful
              if (isMinimalSignup) {
                // For minimal signup, go directly to dashboard
                localStorage.removeItem('minimalSignup');
                router.push('/dashboard?showOnboarding=true');
              } else {
                // For full signup, redirect to onboarding
                router.push('/onboarding');
              }
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
              // Handle OAuth login/signup
              if (savedCart && savedCart !== '[]') {
                // If user had items in cart, redirect to purchase
                router.push('/purchase');
              } else if (redirectTo) {
                // If there's a redirect URL, go there
                router.push(decodeURIComponent(redirectTo));
              } else {
                // Check if user needs onboarding
                const response = await fetch('/api/user/profile');
                const profileData = await response.json();
                
                if (!profileData.hasCompletedOnboarding) {
                  router.push('/onboarding');
                } else {
                  router.push('/dashboard');
                }
              }
          }
        } else {
          // No token found, might be email verification callback
          const type = urlParams.get('type');
          if (type === 'email') {
            router.push('/login?verified=true');
          } else {
            setError('Invalid callback URL - no authentication data found');
          }
        }
      } catch (error) {
        logger.error('Auth callback error:', error);
        setError('An error occurred during authentication');
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