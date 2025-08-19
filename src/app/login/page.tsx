'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Input';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(false);

  useEffect(() => {
    // Check if user just verified their email
    if (searchParams.get('verified') === 'true') {
      setShowVerifiedMessage(true);
      // Hide the message after 5 seconds
      setTimeout(() => setShowVerifiedMessage(false), 5000);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          router.push('/signup/verify-email');
        } else {
          setLoginError(error.message);
        }
        return;
      }
      
      // Check if user needs onboarding
      const response = await fetch('/api/user/profile');
      const profileData = await response.json();
      
      if (!profileData.hasCompletedOnboarding) {
        router.push('/onboarding');
        return;
      }
      
      // Check if there's a redirect URL
      const redirectTo = searchParams.get('redirectTo');
      
      // Get saved redirect from session storage
      const savedRedirect = typeof window !== 'undefined' 
        ? sessionStorage.getItem('redirectAfterLogin')
        : null;
      
      // Clear session storage
      if (savedRedirect) {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      // Redirect to saved URL, query param, or dashboard
      const destination = savedRedirect || redirectTo || '/dashboard';
      router.push(destination);
    } catch (error) {
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back, Founder"
      subtitle="Continue your startup journey"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {showVerifiedMessage && (
          <Alert variant="success" title="Email verified!" icon={<CheckCircle className="w-5 h-5" />}>
            Your email has been verified. You can now log in to your account.
          </Alert>
        )}
        
        {loginError && (
          <Alert variant="error" title="Login failed">
            {loginError}
          </Alert>
        )}
        
        <Input
          name="email"
          label="Email Address"
          type="email"
          placeholder="founder@startup.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<Mail className="w-5 h-5" />}
          required
        />
        
        <div>
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={<Lock className="w-5 h-5" />}
            required
          />
          <div className="mt-2 text-right">
            <Link 
              href="/forgot-password" 
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Checkbox
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          label="Remember me for 30 days"
        />
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full group"
          isLoading={isLoading}
          loadingText="Signing in..."
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        {/* Platform Benefits */}
        <div className="py-6 border-y border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <Text className="font-heading font-bold text-lg">30 Days</Text>
              <Text size="xs" color="muted">Structured Journey</Text>
            </div>
            <div>
              <Text className="font-heading font-bold text-lg">365 Days</Text>
              <Text size="xs" color="muted">Platform Access</Text>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Text size="sm" color="muted">
            New to The Indian Startup?{' '}
            <Link 
              href="/signup" 
              className="text-black font-medium underline hover:no-underline"
            >
              Start your journey
            </Link>
          </Text>
        </div>
      </form>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <Text color="muted">Loading...</Text>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}