'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Text } from '../components/ui/Typography';
import { Alert } from '../components/ui/Alert';
import { createClient } from '../lib/supabase/client';
import { Lock, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a valid session from the email link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // No valid session, redirect to forgot password
        router.push('/forgot-password');
      }
    };
    
    checkSession();
  }, [supabase, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and a number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });
      
      if (error) {
        setResetError(error.message);
      } else {
        setIsSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (error) {
      setResetError('An unexpected error occurred. Please try again.');
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

  if (isSuccess) {
    return (
      <AuthLayout 
        title="Password Reset Successfully"
        subtitle="Your password has been updated"
        showBackButton={false}
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-3">
            <Text>
              Your password has been successfully reset.
            </Text>
            <Text color="muted" size="sm">
              Redirecting you to login page in a moment...
            </Text>
          </div>

          {/* Manual Redirect Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Go to Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Create New Password"
      subtitle="Choose a strong password for your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {resetError && (
          <Alert variant="error" title="Reset failed">
            {resetError}
          </Alert>
        )}
        
        <Input
          name="password"
          label="New Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helper="At least 8 characters with uppercase, lowercase, and a number"
          icon={<Lock className="w-5 h-5" />}
          required
        />
        
        <Input
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<Lock className="w-5 h-5" />}
          required
        />
        
        {/* Password Strength Indicators */}
        <div className="space-y-2">
          <Text size="sm" weight="medium">Password strength</Text>
          <div className="space-y-1">
            <PasswordCheck 
              met={formData.password.length >= 8} 
              text="At least 8 characters" 
            />
            <PasswordCheck 
              met={/[A-Z]/.test(formData.password)} 
              text="Contains uppercase letter" 
            />
            <PasswordCheck 
              met={/[a-z]/.test(formData.password)} 
              text="Contains lowercase letter" 
            />
            <PasswordCheck 
              met={/\d/.test(formData.password)} 
              text="Contains number" 
            />
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          loadingText="Resetting password..."
        >
          Reset Password
        </Button>
        
        {/* Security Tip */}
        <div className="border-t border-gray-200 pt-6">
          <Text size="xs" color="muted" className="text-center">
            💡 Pro tip: Use a password manager to generate and store strong passwords
          </Text>
        </div>
      </form>
    </AuthLayout>
  );
}

function PasswordCheck({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
        met ? 'border-green-600 bg-green-600' : 'border-gray-300'
      }`}>
        {met && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <Text size="sm" color={met ? 'default' : 'muted'}>
        {text}
      </Text>
    </div>
  );
}