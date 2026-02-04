'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { 
  XCircle, 
  ArrowRight, 
  RefreshCw,
  CreditCard,
  AlertCircle,
  MessageSquare,
  Mail,
  Phone,
  Shield,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Loader2
} from 'lucide-react';

interface PaymentError {
  code: string;
  description: string;
  solution: string;
}

const COMMON_ERRORS: PaymentError[] = [
  {
    code: 'EMAIL_NOT_VERIFIED',
    description: 'Your email address is not verified',
    solution: 'Please check your email and click the verification link before making a purchase'
  },
  {
    code: 'RATE_LIMITED',
    description: 'Too many payment attempts',
    solution: 'Please wait a few minutes before trying again'
  },
  {
    code: 'VALIDATION_ERROR',
    description: 'Invalid payment details',
    solution: 'Please check your payment information and try again. If the issue persists, contact support'
  },
  {
    code: 'ORDER_FAILED',
    description: 'Could not create your order',
    solution: 'Please try again. If the issue persists, contact support for assistance'
  },
  {
    code: 'GATEWAY_LOAD_FAILED',
    description: 'Payment gateway could not load',
    solution: 'Please check your internet connection and disable any ad blockers, then try again'
  },
  {
    code: 'VERIFICATION_FAILED',
    description: 'Payment verification failed',
    solution: 'Your payment may have been processed but verification failed. Please check your bank statement and contact support'
  },
  {
    code: 'INSUFFICIENT_FUNDS',
    description: 'Your card has insufficient funds',
    solution: 'Please ensure your card has sufficient balance or try a different payment method'
  },
  {
    code: 'CARD_DECLINED',
    description: 'Your card was declined by the bank',
    solution: 'Contact your bank to authorize the transaction or use a different card'
  },
  {
    code: 'AUTHENTICATION_FAILED',
    description: 'Payment authentication failed',
    solution: 'Please ensure you entered the correct OTP or password during payment'
  },
  {
    code: 'NETWORK_ERROR',
    description: 'Network connection was interrupted',
    solution: 'Check your internet connection and try again'
  },
  {
    code: 'SESSION_EXPIRED',
    description: 'Your payment session expired',
    solution: 'Payment sessions expire after 10 minutes. Please try again'
  }
];

function FailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext();
  
  const [showFAQ, setShowFAQ] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [savedCart, setSavedCart] = useState<any[]>([]);
  
  const errorCode = searchParams.get('error') || 'UNKNOWN';
  const orderId = searchParams.get('orderId');
  const reason = searchParams.get('reason') || 'Payment could not be processed';
  
  const errorInfo = COMMON_ERRORS.find(e => e.code === errorCode) || {
    code: 'UNKNOWN',
    description: reason,
    solution: 'Please try again or contact support if the issue persists'
  };

  useEffect(() => {
    // UFH5 FIX: Load saved cart from localStorage with try-catch for corrupted data
    try {
      const cart = localStorage.getItem('failedPaymentCart');
      if (cart) {
        const parsed = JSON.parse(cart);
        // Validate the parsed data is an array
        if (Array.isArray(parsed)) {
          setSavedCart(parsed);
        } else {
          // Invalid data format, clear it
          localStorage.removeItem('failedPaymentCart');
        }
      }
    } catch (error) {
      // Corrupted localStorage data - clear it and continue
      console.warn('Failed to parse saved cart, clearing corrupted data');
      localStorage.removeItem('failedPaymentCart');
      setSavedCart([]);
    }
  }, []);

  const handleRetryPayment = async () => {
    setRetrying(true);
    
    // Save current state for recovery
    if (savedCart.length > 0) {
      localStorage.setItem('checkoutCart', JSON.stringify(savedCart));
    }
    
    // Redirect to checkout
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const handleContactSupport = () => {
    const subject = `Payment Failed - Order ${orderId || 'Unknown'}`;
    const body = `
Hello Support Team,

I encountered an issue while making a payment on The Indian Startup platform.

Error Details:
- Error Code: ${errorCode}
- Order ID: ${orderId || 'Not available'}
- Description: ${errorInfo.description}
- User Email: ${user?.email}

Please help me resolve this issue.

Thank you,
${user?.user_metadata?.name || 'User'}
    `.trim();
    
    window.location.href = `mailto:support@theindianstartup.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Error Card */}
        <Card className="mb-8 border-2 border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-20"></div>
              <div className="relative w-20 h-20 bg-white border-2 border-red-300 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <Heading as="h1" className="mb-3">
              Payment Failed
            </Heading>
            <Text size="lg" className="mb-6 text-red-700">
              {errorInfo.description}
            </Text>

            {/* Order Details */}
            {orderId && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg mb-6">
                <Text size="sm" color="muted">Order ID:</Text>
                <Text size="sm" className="font-mono">{orderId}</Text>
              </div>
            )}

            {/* Solution */}
            <Alert variant="info" className="text-left mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <Text weight="bold" className="mb-1">What to do next:</Text>
                  <Text size="sm">{errorInfo.solution}</Text>
                </div>
              </div>
            </Alert>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleRetryPayment}
                isLoading={retrying}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {retrying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Try Again
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/pricing')}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Choose Different Product
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Payment Methods */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <Text weight="bold" size="lg">Alternative Payment Options</Text>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <CreditCard className="w-8 h-8 text-gray-600 mb-2" />
                <Text weight="medium" className="mb-1">Different Card</Text>
                <Text size="xs" color="muted">Try using a different debit or credit card</Text>
              </div>
              
              <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <div className="w-8 h-8 text-gray-600 mb-2 font-bold text-lg">UPI</div>
                <Text weight="medium" className="mb-1">UPI Payment</Text>
                <Text size="xs" color="muted">Use Google Pay, PhonePe, or Paytm</Text>
              </div>
              
              <div className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <div className="w-8 h-8 text-gray-600 mb-2">🏦</div>
                <Text weight="medium" className="mb-1">Net Banking</Text>
                <Text size="xs" color="muted">Direct bank transfer</Text>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Issues FAQ */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <button
              className="w-full flex items-center justify-between text-left"
              onClick={() => setShowFAQ(!showFAQ)}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <Text weight="bold" size="lg">Common Payment Issues</Text>
              </div>
              {showFAQ ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {showFAQ && (
              <div className="mt-4 space-y-4">
                {COMMON_ERRORS.map((error, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <Text weight="medium" className="mb-1">
                      {error.description}
                    </Text>
                    <Text size="sm" color="muted">
                      {error.solution}
                    </Text>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <Text weight="bold" className="mb-2">Need Help?</Text>
                <Text size="sm" color="muted" className="mb-4">
                  Our support team is ready to help you complete your purchase and start your startup journey.
                </Text>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleContactSupport}
                    className="w-full sm:w-auto"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <a
                      href="mailto:support@theindianstartup.in"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-4 h-4" />
                      support@theindianstartup.in
                    </a>
                    <span className="text-gray-600 flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      Response within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Badge */}
        <div className="text-center mt-8">
          <Text size="sm" color="muted" className="mb-2">
            🔒 Your payment information is secure and encrypted
          </Text>
          <Text size="xs" color="muted">
            We use industry-standard security measures to protect your data
          </Text>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function PaymentFailedPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
              <Text color="muted">Loading...</Text>
            </div>
          </div>
        </DashboardLayout>
      }>
        <FailedContent />
      </Suspense>
    </ProtectedRoute>
  );
}