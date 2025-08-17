'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Text } from '../components/ui/Typography';
import { Alert } from '../components/ui/Alert';
import { createClient } from '../lib/supabase/client';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout 
        title="Check Your Email"
        subtitle="Password reset link sent"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-3">
            <Text>
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </Text>
            <Text color="muted" size="sm">
              Click the link in the email to create a new password and get back to building your startup.
            </Text>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => router.push('/login')}
            >
              Back to Login
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
              }}
            >
              Try Different Email
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-4">
            <Text size="sm" color="muted">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button 
                onClick={handleSubmit}
                className="text-black font-medium underline hover:no-underline"
              >
                resend it
              </button>
            </Text>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset Your Password"
      subtitle="We'll send you a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="error" title="Error">
            {error}
          </Alert>
        )}
        
        <div className="space-y-4">
          <Text>
            Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
          </Text>
          
          <Input
            name="email"
            label="Email Address"
            type="email"
            placeholder="founder@startup.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            error={error}
            icon={<Mail className="w-5 h-5" />}
            required
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          loadingText="Sending reset link..."
        >
          Send Reset Link
        </Button>
        
        <div className="text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </Link>
        </div>
        
        {/* Security Note */}
        <div className="border-t border-gray-200 pt-6">
          <Text size="xs" color="muted" className="text-center">
            For security reasons, we&apos;ll send a reset link even if the email doesn&apos;t exist in our system.
            If you don&apos;t receive an email, please check if you&apos;re using the correct email address.
          </Text>
        </div>
      </form>
    </AuthLayout>
  );
}