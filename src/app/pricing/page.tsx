'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
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
  Users,
  Sparkles,
  Award,
  Rocket,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { BUNDLES } from '@/lib/bundles';
import { PRODUCTS } from '@/lib/products-catalog';

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
      logger.error('Purchase error:', error);
      alert('Failed to initiate purchase');
    } finally {
      setIsLoading(false);
    }
  }, [user, router, razorpayLoaded, couponCode, couponDiscount]);

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
          logger.info('Multiple items in cart from onboarding:', cart);
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
            logger.info('Multiple items in dashboard cart:', cart);
            // Don't clear cart yet - let user see the options
          }
          
          // Clear dashboard cart after processing single items
          if (cart.length === 1) {
            localStorage.removeItem('dashboardCart');
          }
        }
      } catch (error) {
        logger.error('Error processing dashboard cart:', error);
        localStorage.removeItem('dashboardCart');
        alert('Error loading cart. Please try adding items again.');
        router.push('/dashboard');
      }
    }
  }, [user, handlePurchase, router]);

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
      logger.error('Waitlist error:', error);
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

  const allProducts = [
    {
      code: 'P1',
      title: '30-Day India Launch Sprint',
      description: 'Go from idea to incorporated startup with daily action plans',
      price: 4999,
      originalPrice: 9999,
      duration: '30 days',
      modules: 4,
      isAvailable: true,
      category: 'Foundation',
      icon: Target,
      features: [
        '30 comprehensive daily lessons',
        'Interactive checklists and frameworks',
        'Step-by-step incorporation guide',
        'DPIIT registration walkthrough',
        'GST & compliance basics',
        'Business strategy frameworks',
        'Pitch deck templates',
        'Community access',
        'XP gamification system',
        'Email support included'
      ],
      outcomes: [
        'Complete startup incorporation knowledge',
        'Clear go-to-market strategy',
        'MVP development methods',
        'Customer validation techniques',
        'DPIIT startup benefits understanding'
      ]
    },
    {
      code: 'P2',
      title: 'Incorporation & Compliance Kit',
      description: 'Master Indian business incorporation and ongoing compliance',
      price: 4999,
      duration: '40 days',
      modules: 10,
      isAvailable: true,
      category: 'Legal',
      icon: Shield,
      features: [
        '150+ legal templates and documents',
        'Complete incorporation step-by-step guide',
        'GST, PAN, TAN registration processes',
        'MCA compliance calendar and tracking',
        'Employment law and contracts',
        'Annual filing and maintenance guide',
        'Expert consultation access',
        'Legal document automation tools'
      ],
      outcomes: [
        'Fully incorporated business entity',
        'Complete legal compliance system',
        'All required registrations complete',
        'Ongoing compliance calendar',
        'Employment contracts ready',
        'Tax optimization strategies'
      ]
    },
    {
      code: 'P3',
      title: 'Funding in India - Complete Mastery',
      description: 'Master the Indian funding ecosystem from grants to VC',
      price: 5999,
      duration: '45 days',
      modules: 12,
      isAvailable: true,
      category: 'Growth',
      icon: TrendingUp,
      features: [
        'Government grants (₹20L-₹5Cr)',
        'Angel investment strategies',
        'VC funding roadmap (Series A-D)',
        'Debt funding mastery',
        'Term sheet negotiation guide',
        '200+ funding templates',
        'Investor database access',
        'Financial modeling tools'
      ],
      outcomes: [
        'Active funding pipeline',
        'Investor meetings scheduled',
        '18-month funding roadmap',
        'Professional financial models',
        'Grant applications submitted',
        'Investment-ready documentation'
      ]
    },
    {
      code: 'P4',
      title: 'Finance Stack - CFO-Level Mastery',
      description: 'Build world-class financial infrastructure',
      price: 6999,
      duration: '45 days',
      modules: 12,
      isAvailable: true,
      category: 'Finance',
      icon: DollarSign,
      features: [
        'Complete accounting system setup',
        'GST compliance mastery',
        'MCA and tax compliance',
        'Financial planning & analysis',
        'Investor-ready reporting',
        'Banking & treasury management',
        'Comprehensive templates and tools',
        'CFO strategic toolkit'
      ],
      outcomes: [
        'World-class financial infrastructure',
        'Complete compliance system',
        'Real-time financial dashboards',
        'Investor-grade reporting',
        'Tax optimization strategies',
        'CFO-level financial control'
      ]
    },
    {
      code: 'P5',
      title: 'Legal Stack - Bulletproof Framework',
      description: 'Build bulletproof legal infrastructure',
      price: 7999,
      duration: '45 days',
      modules: 12,
      isAvailable: true,
      category: 'Legal',
      icon: Scale,
      features: [
        'Complete contract mastery system',
        'IP strategy & protection',
        'Employment law compliance',
        'Dispute prevention mechanisms',
        'Data protection systems',
        'Regulatory compliance',
        'M&A readiness documentation',
        '300+ legal templates'
      ],
      outcomes: [
        'Bulletproof legal infrastructure',
        'Litigation-proof contracts',
        'Complete IP protection',
        'Employment law compliance',
        'Regulatory compliance system',
        'M&A ready documentation'
      ]
    },
    {
      code: 'P6',
      title: 'Sales & GTM Master Course',
      description: 'Transform into a revenue-generating machine',
      price: 6999,
      duration: '60 days',
      modules: 10,
      isAvailable: true,
      category: 'Growth',
      icon: Briefcase,
      features: [
        'India-specific sales strategies',
        'B2B and B2C sales systems',
        'Customer acquisition frameworks',
        'Sales team building guide',
        'CRM and sales tech stack',
        'Performance tracking systems',
        '75+ sales templates',
        'Revenue optimization tools'
      ],
      outcomes: [
        'Revenue-generating sales machine',
        'Systematic customer acquisition',
        'Scalable sales organization',
        'Predictable revenue growth',
        'High-performance sales team',
        'Optimized conversion funnels'
      ]
    },
    {
      code: 'P7',
      title: 'State-wise Scheme Map',
      description: 'Master India\'s state ecosystem benefits',
      price: 4999,
      duration: '30 days',
      modules: 10,
      isAvailable: true,
      category: 'Government',
      icon: MapPin,
      features: [
        'All 28 states + 8 UTs coverage',
        '500+ state schemes database',
        'State benefit calculators',
        'Multi-state analysis framework',
        'Sector-specific mapping',
        'Government contact directory',
        'Application tracking systems',
        'ROI maximization tools'
      ],
      outcomes: [
        'Optimized multi-state presence',
        '30-50% cost savings',
        'Government relationships established',
        'Maximum subsidy utilization',
        'Strategic location advantages',
        'Policy monitoring system'
      ]
    },
    {
      code: 'P8',
      title: 'Investor-Ready Data Room',
      description: 'Professional data room for funding success',
      price: 9999,
      duration: '45 days',
      modules: 8,
      isAvailable: true,
      category: 'Growth',
      icon: Database,
      features: [
        'Professional data room setup',
        '50+ investor-grade templates',
        'Due diligence preparation',
        'Legal document organization',
        'Financial data presentation',
        'Business metrics tracking',
        'Investor communication tools',
        'Unicorn-scale documentation'
      ],
      outcomes: [
        'Professional investor data room',
        'Accelerated funding process',
        'Higher valuation potential',
        'Due diligence ready',
        'Investor confidence boost',
        'Professional documentation'
      ]
    },
    {
      code: 'P9',
      title: 'Government Schemes & Funding',
      description: 'Access ₹50L to ₹5Cr in government funding',
      price: 4999,
      duration: '21 days',
      modules: 4,
      isAvailable: true,
      category: 'Government',
      icon: Users,
      features: [
        'Complete schemes database',
        'Eligibility assessment tools',
        'Application templates library',
        'Success rate optimization',
        'Timeline management system',
        'Documentation checklists',
        'Follow-up automation',
        'Funding pipeline tracker'
      ],
      outcomes: [
        'Government funding pipeline',
        'Multiple applications submitted',
        'Optimized success rates',
        'Systematic application process',
        'Maximum funding utilization',
        'Compliance maintenance'
      ]
    },
    {
      code: 'P10',
      title: 'Patent Mastery for Startups',
      description: 'Master IP from filing to monetization',
      price: 7999,
      duration: '60 days',
      modules: 12,
      isAvailable: true,
      category: 'Legal',
      icon: Shield,
      features: [
        'Complete patent strategy',
        'Filing process mastery',
        'IP portfolio management',
        'Patent monetization strategies',
        'International filing guide',
        'Patent search techniques',
        '100+ patent templates',
        'IP valuation methods'
      ],
      outcomes: [
        'Complete patent strategy',
        'Filed patent applications',
        'IP portfolio management',
        'Monetization capabilities',
        'Protected innovations',
        'Competitive advantages'
      ]
    },
    {
      code: 'P11',
      title: 'Branding & PR Mastery',
      description: 'Transform into recognized industry leader',
      price: 7999,
      duration: '54 days',
      modules: 12,
      isAvailable: true,
      category: 'Marketing',
      icon: Star,
      features: [
        'Complete brand identity system',
        'Media training and crisis management',
        'Award winning strategies',
        'Personal branding for founders',
        'Agency relationship management',
        'Regional PR strategies',
        'Entertainment partnerships',
        '300+ branding templates'
      ],
      outcomes: [
        'Powerful brand identity',
        'Active media presence',
        'Award wins and recognition',
        'Strong founder brand',
        'Systematic PR engine',
        'Continuous positive coverage'
      ]
    },
    {
      code: 'P12',
      title: 'Marketing Mastery - Complete Growth Engine',
      description: 'Build data-driven marketing machine generating predictable growth with expert guidance from Flipkart, Zomato, and Nykaa leadership teams',
      price: 9999,
      duration: '60 days',
      modules: 12,
      isAvailable: true,
      category: 'Marketing',
      icon: TrendingUp,
      features: [
        '500+ Marketing Templates (Worth ₹5,00,000+)',
        '50+ Hours Expert Masterclasses',
        'Triple Industry Certification',
        'Advanced Analytics & Tools Suite',
        '60-Day Implementation Framework',
        'ROI: 1,500x Return on Investment',
        'Expert Faculty: Flipkart, Zomato, Nykaa CEOs',
        'Complete MarTech Stack Setup'
      ],
      outcomes: [
        'Data-driven marketing engine with multi-channel campaigns',
        'Measurable ROI and predictable customer acquisition system',
        'Marketing leadership capabilities and strategic thinking',
        'Advanced analytics and performance optimization skills',
        'Industry-recognized certifications and career acceleration',
        'Complete marketing technology stack mastery'
      ]
    },
    {
      code: 'P13',
      title: 'Food Processing Mastery',
      description: 'Complete guide to food processing business - FSSAI compliance, manufacturing setup, quality certifications, cold chain, government subsidies',
      price: 7999,
      duration: '50 days',
      modules: 10,
      isAvailable: true,
      category: 'Sector',
      icon: Target,
      features: [
        'Complete FSSAI licensing system',
        'Manufacturing setup and licensing',
        'ISO 22000 and HACCP certifications',
        'Cold chain infrastructure planning',
        'PMFME, PMKSY, PLI subsidies access',
        'APEDA registration and exports',
        'Packaging and labeling compliance',
        'Distribution channel strategies'
      ],
      outcomes: [
        'Complete FSSAI compliance system',
        'Manufacturing facility ready',
        'Quality certifications achieved',
        'Government subsidies accessed',
        'Export documentation complete',
        'Profitable food processing business'
      ]
    },
    {
      code: 'P14',
      title: 'Impact & CSR Mastery',
      description: 'Master India\'s ₹25,000 Cr CSR ecosystem with Schedule VII compliance, social enterprise registration, and corporate partnerships',
      price: 8999,
      duration: '55 days',
      modules: 11,
      isAvailable: true,
      category: 'Sector',
      icon: Users,
      features: [
        'Schedule VII compliance mastery',
        'Section 8/Trust/Society registration',
        'IRIS+ impact measurement framework',
        'CSR proposal and pitch templates',
        'Corporate partnership development',
        'SROI calculation methodology',
        'ESG integration and BRSR support',
        'Impact investing navigation'
      ],
      outcomes: [
        'Compliant CSR engagement capability',
        'Registered social enterprise',
        'Impact measurement system',
        'Active corporate partnerships',
        'ESG reporting capability',
        'Sustainable funding pipeline'
      ]
    },
    {
      code: 'P15',
      title: 'Carbon Credits & Sustainability',
      description: 'Build a carbon business with GHG Protocol accounting, Verra/Gold Standard certifications, trading, and Net Zero strategies',
      price: 9999,
      duration: '60 days',
      modules: 12,
      isAvailable: true,
      category: 'Sector',
      icon: TrendingUp,
      features: [
        'GHG Protocol carbon accounting',
        'Verra VCS project development',
        'Gold Standard certification',
        'Carbon credit trading mastery',
        'Green finance and climate funds',
        'Net Zero strategy with SBTi',
        'SEBI BRSR compliance',
        'Carbon business building'
      ],
      outcomes: [
        'Professional carbon accounting capability',
        'Carbon credit project development',
        'Trading and ERPA structuring skills',
        'Green finance access',
        'Net Zero strategy expertise',
        'Sustainable consulting business'
      ]
    }
  ];

  const bundles = Object.values(BUNDLES).filter(bundle =>
    ['FOUNDATION', 'GROWTH_ENGINE', 'COMPLIANCE_MASTER', 'FUNDING_READY', 'MARKET_DOMINATION', 'SECTOR', 'ALL_ACCESS'].includes(
      bundle.id.replace('bundle_', '').toUpperCase()
    )
  ).map(bundle => ({
    ...bundle,
    code: bundle.id.toUpperCase().replace('BUNDLE_', ''),
    title: bundle.name,
    features: bundle.outcomes
  }));

  const availableProduct = allProducts[0]; // P1 for backward compatibility

  // Demo system - Day 1 & 2 content for each course
  const handleDemo = async (productCode: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Redirect to demo page for this product
    router.push(`/demo/${productCode}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
              <Clock className="w-4 h-4" />
              <span>⚡ Limited Time: 50% Launch Discount Ends Soon</span>
            </div>
            <Heading as="h1" variant="h2" className="mb-4">
              Launch Your Startup in 30 Days
            </Heading>
            <Text size="xl" color="muted" className="mb-8 max-w-2xl mx-auto">
              Join 2,847 founders who've used our step-by-step system to go from idea to incorporated startup. 
              <strong className="text-gray-900"> Choose what you need most, or get everything.</strong>
            </Text>
            
            {/* Trust Signals */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border border-white"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border border-white"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border border-white"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border border-white"></div>
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border border-white"></div>
                </div>
                <span className="font-medium">4.8/5 stars (847 reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span>₹50Cr+ raised by alumni</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                <Shield className="w-4 h-4" />
                <span>3-day money back guarantee</span>
              </div>
            </div>

            {/* Urgency Timer */}
            <div className="bg-black text-white p-4 rounded-lg inline-block">
              <Text size="sm" className="text-gray-300 mb-1">Limited time discount ends in:</Text>
              <div className="flex items-center gap-2 font-mono text-lg">
                <span className="bg-white/20 px-2 py-1 rounded">2</span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-1 rounded">14</span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-1 rounded">36</span>
                <span className="text-sm ml-2">days:hours:mins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <Text weight="medium">2,847 founders enrolled</Text>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <Text weight="medium">4.8/5 average rating</Text>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-600" />
              <Text weight="medium">₹50Cr+ funding raised by alumni</Text>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <Text weight="medium">89% completion rate</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Bundles Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700 px-4 py-2 rounded-full mb-4 animate-pulse">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">Limited Time: 30% OFF All-Access Bundle</span>
            <span className="text-sm">• Ends in 48 hours</span>
          </div>
          <Heading as="h2" variant="h3" className="mb-2">
            Choose Your Startup Journey
          </Heading>
          <Text color="muted" className="mb-4">
            Save up to ₹25,986 with our expertly curated course bundles
          </Text>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">2,847 founders enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700">4.9/5 average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">100% money-back guarantee</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {bundles.map((bundle) => {
            const Icon = bundle.icon === '🚀' ? Rocket : 
                       bundle.icon === '📈' ? TrendingUp : 
                       bundle.icon === '🛡️' ? Shield :
                       bundle.icon === '💰' ? DollarSign :
                       bundle.icon === '👑' ? Award :
                       bundle.icon === '🏆' ? Star : Sparkles;
            
            return (
              <Card key={bundle.code} className={`relative overflow-hidden hover:shadow-xl transition-all ${bundle.mostPopular ? 'ring-2 ring-accent border-accent shadow-lg scale-105' : ''} ${bundle.recommended ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : ''}`}>
                {bundle.mostPopular && (
                  <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                {bundle.recommended && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-bl-lg">
                    BEST VALUE
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${bundle.recommended ? 'bg-white/20' : 'bg-gray-100'}`}>
                      <Icon className={`w-6 h-6 ${bundle.recommended ? 'text-white' : 'text-gray-700'}`} />
                    </div>
                    <Heading as="h3" variant="h5" className={`mb-1 ${bundle.recommended ? 'text-white' : ''}`}>
                      {bundle.title}
                    </Heading>
                    <Text size="xs" className={`font-medium mb-3 ${bundle.recommended ? 'text-yellow-300' : 'text-accent'}`}>
                      {bundle.tagline}
                    </Text>
                    <Text size="sm" className={`mb-4 ${bundle.recommended ? 'text-gray-300' : 'text-gray-600'}`}>
                      {bundle.description}
                    </Text>
                    
                    <div className="mb-4">
                      <Text className={`text-xl line-through ${bundle.recommended ? 'text-gray-400' : 'text-gray-400'}`}>
                        ₹{bundle.originalPrice.toLocaleString('en-IN')}
                      </Text>
                      <Text className={`text-3xl font-bold mb-1 ${bundle.recommended ? 'text-white' : ''}`}>
                        ₹{bundle.price.toLocaleString('en-IN')}
                      </Text>
                      <Badge className={`${bundle.recommended ? 'bg-yellow-500 text-black' : 'bg-green-100 text-green-700'}`}>
                        Save ₹{bundle.savings.toLocaleString('en-IN')} ({bundle.savingsPercent}% OFF)
                      </Badge>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {bundle.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${bundle.recommended ? 'text-yellow-300' : 'text-green-600'}`} />
                        <Text size="sm" className={bundle.recommended ? 'text-gray-200' : ''}>{feature}</Text>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${bundle.recommended ? 'bg-yellow-500 hover:bg-yellow-400 text-black' : bundle.mostPopular ? '' : ''}`}
                    variant={bundle.mostPopular || bundle.recommended ? "primary" : "outline"}
                    onClick={() => handlePurchase(bundle.code, bundle.price)}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Get {bundle.title.replace(' Bundle', '')}
                  </Button>
                  
                  <div className="mt-3 flex flex-col items-center text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <Text size="xs">3-day money back guarantee</Text>
                    </div>
                    <Text size="xs" className={`mt-1 ${bundle.recommended ? 'text-gray-400' : 'text-gray-500'}`}>
                      {bundle.products.length} courses included
                    </Text>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Bundle Comparison CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="gap-2">
            Compare All 8 Bundles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Individual Courses Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 mb-4">
            📚 Individual Courses - Pick What You Need
          </Badge>
          <Heading as="h2" variant="h3" className="mb-2">
            All 12 Premium Courses Available
          </Heading>
          <Text color="muted">
            Master specific aspects of building your startup with expert-designed courses
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allProducts.map((product) => (
            <Card key={product.code} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <product.icon className="w-5 h-5 text-accent" />
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <Text size="sm" color="muted">{product.duration}</Text>
                </div>

                <Heading as="h3" variant="h6" className="mb-2">
                  {product.title}
                </Heading>
                <Text size="sm" color="muted" className="mb-4 line-clamp-2">
                  {product.description}
                </Text>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Text className="text-xl font-bold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </Text>
                    <Text size="xs" color="muted">{product.modules} modules</Text>
                  </div>
                  
                  {hasProduct(product.code) ? (
                    <Badge className="bg-green-100 text-green-700">
                      ✅ Owned
                    </Badge>
                  ) : null}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDemo(product.code)}
                  >
                    View Demo
                  </Button>
                  
                  {!hasProduct(product.code) && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handlePurchase(product.code, product.price)}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Buy Now</>}
                    </Button>
                  )}
                  
                  {hasProduct(product.code) && (
                    <Link href={`/products/${product.code}`}>
                      <Button
                        size="sm"
                        className="flex-1"
                      >
                        Access Course
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Text color="muted">
            India's most comprehensive startup education platform with 12 specialized courses
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <Heading as="h3" variant="h6" className="mb-2">India-Specific Content</Heading>
            <Text size="sm" color="muted">
              Tailored for Indian regulations, tax laws, and business environment
            </Text>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <Heading as="h3" variant="h6" className="mb-2">Expert-Designed</Heading>
            <Text size="sm" color="muted">
              Created by successful founders, CAs, and legal experts
            </Text>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <Heading as="h3" variant="h6" className="mb-2">Implementation-Focused</Heading>
            <Text size="sm" color="muted">
              Comprehensive templates, tools, and step-by-step action plans
            </Text>
          </Card>
        </div>

        {/* Money Back Guarantee Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <Heading as="h3" variant="h4" className="mb-3">
                100% Risk-Free with 3-Day Money Back Guarantee
              </Heading>
              <Text size="lg" color="muted" className="max-w-2xl mx-auto">
                We're confident you'll love our courses. If you're not completely satisfied within the first 3 days,
                we'll refund your purchase in full. No questions asked. Your success is our priority.
              </Text>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <Text>Full refund within 3 days</Text>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <Text>No questions asked</Text>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <Text>Keep downloaded templates</Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral & Community Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <Heading as="h4" variant="h5" className="mb-2">
                    Referral Program
                  </Heading>
                  <Text size="sm" color="muted" className="mb-3">
                    Earn ₹500 credit for each friend who joins The Indian Startup. 
                    Share your unique referral link and help others start their entrepreneurial journey.
                  </Text>
                  <div className="flex items-center gap-2 text-orange-600">
                    <CheckCircle className="w-4 h-4" />
                    <Text size="sm" weight="medium">₹500 per successful referral</Text>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <Heading as="h4" variant="h5" className="mb-2">
                    Free Community Access
                  </Heading>
                  <Text size="sm" color="muted" className="mb-3">
                    Join 10,000+ Indian founders in our community forum. Share experiences, 
                    ask questions, and network with fellow entrepreneurs - completely free!
                  </Text>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <Text size="sm" weight="medium">Free for all registered users</Text>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">12</div>
              <Text className="text-accent-light">Premium Courses</Text>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3000+</div>
              <Text className="text-accent-light">Templates & Tools</Text>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <Text className="text-accent-light">Days of Content</Text>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">₹75K</div>
              <Text className="text-accent-light">Worth of Education</Text>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="p-8 text-center">
          <Heading as="h2" variant="h3" className="mb-4">
            Ready to Build Your Startup?
          </Heading>
          <Text color="muted" className="mb-8 max-w-2xl mx-auto">
            Join thousands of founders who've used our courses to launch successful startups. 
            Start with a demo, then choose the path that fits your goals.
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#individual-courses">
              <Button size="lg">
                Explore All Courses
              </Button>
            </Link>
            <Link href="/demo/P1">
              <Button variant="outline" size="lg">
                Try Free Demo
              </Button>
            </Link>
          </div>
        </Card>
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
                  Should I buy individual courses or bundles?
                </Heading>
                <Text color="muted">
                  Bundles offer significant savings (up to ₹19,997) and cover comprehensive aspects of building a startup. Individual courses are perfect if you need specific expertise in one area. Try our demos to see what fits your needs.
                </Text>
              </div>
              
              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  How do demos work?
                </Heading>
                <Text color="muted">
                  Each course demo includes Day 1 and Day 2 content, giving you a real taste of the teaching methodology, content quality, and actionable tasks. No credit card required - just sign up and explore.
                </Text>
              </div>
              
              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  What makes this different from other startup courses?
                </Heading>
                <Text color="muted">
                  India-specific guidance, comprehensive templates and tools, expert-created content by successful founders and CAs, plus implementation-focused learning with step-by-step action plans tailored for Indian regulations and business environment.
                </Text>
              </div>

              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  Do I get lifetime access?
                </Heading>
                <Text color="muted">
                  Yes! Once purchased, you have 1-year access to the course content with all updates and improvements. This includes new templates, case studies, and regulatory updates as they become available.
                </Text>
              </div>

              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  How does the 3-day money back guarantee work?
                </Heading>
                <Text color="muted">
                  We offer a no-questions-asked refund within 3 days of purchase. Simply email support@theindianstartup.in with your order details, and we'll process your refund within 24-48 hours. You can keep any templates you've downloaded. We believe in our content quality and your satisfaction.
                </Text>
              </div>

              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  Can I upgrade from individual courses to bundles?
                </Heading>
                <Text color="muted">
                  Absolutely! Contact our support team and we'll help you upgrade to any bundle, adjusting the price based on courses you already own. You'll only pay the difference.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <Text size="sm" color="muted">
                By purchasing, you agree to our policies. All products are digital with instant access.
              </Text>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Privacy
              </Link>
              <Link href="/refund-policy" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Refund Policy
              </Link>
              <Link href="/shipping-delivery" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Shipping
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Contact
              </Link>
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
          const selectedProducts: string[] = dashboardCart.map((item: any) => item.productCode || item.code).filter(Boolean);
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
                            // Multi-product checkout - redirect to bundle for better value
                            const bundlePrice = 54999;
                            const selectedPrice = selectedProducts.reduce((sum, code) => {
                              const product = PRODUCTS[code];
                              return sum + (product?.price || 0);
                            }, 0);
                            
                            if (selectedPrice > bundlePrice * 0.8) {
                              // If selected products are >80% of bundle price, suggest bundle
                              alert(`Selected products cost ₹${selectedPrice.toLocaleString()}. The All-Access bundle at ₹${bundlePrice.toLocaleString()} gives you all 12 products - better value!`);
                            } else {
                              // For now, direct to individual purchases
                              const firstProductCode = selectedProducts[0];
                              const firstProduct = firstProductCode ? PRODUCTS[firstProductCode] : undefined;
                              if (firstProduct) {
                                router.push(`/purchase?product=${firstProduct.code}`);
                              }
                            }
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