'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, ArrowRight, CheckCircle, Users, Shield, Sparkles } from 'lucide-react';

// Client-side rate limiting configuration
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Validates that a redirect path is safe (internal only)
 * Prevents open redirect vulnerabilities
 */
function isValidRedirectPath(path: string | null): boolean {
  if (!path) return false;
  // Must start with / but not // (which could be protocol-relative URL)
  return path.startsWith('/') && !path.startsWith('//');
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(false);

  // Client-side rate limiting state
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const lockoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check for stored lockout on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLockout = localStorage.getItem('loginLockoutUntil');
      const storedAttempts = localStorage.getItem('loginAttempts');

      if (storedLockout) {
        const lockoutTime = parseInt(storedLockout, 10);
        if (lockoutTime > Date.now()) {
          setLockoutUntil(lockoutTime);
          setLoginAttempts(parseInt(storedAttempts || '0', 10));
        } else {
          // Lockout expired, clear it
          localStorage.removeItem('loginLockoutUntil');
          localStorage.removeItem('loginAttempts');
        }
      }
    }
  }, []);

  // Update lockout timer
  useEffect(() => {
    if (lockoutUntil && lockoutUntil > Date.now()) {
      const updateTimer = () => {
        if (lockoutUntil <= Date.now()) {
          setLockoutUntil(null);
          setLoginAttempts(0);
          localStorage.removeItem('loginLockoutUntil');
          localStorage.removeItem('loginAttempts');
        }
      };

      lockoutTimerRef.current = setInterval(updateTimer, 1000);
      return () => {
        if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current);
      };
    }
  }, [lockoutUntil]);

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

    // Check if user is locked out (client-side rate limiting)
    if (lockoutUntil && lockoutUntil > Date.now()) {
      const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000);
      const remainingMinutes = Math.ceil(remainingSeconds / 60);
      setLoginError(
        `Too many login attempts. Please try again in ${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}.`
      );
      return;
    }

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
        // Track failed login attempt for rate limiting
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());

        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
          setLockoutUntil(lockoutTime);
          localStorage.setItem('loginLockoutUntil', lockoutTime.toString());
          setLoginError(
            'Too many failed login attempts. Your account has been temporarily locked for 15 minutes.'
          );
        } else if (error.message.includes('Email not confirmed')) {
          router.push('/signup/verify-email');
        } else {
          const attemptsRemaining = MAX_LOGIN_ATTEMPTS - newAttempts;
          setLoginError(
            `${error.message}${attemptsRemaining <= 2 ? ` (${attemptsRemaining} attempt${attemptsRemaining === 1 ? '' : 's'} remaining)` : ''}`
          );
        }
        return;
      }

      // Successful login - reset rate limiting
      setLoginAttempts(0);
      setLockoutUntil(null);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('loginLockoutUntil');

      // Check if there's a redirect URL
      const redirectTo = searchParams.get('redirectTo');

      // Get saved redirect from session storage
      const savedRedirect =
        typeof window !== 'undefined' ? sessionStorage.getItem('redirectAfterLogin') : null;

      // Clear session storage
      if (savedRedirect) {
        sessionStorage.removeItem('redirectAfterLogin');
      }

      // SECURITY FIX: Validate redirect paths to prevent open redirect vulnerability
      // Only allow internal paths starting with '/' but not '//' (protocol-relative URLs)
      let destination = '/dashboard';
      if (savedRedirect && isValidRedirectPath(savedRedirect)) {
        destination = savedRedirect;
      } else if (redirectTo && isValidRedirectPath(redirectTo)) {
        destination = redirectTo;
      }

      router.push(destination);
    } catch (error) {
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back, Founder"
      subtitle="Continue building your startup empire"
    >
      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <div>
              <Text size="sm" className="font-bold text-blue-800">30</Text>
              <Text size="xs" color="muted">Courses</Text>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <div>
              <Text size="sm" className="font-bold text-green-800">1000+</Text>
              <Text size="xs" color="muted">Templates</Text>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <div>
              <Text size="sm" className="font-bold text-purple-800">450+</Text>
              <Text size="xs" color="muted">Action Items</Text>
            </div>
          </div>
        </div>
      </div>

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
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          isLoading={isLoading}
          loadingText="Signing you in..."
        >
          <span>Continue Your Startup Journey</span>
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