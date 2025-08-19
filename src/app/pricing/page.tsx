'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useUserProducts } from '@/hooks/useUserProducts';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  CheckCircle, 
  Clock, 
  Bell,
  Target,
  Shield,
  Zap,
  Loader2,
  ArrowRight,
  Star,
  TrendingUp,
  Briefcase,
  Scale,
  DollarSign,
  MapPin,
  Database,
  Users
} from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface WaitlistFormData {
  email: string;
  name: string;
}

export default function PricingPage() {
  const { user } = useAuthContext();
  const { hasProduct, hasAllAccess } = useUserProducts();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistData, setWaitlistData] = useState<Record<string, WaitlistFormData>>({});
  const [waitlistSubmitting, setWaitlistSubmitting] = useState<Record<string, boolean>>({});
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<number | null>(null);
  const [couponError, setCouponError] = useState('');
  const [pendingPurchase, setPendingPurchase] = useState<any>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    if (typeof window !== 'undefined') {
      if (!window.Razorpay) {
        loadRazorpay();
      } else {
        setRazorpayLoaded(true);
      }
    }
  }, []);

  const handlePurchase = useCallback(async (productCode: string, price: number) => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!razorpayLoaded || (typeof window !== 'undefined' && !window.Razorpay)) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    setIsLoading(true);

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/purchase/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: productCode,
          amount: price * 100, // Convert to paise
          couponCode: couponDiscount ? couponCode : undefined
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'The Indian Startup',
        description: order.productName,
        handler: async (response: any) => {
          // Verify payment
          const verifyResponse = await fetch('/api/purchase/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (verifyResponse.ok) {
            const result = await verifyResponse.json();
            
            // If a coupon was generated, show it in an alert first
            if (result.coupon) {
              alert(`🎉 Congratulations! You've earned a ${result.coupon.discount}% off coupon for your next course!\n\nCoupon Code: ${result.coupon.code}\n\nThis coupon is valid until ${new Date(result.coupon.validUntil).toLocaleDateString()}`);
            }
            
            router.push(result.redirectUrl || '/dashboard');
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          email: user.email || '',
        },
        theme: {
          color: '#000000',
        },
      };

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Failed to initiate purchase');
    } finally {
      setIsLoading(false);
    }
  }, [user, router, razorpayLoaded]);

  // Handle cart from onboarding or dashboard
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const fromOnboarding = urlParams.get('fromOnboarding');
    const fromCart = urlParams.get('fromCart');
    
    if (fromOnboarding && user) {
      const savedCart = localStorage.getItem('preSignupCart');
      const earlyBird = localStorage.getItem('earlyBirdPurchase');
      
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        
        // If cart has single item, process it directly
        if (cart.length === 1) {
          const item = cart[0];
          const hasEarlyBird = earlyBird === 'true';
          setPendingPurchase({
            productCode: item.product.code,
            price: item.product.price,
            hasEarlyBird: hasEarlyBird
          });
          
          // Clear cart
          localStorage.removeItem('preSignupCart');
          localStorage.removeItem('earlyBirdPurchase');
          
          // Apply early bird discount if applicable
          const discountedPrice = hasEarlyBird ? Math.floor(item.product.price * 0.95) : item.product.price;
          
          // Auto-trigger purchase
          setTimeout(() => {
            handlePurchase(item.product.code, discountedPrice);
          }, 500);
        } else {
          // Multiple items - redirect to multi-product checkout section
          console.log('Multiple items in cart from onboarding:', cart);
          // Clear the pre-signup cart
          localStorage.removeItem('preSignupCart');
          localStorage.removeItem('earlyBirdPurchase');
          // We'll show the multi-product section at the bottom of the page
        }
      }
    }
    
    if (fromCart && user) {
      try {
        const stored = localStorage.getItem('dashboardCart');
        if (stored) {
          const cartData = JSON.parse(stored);
          const now = Date.now();
          
          // Check if cart has expired
          if (cartData.expiresAt && now > cartData.expiresAt) {
            localStorage.removeItem('dashboardCart');
            alert('Your cart has expired. Please add items again.');
            router.push('/dashboard');
            return;
          }
          
          const cart = cartData.items || cartData; // Handle both old and new format
          
          // If cart has single item, process it directly
          if (cart.length === 1) {
            const item = cart[0];
            setPendingPurchase({
              productCode: item.productCode,
              price: item.price,
              hasEarlyBird: false
            });
            
            // Auto-trigger purchase
            setTimeout(() => {
              handlePurchase(item.productCode, item.price);
            }, 500);
          } else {
            // Multiple items - show cart summary and checkout options
            console.log('Multiple items in dashboard cart:', cart);
            // Don't clear cart yet - let user see the options
          }
          
          // Clear dashboard cart after processing single items
          if (cart.length === 1) {
            localStorage.removeItem('dashboardCart');
          }
        }
      } catch (error) {
        console.error('Error processing dashboard cart:', error);
        localStorage.removeItem('dashboardCart');
        alert('Error loading cart. Please try adding items again.');
        router.push('/dashboard');
      }
    }
  }, [user, handlePurchase]);

  const handleWaitlistSubmit = async (productCode: string) => {
    const data = waitlistData[productCode];
    if (!data?.email) return;

    setWaitlistSubmitting(prev => ({ ...prev, [productCode]: true }));

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          productCode
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(result.message);
        setWaitlistData(prev => ({ ...prev, [productCode]: { email: '', name: '' } }));
      } else {
        alert(result.error || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Waitlist error:', error);
      alert('Failed to join waitlist');
    } finally {
      setWaitlistSubmitting(prev => ({ ...prev, [productCode]: false }));
    }
  };

  const updateWaitlistData = (productCode: string, field: keyof WaitlistFormData, value: string) => {
    setWaitlistData(prev => ({
      ...prev,
      [productCode]: {
        ...prev[productCode],
        [field]: value
      }
    }));
  };

  const availableProduct = {
    code: 'P1',
    title: '30-Day India Launch Sprint',
    description: 'Learn to build a startup from idea to launch with daily lessons, action plans and India-specific guidance.',
    price: 4999,
    originalPrice: 9999,
    features: [
      '30 comprehensive daily lessons (2,000+ pages)',
      'Interactive checklists and frameworks',
      'Step-by-step incorporation learning guide',
      'DPIIT registration process walkthrough',
      'GST & compliance knowledge basics',
      'Advanced business strategy frameworks',
      'Pitch deck templates and examples',
      'Community access for discussions',
      'XP gamification system',
      'Email support for course content'
    ],
    outcomes: [
      'Complete knowledge of startup incorporation process',
      'Clear go-to-market strategy framework',
      'MVP development and validation methods',
      'Customer validation techniques',
      'Understanding of DPIIT startup benefits'
    ],
    estimatedTime: '30 days (1-2 hours/day)',
    icon: Target
  };

  const comingSoonProducts = [
    {
      code: 'P2',
      title: 'Incorporation & Compliance Mastery',
      description: 'Learn Indian business incorporation and compliance requirements with 150+ educational templates.',
      price: 4999,
      icon: Shield,
      estimatedTime: '40 days'
    },
    {
      code: 'P3',
      title: 'Funding Strategy - Complete Learning',
      description: 'Master funding strategies from grants to VC with comprehensive guides and 200+ templates.',
      price: 5999,
      icon: TrendingUp,
      estimatedTime: '45 days'
    },
    {
      code: 'P4',
      title: 'Finance Management - CFO-Level Learning',
      description: 'Learn to build financial systems and processes with expert guidance and 250+ templates.',
      price: 6999,
      icon: DollarSign,
      estimatedTime: '45 days'
    },
    {
      code: 'P5',
      title: 'Legal Knowledge - Complete Framework',
      description: 'Master legal aspects of running a startup with comprehensive guides and 300+ templates.',
      price: 7999,
      icon: Scale,
      estimatedTime: '45 days'
    },
    {
      code: 'P6',
      title: 'Sales & GTM Master Course',
      description: 'Learn revenue generation strategies and sales techniques specific to Indian markets.',
      price: 6999,
      icon: Target,
      estimatedTime: '60 days'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" variant="h2" className="mb-4">
              Choose Your Startup Mastery Path
            </Heading>
            <Text size="lg" color="muted" className="mb-8">
              Master startup fundamentals with our comprehensive educational courses designed for Indian entrepreneurs.
            </Text>
            
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>50% Launch Discount - Limited Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Course */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-700 mb-4">
              ✅ Available Now - Complete Course
            </Badge>
            <Heading as="h2" variant="h3" className="mb-2">
              Ready to Launch Your Startup?
            </Heading>
            <Text color="muted">
              Start with our comprehensive foundation course
            </Text>
          </div>

          <Card className="relative overflow-hidden">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <availableProduct.icon className="w-6 h-6 text-accent" />
                    <Heading as="h3" variant="h4">
                      {availableProduct.title}
                    </Heading>
                  </div>
                  <Text color="muted" className="mb-4">
                    {availableProduct.description}
                  </Text>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{availableProduct.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>1,000+ Students</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {hasProduct(availableProduct.code) ? (
                    <div>
                      <Badge className={hasAllAccess() ? "bg-purple-100 text-purple-700 mb-2" : "bg-green-100 text-green-700 mb-2"}>
                        {hasAllAccess() ? "✨ Included with All Access" : "✅ Purchased"}
                      </Badge>
                      <Text size="sm" color="muted">
                        You have full access
                      </Text>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <Text className="text-2xl text-gray-400 line-through">
                          ₹{availableProduct.originalPrice?.toLocaleString('en-IN')}
                        </Text>
                        <Text className="text-3xl font-bold">
                          ₹{availableProduct.price.toLocaleString('en-IN')}
                        </Text>
                      </div>
                      <Text size="sm" color="muted">
                        One-time payment
                      </Text>
                    </>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Text weight="medium" className="mb-3">What&apos;s Included:</Text>
                  <ul className="space-y-2">
                    {availableProduct.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <Text size="sm">{feature}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <Text weight="medium" className="mb-3">What You&apos;ll Achieve:</Text>
                  <ul className="space-y-2">
                    {availableProduct.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <Text size="sm">{outcome}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Coupon Code Input */}
              {!hasProduct(availableProduct.code) && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <Text weight="medium" className="mb-2">Have a coupon code?</Text>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError('');
                        setCouponDiscount(null);
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={async () => {
                        if (!couponCode) return;
                        
                        try {
                          const response = await fetch('/api/coupon/validate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              couponCode,
                              productCode: availableProduct.code,
                              originalAmount: availableProduct.price * 100
                            })
                          });
                          
                          const result = await response.json();
                          
                          if (result.valid) {
                            setCouponDiscount(result.discountPercent);
                            setCouponError('');
                          } else {
                            setCouponError(result.error || 'Invalid coupon');
                            setCouponDiscount(null);
                          }
                        } catch (error) {
                          setCouponError('Failed to validate coupon');
                          setCouponDiscount(null);
                        }
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <Text size="sm" className="text-red-600 mt-2">{couponError}</Text>
                  )}
                  {couponDiscount && (
                    <div className="mt-3 p-3 bg-green-50 rounded">
                      <Text size="sm" className="text-green-700">
                        ✅ {couponDiscount}% discount applied!
                      </Text>
                      <div className="flex items-center gap-2 mt-2">
                        <Text size="sm" className="text-gray-500 line-through">
                          ₹{availableProduct.price.toLocaleString('en-IN')}
                        </Text>
                        <Text className="font-bold text-green-700">
                          ₹{Math.floor(availableProduct.price * (1 - couponDiscount / 100)).toLocaleString('en-IN')}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Terms and Disclaimer */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Text size="xs" color="muted" className="text-center">
                  By purchasing, you agree to our <Link href="/terms" className="underline hover:text-black">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-black">Privacy Policy</Link>.
                  <br />
                  This is an educational platform providing guides and resources only. We do not provide professional services.
                </Text>
              </div>

              <div className="flex gap-4">
                {hasProduct(availableProduct.code) ? (
                  <Link href="/journey" className="flex-1">
                    <Button variant="primary" className="w-full">
                      Access Course
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => handlePurchase(availableProduct.code, availableProduct.price)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Start Your Journey - ₹{
                          couponDiscount 
                            ? Math.floor(availableProduct.price * (1 - couponDiscount / 100)).toLocaleString('en-IN')
                            : availableProduct.price.toLocaleString('en-IN')
                        }
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
                
                <Link href="/journey">
                  <Button variant="outline">
                    Preview Course
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Coming Soon Courses */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 mb-4">
              🚀 Coming Soon
            </Badge>
            <Heading as="h2" variant="h3" className="mb-2">
              Advanced Startup Mastery Courses
            </Heading>
            <Text color="muted">
              Join the waitlist to be notified when these courses launch
            </Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {comingSoonProducts.map((product) => (
              <Card key={product.code} className="relative">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <product.icon className="w-5 h-5 text-gray-400" />
                    <Heading as="h4" variant="h5" className="text-gray-600">
                      {product.title}
                    </Heading>
                  </div>
                  
                  <Text size="sm" color="muted" className="mb-4">
                    {product.description}
                  </Text>
                  
                  <div className="flex items-center justify-between mb-4">
                    {hasProduct(product.code) ? (
                      <Badge className={hasAllAccess() ? "bg-purple-100 text-purple-700 text-xs" : "bg-green-100 text-green-700 text-xs"}>
                        {hasAllAccess() ? "Included" : "Purchased"}
                      </Badge>
                    ) : (
                      <Text weight="medium" className="text-gray-400">
                        ₹{product.price.toLocaleString('en-IN')}
                      </Text>
                    )}
                    <Text size="sm" color="muted">
                      {product.estimatedTime}
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={waitlistData[product.code]?.email || ''}
                      onChange={(e) => updateWaitlistData(product.code, 'email', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      value={waitlistData[product.code]?.name || ''}
                      onChange={(e) => updateWaitlistData(product.code, 'name', e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleWaitlistSubmit(product.code)}
                      disabled={!waitlistData[product.code]?.email || waitlistSubmitting[product.code]}
                    >
                      {waitlistSubmitting[product.code] ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4 mr-2" />
                          Join Waitlist
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-100 text-yellow-700">
                    Coming Soon
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Heading as="h2" variant="h3" className="text-center mb-12">
              Frequently Asked Questions
            </Heading>
            
            <div className="space-y-8">
              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  Why start with just one course?
                </Heading>
                <Text color="muted">
                  We believe in delivering exceptional quality. Our 30-Day Launch Sprint contains 2,000+ pages of comprehensive content. We&apos;re developing additional courses with the same depth and quality standards.
                </Text>
              </div>
              
              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  When will the other courses be available?
                </Heading>
                <Text color="muted">
                  We&apos;re working on releasing 2-3 new courses every quarter. Join the waitlist to be the first to know when they launch, often with early-bird discounts.
                </Text>
              </div>
              
              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  What makes this different from other startup courses?
                </Heading>
                <Text color="muted">
                  India-specific guidance, daily action plans, comprehensive templates, and a supportive community. Plus, our content is based on real startup experiences and regulatory requirements in India.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Product Cart Checkout Section */}
      {(() => {
        if (typeof window === 'undefined') return null;
        
        const urlParams = new URLSearchParams(window.location.search);
        const fromCart = urlParams.get('fromCart');
        const dashboardCart = fromCart ? JSON.parse(localStorage.getItem('dashboardCart') || '[]') : [];
        
        if (dashboardCart.length > 1) {
          const total = dashboardCart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
          const allAccessPrice = 54999;
          const savings = total - allAccessPrice;
          
          return (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-t border-gray-200">
              <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <Heading as="h2" variant="h3" className="mb-2">
                      Your Cart ({dashboardCart.length} items)
                    </Heading>
                    <Text color="muted">
                      We noticed you're buying multiple courses. Here are your options:
                    </Text>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Individual Purchase */}
                    <Card className="border-2 border-gray-200">
                      <CardContent className="p-6">
                        <Heading as="h3" variant="h5" className="mb-4">
                          Buy Individual Courses
                        </Heading>
                        
                        <div className="space-y-3 mb-6">
                          {dashboardCart.map((item: any) => (
                            <div key={item.productCode} className="flex justify-between">
                              <Text size="sm">{item.quantity}x {item.title}</Text>
                              <Text size="sm" weight="medium">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </Text>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-3 mb-6">
                          <div className="flex justify-between font-bold">
                            <Text>Total</Text>
                            <Text>₹{total.toLocaleString('en-IN')}</Text>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            // TODO: Implement individual checkout for multiple items
                            alert('Multi-product individual checkout coming soon! For now, consider the All-Access bundle.');
                          }}
                        >
                          Buy These Courses
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* All Access Bundle */}
                    <Card className="border-2 border-purple-500 bg-purple-50">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-purple-600 text-white">RECOMMENDED</Badge>
                          <Heading as="h3" variant="h5">
                            All-Access Bundle
                          </Heading>
                        </div>
                        
                        <div className="mb-6">
                          <Text className="mb-2">Get all 11 courses instead of just {dashboardCart.length}</Text>
                          <div className="flex items-center gap-2 mb-2">
                            <Text className="text-gray-500 line-through">₹{total.toLocaleString('en-IN')}</Text>
                            <Text className="text-2xl font-bold text-purple-600">₹54,999</Text>
                          </div>
                          {savings > 0 && (
                            <Text className="text-green-600 font-medium">
                              Save ₹{savings.toLocaleString('en-IN')} + get {11 - dashboardCart.length} more courses!
                            </Text>
                          )}
                        </div>
                        
                        <Button
                          variant="primary"
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => handlePurchase('ALL_ACCESS', 54999)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Get All-Access Bundle
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        localStorage.removeItem('dashboardCart');
                        router.push('/dashboard');
                      }}
                    >
                      ← Back to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })()}
    </div>
  );
}