'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  Clock,
  BookOpen,
  Users,
  Award,
  Shield,
  Loader2,
  IndianRupee
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PurchasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);
      setError('');

      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productType: '30_day_guide' }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Initialize Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.name,
        description: orderData.description,
        order_id: orderData.orderId,
        prefill: orderData.prefill,
        theme: {
          color: '#000000',
        },
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            // Redirect to journey
            router.push('/journey?purchased=true');
          } catch (error) {
            console.error('Payment verification error:', error);
            setError('Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Purchase error:', error);
      setError('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" size="lg" className="mb-4">
              LIMITED TIME: ₹1 Test Price
            </Badge>
            <Heading as="h1" className="mb-4">
              Start Your 30-Day Startup Journey
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Get instant access to the complete 30-Day India Launch Sprint and transform your idea into a launch-ready startup
            </Text>
          </div>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          {/* Pricing Card */}
          <Card className="border-2 border-black mb-8">
            <CardHeader className="bg-black text-white">
              <CardTitle className="flex items-center justify-between">
                <span>30-Day India Launch Sprint</span>
                <div className="text-right">
                  <Text className="text-gray-400 line-through text-sm">₹4,999</Text>
                  <div className="flex items-center text-3xl font-bold">
                    <IndianRupee className="w-6 h-6" />
                    <span>1</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">30 Daily Lessons</Text>
                      <Text size="sm" color="muted">Step-by-step guidance from idea to launch</Text>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">India-Specific Content</Text>
                      <Text size="sm" color="muted">GST, DPIIT, MCA compliance covered</Text>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">Templates & Tools</Text>
                      <Text size="sm" color="muted">Ready-to-use documents and resources</Text>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">Portfolio Builder</Text>
                      <Text size="sm" color="muted">Auto-build your startup portfolio</Text>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">Community Access</Text>
                      <Text size="sm" color="muted">Connect with fellow founders</Text>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">Expert Guidance</Text>
                      <Text size="sm" color="muted">Weekly office hours included</Text>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">1 Year Access</Text>
                      <Text size="sm" color="muted">Learn at your own pace</Text>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <Text weight="medium">Certificate</Text>
                      <Text size="sm" color="muted">Get certified upon completion</Text>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handlePurchase}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Get Instant Access for ₹1
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>365 Days Access</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <Text weight="medium">30 Days</Text>
                <Text size="sm" color="muted">Of Content</Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <Text weight="medium">100+</Text>
                <Text size="sm" color="muted">Active Founders</Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <Text weight="medium">10+</Text>
                <Text size="sm" color="muted">Success Stories</Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <Text weight="medium">45-60</Text>
                <Text size="sm" color="muted">Min/Day</Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}