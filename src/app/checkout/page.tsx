'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { logger } from '@/lib/logger';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  CheckCircle, 
  ArrowRight, 
  Shield,
  Lock,
  IndianRupee,
  Loader2,
  CreditCard,
  ShoppingCart,
  Tag,
  Clock,
  Sparkles,
  Trophy,
  Star,
  Gift,
  Users,
  TrendingUp,
  Percent,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Mail,
  User,
  Building,
  MapPin
} from 'lucide-react';
import { PRODUCTS } from '@/lib/products-catalog';
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  productCode: string;
  quantity: number;
  price: number;
  title: string;
  description?: string;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  
  // Billing details
  const [billingDetails, setBillingDetails] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    company: '',
    gst: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Load cart from URL params or localStorage
  useEffect(() => {
    const productParam = searchParams.get('product');
    const bundleParam = searchParams.get('bundle');
    
    if (productParam) {
      const product = PRODUCTS[productParam];
      if (product) {
        setCart([{
          productCode: productParam,
          quantity: 1,
          price: product.price,
          title: product.title,
          description: product.description
        }]);
      }
    } else if (bundleParam === 'all') {
      const allAccess = PRODUCTS.ALL_ACCESS;
      setCart([{
        productCode: 'ALL_ACCESS',
        quantity: 1,
        price: allAccess.price,
        title: allAccess.title,
        description: allAccess.description
      }]);
    } else {
      // Load from localStorage
      const savedCart = localStorage.getItem('checkoutCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [searchParams]);

  // Calculate pricing
  const calculatePricing = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    
    // Apply bundle discount
    if (cart.some(item => item.productCode === 'ALL_ACCESS')) {
      discount = 25986; // Bundle saves ₹25,986
    }
    
    // Apply coupon discount
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount += subtotal * (appliedCoupon.discount / 100);
      } else {
        discount += appliedCoupon.discount;
      }
    }
    
    const tax = 0; // No GST for educational content
    const total = subtotal - discount + tax;
    
    return { subtotal, discount, tax, total };
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    try {
      // Validate coupon with API
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCode.trim().toUpperCase(),
          productCodes: cart.map(item => item.productCode)
        })
      });

      if (response.ok) {
        const couponData = await response.json();
        if (couponData.valid) {
          setAppliedCoupon({
            code: couponData.code,
            type: couponData.type,
            discount: couponData.discount,
            description: couponData.description || `${couponData.discount}${couponData.type === 'percentage' ? '%' : '₹'} off`
          });
          setError('');
        } else {
          setError(couponData.message || 'Invalid coupon code');
          setAppliedCoupon(null);
        }
      } else {
        setError('Invalid coupon code');
        setAppliedCoupon(null);
      }
    } catch (err) {
      setError('Failed to validate coupon. Please try again.');
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate billing details
      if (!billingDetails.name || !billingDetails.email || !billingDetails.phone) {
        setError('Please fill in all required billing details');
        setLoading(false);
        return;
      }

      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error('Failed to load payment gateway');
      }

      const { total } = calculatePricing();
      const productCodes = cart.map(item => item.productCode).join(',');

      // Create order
      const orderResponse = await fetch('/api/purchase/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productType: cart.length === 1 ? cart[0].productCode : 'BUNDLE',
          amount: total * 100, // Convert to paise
          couponCode: appliedCoupon?.code,
          products: cart,
          billingDetails
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Initialize Razorpay with enhanced options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'The Indian Startup',
        description: cart.map(item => item.title).join(', '),
        image: '/logo.png',
        order_id: orderData.orderId,
        prefill: {
          name: billingDetails.name,
          email: billingDetails.email,
          contact: billingDetails.phone
        },
        notes: {
          products: productCodes,
          coupon: appliedCoupon?.code || ''
        },
        theme: {
          color: '#000000',
          backdrop_color: 'rgba(0, 0, 0, 0.9)'
        },
        modal: {
          confirm_close: true,
          ondismiss: function() {
            setLoading(false);
            logger.info('Payment cancelled by user');
          },
          animation: true
        },
        handler: async function (response: any) {
          try {
            // Show processing state
            setLoading(true);
            setError('Processing your payment...');
            
            // Verify payment
            const verifyResponse = await fetch('/api/purchase/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                products: cart,
                billingDetails
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const verifyData = await verifyResponse.json();
            
            // Clear cart
            localStorage.removeItem('checkoutCart');
            
            // Track conversion
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'purchase', {
                currency: 'INR',
                value: total,
                items: cart.map(item => ({
                  item_id: item.productCode,
                  item_name: item.title,
                  price: item.price,
                  quantity: item.quantity
                }))
              });
            }
            
            // Redirect to success page
            router.push(`/purchase/success?orderId=${verifyData.orderId}`);
          } catch (error) {
            logger.error('Payment verification error:', error);
            setError('Payment verification failed. Please contact support with your payment ID.');
            setLoading(false);
          }
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        remember_customer: true,
        customer_id: user?.id,
        recurring: false,
        subscription_id: null,
        subscription_card_change: false,
        timeout: 600, // 10 minutes
        readonly: {
          contact: false,
          email: false,
          name: false
        }
      };

      const razorpay = new window.Razorpay(options);
      
      // Handle payment failures
      razorpay.on('payment.failed', function (response: any) {
        logger.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description}. Please try again.`);
        setLoading(false);
      });

      razorpay.open();

    } catch (error) {
      logger.error('Purchase error:', error);
      setError('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  const { subtotal, discount, tax, total } = calculatePricing();

  // Check if email is verified
  const isEmailVerified = !!user?.email_confirmed_at;

  if (cart.length === 0) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-8">
          <Card className="text-center p-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <Heading as="h2" variant="h3" className="mb-2">Your cart is empty</Heading>
            <Text color="muted" className="mb-6">Add products to continue with checkout</Text>
            <Button
              variant="primary"
              onClick={() => router.push('/pricing')}
            >
              Browse Products
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <Text size="sm" className="text-green-600 font-medium">
              Secure Checkout • SSL Encrypted • 100% Safe
            </Text>
          </div>
          <Heading as="h1" className="mb-2">Complete Your Purchase</Heading>
          <Text color="muted">You're one step away from transforming your startup idea into reality</Text>
        </div>

        {/* Email Verification Warning */}
        {user?.email && !isEmailVerified && (
          <EmailVerificationBanner
            email={user.email}
            isVerified={isEmailVerified}
            className="mb-6"
          />
        )}

        {error && (
          <Alert variant={error.includes('Processing') ? 'info' : 'error'} className="mb-6">
            {error}
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <Text weight="bold" size="lg">Billing Information</Text>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    value={billingDetails.name}
                    onChange={(e) => setBillingDetails({...billingDetails, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) => setBillingDetails({...billingDetails, email: e.target.value})}
                    placeholder="founder@startup.com"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number *"
                    type="tel"
                    value={billingDetails.phone}
                    onChange={(e) => setBillingDetails({...billingDetails, phone: e.target.value})}
                    placeholder="9876543210"
                    required
                  />
                  <Input
                    label="Company Name"
                    value={billingDetails.company}
                    onChange={(e) => setBillingDetails({...billingDetails, company: e.target.value})}
                    placeholder="Your startup name (optional)"
                  />
                </div>

                <Input
                  label="GST Number (Optional)"
                  value={billingDetails.gst}
                  onChange={(e) => setBillingDetails({...billingDetails, gst: e.target.value})}
                  placeholder="For tax invoice (optional)"
                  helper="Add GST number to receive tax invoice"
                />

                <div className="border-t pt-4">
                  <Text size="sm" weight="medium" className="mb-3">Billing Address (Optional)</Text>
                  <div className="space-y-4">
                    <Input
                      label="Street Address"
                      value={billingDetails.address}
                      onChange={(e) => setBillingDetails({...billingDetails, address: e.target.value})}
                      placeholder="Enter your address"
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        value={billingDetails.city}
                        onChange={(e) => setBillingDetails({...billingDetails, city: e.target.value})}
                        placeholder="City"
                      />
                      <Input
                        label="State"
                        value={billingDetails.state}
                        onChange={(e) => setBillingDetails({...billingDetails, state: e.target.value})}
                        placeholder="State"
                      />
                      <Input
                        label="PIN Code"
                        value={billingDetails.pincode}
                        onChange={(e) => setBillingDetails({...billingDetails, pincode: e.target.value})}
                        placeholder="6 digits"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coupon Code */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <Text weight="bold">Have a Coupon Code?</Text>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode('');
                      }}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={applyCoupon}
                      isLoading={couponLoading}
                    >
                      Apply
                    </Button>
                  )}
                </div>
                {appliedCoupon && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <Text size="sm" className="text-green-700">
                        {appliedCoupon.description}
                      </Text>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <Text weight="bold" size="lg">Payment Method</Text>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-3">
                  <button
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <Text size="sm" weight={paymentMethod === 'card' ? 'bold' : 'medium'}>
                      Card
                    </Text>
                  </button>
                  
                  <button
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'upi' 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-2" />
                    <Text size="sm" weight={paymentMethod === 'upi' ? 'bold' : 'medium'}>
                      UPI
                    </Text>
                  </button>
                  
                  <button
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === 'netbanking' 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <Building className="w-6 h-6 mx-auto mb-2" />
                    <Text size="sm" weight={paymentMethod === 'netbanking' ? 'bold' : 'medium'}>
                      Net Banking
                    </Text>
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <Text size="sm" weight="medium" className="text-blue-900">
                        Secure Payment via Razorpay
                      </Text>
                      <Text size="xs" className="text-blue-700 mt-1">
                        Your payment information is encrypted and secure. We never store your card details.
                      </Text>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
                <div>
                  <Text size="sm" weight="bold">SSL Secured</Text>
                  <Text size="xs" color="muted">256-bit encryption</Text>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <Text size="sm" weight="bold">Money Back</Text>
                  <Text size="xs" color="muted">3-day guarantee</Text>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <Text size="sm" weight="bold">30 Complete Courses</Text>
                  <Text size="xs" color="muted">India-specific guidance</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader 
                className="cursor-pointer lg:cursor-default"
                onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <Text weight="bold" size="lg">Order Summary</Text>
                  </div>
                  <div className="lg:hidden">
                    {orderSummaryOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className={`space-y-4 ${!orderSummaryOpen && 'hidden lg:block'}`}>
                {/* Cart Items */}
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-start pb-3 border-b">
                      <div className="flex-1">
                        <Text weight="medium" size="sm">{item.title}</Text>
                        <Text size="xs" color="muted" className="mt-1">
                          Qty: {item.quantity}
                        </Text>
                      </div>
                      <Text weight="bold">₹{item.price.toLocaleString('en-IN')}</Text>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <Text size="sm">Subtotal</Text>
                    <Text size="sm">₹{subtotal.toLocaleString('en-IN')}</Text>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <Text size="sm">Discount</Text>
                      <Text size="sm">-₹{discount.toLocaleString('en-IN')}</Text>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Text size="sm">Tax (GST)</Text>
                    <Text size="sm">₹{tax}</Text>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <Text weight="bold" size="lg">Total</Text>
                      <div className="text-right">
                        <Text weight="bold" size="lg">
                          ₹{total.toLocaleString('en-IN')}
                        </Text>
                        {discount > 0 && (
                          <Text size="xs" className="text-green-600">
                            You save ₹{discount.toLocaleString('en-IN')}
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Value Summary Card */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <Text size="sm" weight="bold" className="text-green-800">Value You're Getting</Text>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Text color="muted">Template & Tool Value</Text>
                      <Text className="text-green-700 font-medium">
                        ₹{(total * 3).toLocaleString('en-IN')}+
                      </Text>
                    </div>
                    <div className="flex justify-between text-sm">
                      <Text color="muted">Your Investment</Text>
                      <Text className="text-gray-700">
                        ₹{total.toLocaleString('en-IN')}
                      </Text>
                    </div>
                    <div className="border-t border-green-200 pt-2">
                      <div className="flex justify-between">
                        <Text size="sm" weight="medium" className="text-green-800">ROI</Text>
                        <Badge className="bg-green-600 text-white">
                          {Math.round((total * 3) / total)}x Return
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Text size="xs" className="text-green-600 mt-2">
                    Compare: Equivalent consulting would cost ₹{(total * 10).toLocaleString('en-IN')}+
                  </Text>
                </div>

                {/* Purchase Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className={`w-full ${isEmailVerified ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                  onClick={handlePurchase}
                  isLoading={loading}
                  disabled={loading || !isEmailVerified}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : !isEmailVerified ? (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Verify Email to Continue
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Pay ₹{total.toLocaleString('en-IN')}
                    </>
                  )}
                </Button>

                {/* Email Verification Required Notice */}
                {!isEmailVerified && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <Text size="xs" className="text-yellow-700">
                        Please verify your email address before making a purchase. Check your inbox for the verification link.
                      </Text>
                    </div>
                  </div>
                )}

                {/* Guarantee */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <Text size="sm" weight="bold" className="text-yellow-900">
                        3-Day Money Back Guarantee
                      </Text>
                      <Text size="xs" className="text-yellow-700 mt-1">
                        If you're not completely satisfied within 3 days, we'll refund your purchase.
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Help */}
                <div className="text-center pt-2">
                  <Text size="xs" color="muted">
                    Need help? Contact{' '}
                    <a href="mailto:support@theindianstartup.in" className="text-blue-600 hover:underline">
                      support@theindianstartup.in
                    </a>
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </DashboardLayout>
      }>
        <CheckoutContent />
      </Suspense>
    </ProtectedRoute>
  );
}