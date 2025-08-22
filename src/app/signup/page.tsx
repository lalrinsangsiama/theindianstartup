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
import { Mail, Lock, User, Phone, Check, ShoppingCart, Sparkles, Chrome, Linkedin, ArrowRight, Shield, Users } from 'lucide-react';

interface CartItem {
  product: {
    code: string;
    title: string;
    price: number;
  };
  quantity: number;
}

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasEarlyBird, setHasEarlyBird] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [socialLoading, setSocialLoading] = useState<'google' | 'linkedin' | null>(null);

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
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
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            pendingCart: cart.length > 0 ? cart : null,
            hasEarlyBird: hasEarlyBird,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setSignupError(error.message);
        return;
      }
      
      // Redirect to email verification page
      router.push('/signup/verify-email');
    } catch (error) {
      setSignupError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'linkedin') => {
    setSocialLoading(provider);
    setSignupError('');
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            cart: cart.length > 0 ? JSON.stringify(cart) : undefined,
            hasEarlyBird: hasEarlyBird ? 'true' : undefined,
          }
        },
      });
      
      if (error) {
        setSignupError(error.message);
      }
    } catch (error) {
      setSignupError('Social signup failed. Please try again.');
    } finally {
      setSocialLoading(null);
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
      title="Join India's Fastest Growing Founder Community"
      subtitle="Transform your startup idea into reality with structured, proven playbooks"
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

      {/* Trust Signal */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            <div>
              <Text className="font-bold text-green-800">2,500+</Text>
              <Text size="xs" color="muted">Active Founders</Text>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <Text className="font-bold text-blue-800">₹50L+</Text>
              <Text size="xs" color="muted">Funding Raised</Text>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <div>
              <Text className="font-bold text-purple-800">180+</Text>
              <Text size="xs" color="muted">Launched Startups</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Social Login Options */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 p-3 border-2 hover:border-blue-500 hover:bg-blue-50 transition-all"
            onClick={() => handleSocialSignup('google')}
            disabled={socialLoading !== null}
            isLoading={socialLoading === 'google'}
          >
            <Chrome className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Google</span>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 p-3 border-2 hover:border-blue-700 hover:bg-blue-50 transition-all"
            onClick={() => handleSocialSignup('linkedin')}
            disabled={socialLoading !== null}
            isLoading={socialLoading === 'linkedin'}
          >
            <Linkedin className="w-5 h-5 text-blue-700" />
            <span className="font-medium">LinkedIn</span>
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">or continue with email</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {signupError && (
          <Alert variant="error" title="Signup failed">
            {signupError}
          </Alert>
        )}
        
        <Input
          name="name"
          label="Full Name"
          type="text"
          placeholder="Ratan Tata"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<User className="w-5 h-5" />}
          required
        />
        
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
          name="phone"
          label="Mobile Number"
          type="tel"
          placeholder="9876543210"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          helper="10-digit Indian mobile number"
          icon={<Phone className="w-5 h-5" />}
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
          helper="At least 8 characters with uppercase, lowercase, and a number"
          icon={<Lock className="w-5 h-5" />}
          required
        />
        
        {/* Password Strength Indicators */}
        {formData.password && (
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
        )}
        
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
              . I understand this is an educational platform providing guides and resources only.
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
          className="w-full group bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          isLoading={isLoading}
          loadingText="Creating your founder account..."
        >
          <span>Join 2,500+ Successful Founders</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        {/* Success Guarantee */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-300 p-4 text-center rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-orange-600" />
            <Text className="font-heading font-bold text-orange-800 uppercase tracking-wider">
              30-Day Success Guarantee
            </Text>
          </div>
          <Text size="sm" color="muted" className="mb-2">
            If you don't see real progress in your startup within 30 days, we'll refund every rupee.
          </Text>
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-orange-700">
            <span>✓ Full refund policy</span>
            <span>✓ No questions asked</span>
            <span>✓ Founder-first approach</span>
          </div>
        </div>
        
        <div className="text-center">
          <Text size="sm" color="muted">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-black font-medium underline hover:no-underline"
            >
              Sign in
            </Link>
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
        {met && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
      </div>
      <Text size="sm" className={met ? 'text-green-600' : 'text-gray-500'}>
        {text}
      </Text>
    </div>
  );
}