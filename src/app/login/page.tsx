'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input, Checkbox } from '@/components/ui/Input';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

export default function LoginPage() {
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
      
      // Successful login - redirect to dashboard
      router.push('/dashboard');
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
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
          <div className="text-center">
            <Text className="font-heading font-bold text-xl">2,847</Text>
            <Text size="xs" color="muted">Active Founders</Text>
          </div>
          <div className="text-center">
            <Text className="font-heading font-bold text-xl">₹12.3L</Text>
            <Text size="xs" color="muted">Raised This Month</Text>
          </div>
          <div className="text-center">
            <Text className="font-heading font-bold text-xl">89%</Text>
            <Text size="xs" color="muted">Completion Rate</Text>
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
        
        {/* Demo Account */}
        <div className="border-t border-gray-200 pt-6">
          <Text size="xs" color="muted" className="text-center">
            Want to explore? Use demo account:{' '}
            <span className="font-mono">demo@theindianstartup.in</span>
          </Text>
        </div>
      </form>
    </AuthLayout>
  );
}