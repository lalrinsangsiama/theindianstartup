'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Input';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, ShoppingCart, Sparkles, Check } from 'lucide-react';

interface CartItem {
  product: {
    code: string;
    title: string;
    price: number;
  };
  quantity: number;
}

export default function MinimalSignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasEarlyBird, setHasEarlyBird] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('preSignupCart');
    const earlyBird = localStorage.getItem('earlyBirdPurchase');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (earlyBird === 'true') {
      setHasEarlyBird(true);
    }
  }, []);

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = hasEarlyBird && cart.length > 1 ? subtotal * 0.05 : 0;
    return {
      subtotal,
      discount,
      total: subtotal - discount
    };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign up with minimal data
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            pendingCart: cart.length > 0 ? cart : null,
            hasEarlyBird: hasEarlyBird,
            signupType: 'minimal',
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?minimal=true`,
        },
      });
      
      if (error) {
        setSignupError(error.message);
        return;
      }
      
      // Save minimal signup flag
      localStorage.setItem('minimalSignup', 'true');
      
      // Redirect to email verification page
      router.push('/signup/verify-email?minimal=true');
    } catch (error) {
      setSignupError('An unexpected error occurred. Please try again.');
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
      title="Create Your Account"
      subtitle="Start with just an email and password"
    >
      {/* Show cart if present */}
      {cart.length > 0 && (
        <Card className="mb-6 p-4 bg-gray-50 border-2 border-accent">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-5 h-5 text-accent" />
            <Text weight="medium">Your Selected Courses</Text>
            {hasEarlyBird && cart.length > 1 && (
              <Badge className="bg-green-100 text-green-700 text-xs">
                5% Early Bird Discount
              </Badge>
            )}
          </div>
          
          <div className="space-y-2 mb-3">
            {cart.map((item) => (
              <div key={item.product.code} className="flex justify-between text-sm">
                <Text>{item.product.title} {item.quantity > 1 && `(x${item.quantity})`}</Text>
                <Text>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</Text>
              </div>
            ))}
          </div>
          
          {(() => {
            const { subtotal, discount, total } = calculateTotal();
            return (
              <div className="border-t pt-3 space-y-1">
                {discount > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <Text color="muted">Subtotal</Text>
                      <Text color="muted">₹{subtotal.toLocaleString('en-IN')}</Text>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <Text>Discount</Text>
                      <Text>-₹{discount.toLocaleString('en-IN')}</Text>
                    </div>
                  </>
                )}
                <div className="flex justify-between font-bold">
                  <Text>Total (pay after signup)</Text>
                  <Text>₹{total.toLocaleString('en-IN')}</Text>
                </div>
              </div>
            );
          })()}
        </Card>
      )}

      {/* Quick benefits */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-green-600" />
          <Text weight="medium" className="text-green-800">Quick & Easy Signup</Text>
        </div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 text-sm text-green-700">
            <Check className="w-4 h-4" />
            <span>No phone number required</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-green-700">
            <Check className="w-4 h-4" />
            <span>Complete your profile later</span>
          </li>
          <li className="flex items-center gap-2 text-sm text-green-700">
            <Check className="w-4 h-4" />
            <span>Get instant access to dashboard</span>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {signupError && (
          <Alert variant="error" title="Signup failed">
            {signupError}
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
        
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helper="At least 8 characters"
          icon={<Lock className="w-5 h-5" />}
          required
        />
        
        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<Lock className="w-5 h-5" />}
          required
        />
        
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Checkbox
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label htmlFor="acceptTerms" className="text-sm">
              I agree to the{' '}
              <Link href="/terms" className="text-accent hover:underline" target="_blank">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-accent hover:underline" target="_blank">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <Text size="sm" className="text-red-600">
              {errors.acceptTerms}
            </Text>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          loadingText="Creating account..."
        >
          Create Account & Continue
        </Button>
        
        <div className="text-center space-y-3">
          <Text size="sm" color="muted">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-black font-medium underline hover:no-underline"
            >
              Sign in
            </Link>
          </Text>
          
          <Text size="sm" color="muted">
            Want to provide all details now?{' '}
            <Link 
              href="/signup" 
              className="text-black font-medium underline hover:no-underline"
            >
              Full signup
            </Link>
          </Text>
        </div>
      </form>
    </AuthLayout>
  );
}