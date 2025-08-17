'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay?: any;
  }
}
import { Button } from '@/components/ui';
import { Card, CardHeader, CardContent } from '@/components/ui';
import { Heading, Text } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Logo } from '@/components/icons/Logo';
import { Check, IndianRupee, Shield, Users, Calendar, Zap, Target, Award } from 'lucide-react';

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePurchase = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Check if user is logged in
      const response = await fetch('/api/user/profile');
      if (!response.ok) {
        // User not logged in, redirect to login
        window.location.href = '/login?redirect=/pricing';
        return;
      }

      // Create payment order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 4999, currency: 'INR' }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      // In development, simulate successful payment
      if (process.env.NODE_ENV === 'development') {
        const verifyResponse = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: 'pay_dev_' + Date.now(),
            razorpay_signature: 'sig_dev_' + Date.now(),
          }),
        });

        if (verifyResponse.ok) {
          window.location.href = '/dashboard?welcome=true';
        } else {
          throw new Error('Payment verification failed');
        }
        return;
      }

      // In production, use actual Razorpay
      if (typeof window !== 'undefined' && window.Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'The Indian Startup',
          description: '30-Day India Launch Sprint',
          order_id: orderData.orderId,
          handler: async function (response: any) {
            try {
              const verifyResponse = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response),
              });

              if (verifyResponse.ok) {
                window.location.href = '/dashboard?welcome=true';
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              setError('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: 'Founder',
            email: '',
          },
          theme: {
            color: '#000000',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback: redirect to login if Razorpay is not loaded
        window.location.href = '/login?redirect=/pricing';
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Target, title: '30 Days of Daily Lessons', description: 'One new lesson unlocked each day' },
    { icon: Shield, title: 'Legal Compliance', description: 'Company registration, GST, PAN, trademark' },
    { icon: Award, title: 'Implementation Focus', description: 'Real tasks, not just theory' },
    { icon: Users, title: 'Founder Community', description: 'Connect with peers on the same journey' },
    { icon: Calendar, title: '365-Day Access', description: 'Learn at your own pace, no rush' },
  ];

  const includedItems = [
    'Complete 30-day implementation system',
    'India-specific incorporation guidance',
    'Legal document templates',
    'Market research frameworks',
    'Business model validation',
    'MVP development roadmap',
    'Pitch deck templates',
    'DPIIT & Startup India benefits guide',
    'GST & tax compliance walkthrough',
    'Go-to-market strategies',
    'Financial projections templates',
    'Founder community access',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-black hover:opacity-80 transition-opacity">
              <Logo variant="full" className="h-8" />
            </Link>
            
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5 text-accent" />
              <Text className="font-medium">Replace ₹1,00,000+ in consultant fees</Text>
            </div>
            
            <Heading as="h1" className="mb-4 text-3xl md:text-5xl">
              30-Day Startup Launch System
            </Heading>
            
            <Text size="lg" className="md:text-xl text-gray-600 max-w-3xl mx-auto">
              The only implementation system you need to go from idea to incorporated, 
              investor-ready startup in India. No consultants. No confusion. Just results.
            </Text>
          </div>

          {/* Main Pricing Card */}
          <div className="max-w-2xl mx-auto">
            <Card variant="bordered" className="border-2 border-black shadow-xl">
              <CardHeader className="text-center pt-12 pb-8 border-b border-gray-200">
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <Text className="text-gray-500 line-through text-2xl">₹9,999</Text>
                  <div className="flex items-center">
                    <IndianRupee className="w-10 h-10" />
                    <Text className="font-heading text-6xl font-bold">4,999</Text>
                  </div>
                </div>
                
                <Badge variant="success" size="lg" className="mb-4">
                  FOUNDER PRICE - 50% OFF
                </Badge>
                
                <Text size="lg" className="text-gray-600">
                  One-time payment • 365-day access • Lifetime updates
                </Text>
              </CardHeader>

              <CardContent className="py-8">
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                  <div className="border-r border-gray-200">
                    <Text className="text-2xl md:text-3xl font-bold text-accent">30</Text>
                    <Text size="sm" color="muted">Daily Lessons</Text>
                  </div>
                  <div className="border-r border-gray-200">
                    <Text className="text-2xl md:text-3xl font-bold text-accent">60+</Text>
                    <Text size="sm" color="muted">Templates</Text>
                  </div>
                  <div>
                    <Text className="text-2xl md:text-3xl font-bold text-accent">365</Text>
                    <Text size="sm" color="muted">Days Access</Text>
                  </div>
                </div>

                {/* What's Included */}
                <div className="grid sm:grid-cols-2 gap-2 mb-8">
                  {includedItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <Text size="sm" className="text-gray-700">
                        {item}
                      </Text>
                    </div>
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full mb-4"
                  onClick={handlePurchase}
                  disabled={isLoading}
                  isLoading={isLoading}
                  loadingText="Processing..."
                >
                  Start Your 30-Day Journey
                </Button>
                
                <Text size="xs" color="muted" className="text-center">
                  Secure payment via Razorpay • GST included
                </Text>
              </CardContent>
            </Card>

            {/* Money Back Guarantee */}
            <div className="mt-8 bg-green-50 border-2 border-green-200 p-6 rounded-lg text-center">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <Heading as="h3" variant="h5" className="mb-2">
                30-Day Money-Back Guarantee
              </Heading>
              <Text size="sm" className="text-gray-700">
                If you don&apos;t find value in the first 30 days, we&apos;ll refund your money. 
                No questions asked.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container max-w-5xl">
          <Heading as="h2" variant="h3" className="text-center mb-12">
            Everything You Get Access To
          </Heading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <Heading as="h3" variant="h5" className="mb-2">
                    {feature.title}
                  </Heading>
                  <Text size="sm" color="muted">
                    {feature.description}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container max-w-3xl text-center">
          <Heading as="h2" variant="h2" className="text-white mb-6">
            Ready to Launch Your Startup?
          </Heading>
          <Text size="xl" className="text-gray-300 mb-8">
            Your journey to becoming a registered founder starts today. 
            30 days from idea to incorporated startup.
          </Text>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handlePurchase}
            disabled={isLoading}
            isLoading={isLoading}
            loadingText="Processing..."
            className="bg-white text-black hover:bg-gray-100"
          >
            Get Instant Access for ₹4,999
          </Button>
          <Text size="sm" className="text-gray-400 mt-4">
            Secure checkout • Instant access • 30-day guarantee
          </Text>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-8 text-center">
        <Text color="muted">
          Questions?{' '}
          <a 
            href="mailto:support@theindianstartup.in" 
            className="text-black underline hover:no-underline"
          >
            Email us at support@theindianstartup.in
          </a>
        </Text>
      </section>
    </div>
  );
}