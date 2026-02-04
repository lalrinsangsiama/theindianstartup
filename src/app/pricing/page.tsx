'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useUserProducts } from '@/hooks/useUserProducts';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle,
  Target,
  Shield,
  Zap,
  Loader2,
  Star,
  TrendingUp,
  Briefcase,
  Scale,
  DollarSign,
  MapPin,
  Database,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Award,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Factory,
  GraduationCap,
  Wheat,
  Building2,
  Microscope,
  Cloud,
  Globe,
  Heart,
  Settings,
  Server,
  CreditCard,
  Lightbulb,
  Package
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { SocialProofBanner, TrustBadges, PLATFORM_METRICS } from '@/components/social-proof/PlatformMetrics';
import { TestimonialCard, TESTIMONIALS } from '@/components/social-proof/FounderTestimonials';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CourseProduct {
  code: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  modules: number;
  category: string;
  icon: any;
  highlights: string[];
  outcomes: string[];
  includes: string[];
  idealFor: string;
}

interface CartItem {
  product: CourseProduct;
  quantity: number;
}

export default function PricingPage() {
  const { user } = useAuthContext();
  const { hasProduct } = useUserProducts();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('checkoutCart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Rehydrate the cart with full product data
        const rehydrated = parsed.map((item: any) => {
          const product = allProducts.find(p => p.code === item.code);
          return product ? { product, quantity: item.quantity } : null;
        }).filter(Boolean);
        setCart(rehydrated);
      } catch (e) {
        localStorage.removeItem('checkoutCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      const toSave = cart.map(item => ({ code: item.product.code, quantity: item.quantity }));
      localStorage.setItem('checkoutCart', JSON.stringify(toSave));
    } else {
      localStorage.removeItem('checkoutCart');
    }
  }, [cart]);

  useEffect(() => {
    const loadRazorpay = async () => {
      return new Promise<boolean>((resolve) => {
        // Check if script already exists to prevent duplicate script tags
        const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (existingScript) {
          // Script exists, wait for Razorpay to be available
          const checkInterval = setInterval(() => {
            if (window.Razorpay) {
              clearInterval(checkInterval);
              setRazorpayLoaded(true);
              resolve(true);
            }
          }, 100);
          // Timeout after 10 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            if (!window.Razorpay) {
              setRazorpayLoaded(false);
              resolve(false);
            }
          }, 10000);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          // Retry once after 2 seconds if script fails to load
          setTimeout(() => {
            // Check again before retry to prevent duplicate
            if (window.Razorpay) {
              setRazorpayLoaded(true);
              resolve(true);
              return;
            }
            const retryScript = document.createElement('script');
            retryScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
            retryScript.onload = () => {
              setRazorpayLoaded(true);
              resolve(true);
            };
            retryScript.onerror = () => {
              setRazorpayLoaded(false);
              resolve(false);
            };
            document.body.appendChild(retryScript);
          }, 2000);
        };
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

  const addToCart = (product: CourseProduct) => {
    const existing = cart.find(item => item.product.code === product.code);
    if (existing) {
      toast.info(`${product.title} is already in your cart`);
      return;
    }
    setCart(prev => [...prev, { product, quantity: 1 }]);
    toast.success(`Added ${product.title} to cart`);
  };

  const removeFromCart = (productCode: string) => {
    setCart(prev => prev.filter(item => item.product.code !== productCode));
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.length;

  const handleCheckout = async () => {
    if (!user) {
      // Save cart and redirect to login
      toast.info('Please log in to complete your purchase');
      router.push('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!razorpayLoaded || (typeof window !== 'undefined' && !window.Razorpay)) {
      toast.info('Payment system is loading. Please try again in a moment.');
      return;
    }

    // For single item, process directly
    if (cart.length === 1) {
      await handlePurchase(cart[0].product.code, cart[0].product.price);
      return;
    }

    // For multiple items, show clear message that multi-item checkout is not supported
    // and suggest All-Access if it's better value
    const allAccessPrice = 149999;
    if (cartTotal > allAccessPrice * 0.6) {
      toast.info(
        `Your cart total is ₹${cartTotal.toLocaleString('en-IN')}. Consider the All-Access Bundle at ₹1,49,999 for all 30 courses!`,
        { duration: 5000 }
      );
    }

    // Multi-item checkout not supported - inform user clearly
    toast.error(
      'Please purchase courses one at a time, or choose the All-Access Bundle for all courses.',
      { duration: 5000 }
    );
    return;
  };

  const handlePurchase = useCallback(async (productCode: string, price: number) => {
    if (!user) {
      toast.info('Please log in to complete your purchase');
      router.push('/login');
      return;
    }

    if (!razorpayLoaded || (typeof window !== 'undefined' && !window.Razorpay)) {
      toast.info('Payment system is loading. Please try again in a moment.');
      return;
    }

    setIsLoading(true);
    setLoadingProduct(productCode);

    try {
      const orderResponse = await fetch('/api/purchase/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: productCode,
          amount: price * 100,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        // Handle specific error cases
        if (orderResponse.status === 401) {
          toast.info('Please log in to complete your purchase');
          router.push('/login?redirectTo=/pricing');
          return;
        }
        throw new Error(errorData.error || 'Failed to create order');
      }

      const order = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'The Indian Startup',
        description: order.productName,
        handler: async (response: any) => {
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
            // Clear purchased item from cart
            removeFromCart(productCode);
            router.push(result.redirectUrl || '/dashboard');
          } else {
            toast.error('Payment verification failed. Please contact support if charged.');
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
        try {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } catch (razorpayError) {
          logger.error('Razorpay instantiation error:', razorpayError);
          toast.error('Payment gateway error. Please refresh and try again.');
          setIsLoading(false);
          setLoadingProduct(null);
          return;
        }
      } else {
        toast.error('Payment system not loaded. Please refresh the page.');
        setIsLoading(false);
        setLoadingProduct(null);
        return;
      }
    } catch (error) {
      logger.error('Purchase error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(errorMessage || 'Failed to initiate purchase. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingProduct(null);
    }
  }, [user, router, razorpayLoaded]);

  const toggleCourse = (code: string) => {
    setExpandedCourse(expandedCourse === code ? null : code);
  };

  const allProducts: CourseProduct[] = [
    {
      code: 'P1',
      title: '30-Day India Launch Sprint',
      description: 'Go from idea to incorporated startup with daily action plans. Perfect for first-time founders.',
      price: 4999,
      duration: '30 days',
      modules: 4,
      category: 'Foundation',
      icon: Target,
      highlights: [
        'Day-by-day action plan for 30 days',
        'Idea validation frameworks',
        'Business model canvas templates',
        'DPIIT registration walkthrough',
      ],
      outcomes: [
        'Validated business idea with market research',
        'Complete business plan and pitch deck',
        'Incorporated company with all registrations',
        'Go-to-market strategy ready to execute',
      ],
      includes: [
        'Step-by-step implementation guides',
        '50+ templates (pitch deck, business plan, etc.)',
        'Incorporation document templates',
        'Financial projection spreadsheets',
      ],
      idealFor: 'First-time founders, aspiring entrepreneurs, anyone with a business idea ready to launch',
    },
    {
      code: 'P2',
      title: 'Incorporation & Compliance Kit',
      description: 'Master Indian business incorporation and ongoing compliance. Never miss a filing deadline.',
      price: 4999,
      duration: '40 days',
      modules: 10,
      category: 'Legal',
      icon: Shield,
      highlights: [
        'Pvt Ltd vs LLP vs OPC comparison',
        'Complete MCA filing procedures',
        'GST, PAN, TAN registration guides',
        'Annual compliance calendar',
      ],
      outcomes: [
        'Fully incorporated business entity',
        'All statutory registrations complete',
        'Compliance calendar for the year',
        'Employment contracts and HR policies',
      ],
      includes: [
        '150+ legal document templates',
        'ROC filing checklists',
        'Board resolution templates',
        'Shareholder agreement drafts',
      ],
      idealFor: 'New startups needing incorporation, existing businesses wanting compliance systems',
    },
    {
      code: 'P3',
      title: 'Funding in India - Complete Mastery',
      description: 'Master the Indian funding ecosystem from government grants to Series A and beyond.',
      price: 5999,
      duration: '45 days',
      modules: 12,
      category: 'Growth',
      icon: TrendingUp,
      highlights: [
        'Government grants (₹20L-₹5Cr)',
        'Angel investor pitch strategies',
        'VC term sheet negotiation',
        'Debt funding options',
      ],
      outcomes: [
        'Active investor pipeline with meetings',
        '18-month funding roadmap',
        'Professional financial models',
        'Investor-ready pitch deck',
      ],
      includes: [
        '200+ funding templates',
        'Financial model templates (DCF, comparables)',
        'Term sheet templates and guides',
        'Investor database with 500+ contacts',
      ],
      idealFor: 'Startups preparing for funding rounds, founders seeking government grants',
    },
    {
      code: 'P4',
      title: 'Finance Stack - CFO-Level Mastery',
      description: 'Build world-class financial infrastructure. From bookkeeping to investor reporting.',
      price: 6999,
      duration: '45 days',
      modules: 12,
      category: 'Finance',
      icon: DollarSign,
      highlights: [
        'Accounting system setup (Tally, Zoho)',
        'GST compliance and optimization',
        'MIS and financial dashboards',
        'Tax planning strategies',
      ],
      outcomes: [
        'Complete accounting infrastructure',
        'Real-time financial dashboards',
        'Investor-grade financial reports',
        'Tax-optimized structure',
      ],
      includes: [
        '250+ finance templates',
        'Cash flow management tools',
        'Budget and forecast models',
        'Audit preparation checklists',
      ],
      idealFor: 'Growing startups needing financial systems, founders wanting CFO-level financial control',
    },
    {
      code: 'P5',
      title: 'Legal Stack - Bulletproof Framework',
      description: 'Build bulletproof legal infrastructure. Protect your startup from day one.',
      price: 7999,
      duration: '45 days',
      modules: 12,
      category: 'Legal',
      icon: Scale,
      highlights: [
        'Contract drafting and negotiation',
        'IP protection strategies',
        'Employment law compliance',
        'Data protection (IT Act, GDPR)',
      ],
      outcomes: [
        'Complete contract library',
        'IP portfolio strategy',
        'POSH compliance setup',
        'Litigation-prevention systems',
      ],
      includes: [
        '300+ legal templates',
        'NDA, MSA, SLA templates',
        'ESOP documentation',
        'Privacy policy generators',
      ],
      idealFor: 'Startups handling contracts, companies needing IP protection, HR compliance setup',
    },
    {
      code: 'P6',
      title: 'Sales & GTM Master Course',
      description: 'Transform into a revenue-generating machine. India-specific sales strategies that work.',
      price: 6999,
      duration: '60 days',
      modules: 10,
      category: 'Growth',
      icon: Briefcase,
      highlights: [
        'B2B and B2C sales frameworks',
        'India-specific buyer psychology',
        'CRM setup and optimization',
        'Sales team hiring and training',
      ],
      outcomes: [
        'Predictable sales pipeline',
        'Scalable sales processes',
        'High-performing sales team',
        'Optimized conversion funnels',
      ],
      includes: [
        '75+ sales templates',
        'Cold email sequences',
        'Sales scripts and objection handlers',
        'CRM setup guides (HubSpot, Zoho)',
      ],
      idealFor: 'Founders doing sales, startups building sales teams, B2B companies',
    },
    {
      code: 'P7',
      title: 'State-wise Scheme Map',
      description: 'Unlock benefits from all 28 states + 8 UTs. Maximize government incentives.',
      price: 4999,
      duration: '30 days',
      modules: 10,
      category: 'Government',
      icon: MapPin,
      highlights: [
        'State-by-state scheme database',
        'Eligibility assessment tools',
        'Application process guides',
        'Multi-state strategy planning',
      ],
      outcomes: [
        'Identified schemes worth ₹50L+',
        'Applications submitted for top schemes',
        'State relationship building',
        '30-50% cost reduction strategies',
      ],
      includes: [
        '500+ state schemes database',
        'Application templates for each state',
        'Government contact directory',
        'Scheme comparison calculators',
      ],
      idealFor: 'Startups expanding to multiple states, manufacturing companies, export businesses',
    },
    {
      code: 'P8',
      title: 'Investor-Ready Data Room',
      description: 'Professional data room that accelerates funding. What top VCs expect to see.',
      price: 9999,
      duration: '45 days',
      modules: 8,
      category: 'Growth',
      icon: Database,
      highlights: [
        'Data room structure and setup',
        'Due diligence preparation',
        'Financial data presentation',
        'Legal document organization',
      ],
      outcomes: [
        'Professional investor data room',
        'Due diligence ready in days, not weeks',
        'Higher valuation potential',
        'Faster funding closes',
      ],
      includes: [
        '50+ investor-grade templates',
        'Data room setup guides',
        'Due diligence checklists',
        'Investor update templates',
      ],
      idealFor: 'Startups raising Series A+, companies in active fundraising, M&A preparation',
    },
    {
      code: 'P9',
      title: 'Government Schemes & Funding',
      description: 'Access ₹50 lakhs to ₹5 crores in government funding. Step-by-step application guides.',
      price: 4999,
      duration: '21 days',
      modules: 4,
      category: 'Government',
      icon: Award,
      highlights: [
        'Startup India benefits',
        'SIDBI and MUDRA loans',
        'PLI scheme applications',
        'R&D grants and subsidies',
      ],
      outcomes: [
        'Government funding pipeline',
        'Multiple applications submitted',
        'Higher approval rates',
        'Ongoing scheme monitoring',
      ],
      includes: [
        '40+ scheme application templates',
        'Eligibility calculators',
        'Document checklists',
        'Follow-up tracking systems',
      ],
      idealFor: 'Early-stage startups, manufacturing companies, R&D focused businesses',
    },
    {
      code: 'P10',
      title: 'Patent Mastery for Startups',
      description: 'Master IP from filing to monetization. Protect and profit from your innovations.',
      price: 7999,
      duration: '60 days',
      modules: 12,
      category: 'Legal',
      icon: Shield,
      highlights: [
        'Patent vs trademark vs copyright',
        'Patent search and filing',
        'International PCT applications',
        'IP monetization strategies',
      ],
      outcomes: [
        'Complete IP audit',
        'Patent applications filed',
        'IP portfolio strategy',
        'Licensing and monetization plan',
      ],
      includes: [
        '100+ IP templates',
        'Patent drafting guides',
        'IP valuation frameworks',
        'Licensing agreement templates',
      ],
      idealFor: 'Tech startups with innovations, R&D companies, product-based businesses',
    },
    {
      code: 'P11',
      title: 'Branding & PR Mastery',
      description: 'Transform into a recognized industry leader. Build a brand that commands premium.',
      price: 7999,
      duration: '54 days',
      modules: 12,
      category: 'Marketing',
      icon: Star,
      highlights: [
        'Brand identity development',
        'Media relations and PR',
        'Crisis communication',
        'Personal branding for founders',
      ],
      outcomes: [
        'Complete brand identity system',
        'Active media coverage',
        'Award applications submitted',
        'Founder thought leadership',
      ],
      includes: [
        '300+ branding templates',
        'Press release templates',
        'Media pitch frameworks',
        'Brand guidelines generator',
      ],
      idealFor: 'Startups building brand presence, founders seeking thought leadership, B2C companies',
    },
    {
      code: 'P12',
      title: 'Marketing Mastery',
      description: 'Build a data-driven marketing machine. Predictable growth with measurable ROI.',
      price: 9999,
      duration: '60 days',
      modules: 12,
      category: 'Marketing',
      icon: TrendingUp,
      highlights: [
        'Digital marketing strategy',
        'Performance marketing (Meta, Google)',
        'Content marketing systems',
        'Marketing automation setup',
      ],
      outcomes: [
        'Multi-channel marketing engine',
        'Predictable CAC and LTV',
        'Marketing automation running',
        'Data-driven optimization',
      ],
      includes: [
        '500+ marketing templates',
        'Ad creative templates',
        'Email sequence frameworks',
        'Analytics dashboard setup',
      ],
      idealFor: 'Growth-stage startups, D2C brands, companies scaling marketing',
    },
    {
      code: 'P13',
      title: 'Food Processing Mastery',
      description: 'Complete guide to food business. FSSAI compliance to manufacturing to export.',
      price: 7999,
      duration: '50 days',
      modules: 10,
      category: 'Sector',
      icon: Target,
      highlights: [
        'FSSAI licensing (all categories)',
        'Manufacturing facility setup',
        'Quality certifications (ISO, HACCP)',
        'PMFME and PLI subsidies',
      ],
      outcomes: [
        'FSSAI compliant operations',
        'Quality certifications obtained',
        'Government subsidies accessed',
        'Export documentation ready',
      ],
      includes: [
        '150+ food industry templates',
        'FSSAI application guides',
        'Quality manual templates',
        'Export documentation',
      ],
      idealFor: 'Food startups, restaurant chains, food exporters, FMCG companies',
    },
    {
      code: 'P14',
      title: 'Impact & CSR Mastery',
      description: 'Tap into India\'s ₹25,000 Cr CSR ecosystem. Build sustainable social enterprises.',
      price: 8999,
      duration: '55 days',
      modules: 11,
      category: 'Sector',
      icon: Users,
      highlights: [
        'Schedule VII compliance',
        'Section 8 company setup',
        'CSR proposal writing',
        'Impact measurement (IRIS+)',
      ],
      outcomes: [
        'CSR-compliant structure',
        'Active corporate partnerships',
        'Impact measurement system',
        'Sustainable funding pipeline',
      ],
      includes: [
        '100+ impact templates',
        'CSR proposal templates',
        'Impact report frameworks',
        'Corporate pitch decks',
      ],
      idealFor: 'Social enterprises, NGOs seeking corporate funding, impact startups',
    },
    {
      code: 'P15',
      title: 'Carbon Credits & Sustainability',
      description: 'Build a carbon business. GHG accounting to trading to Net Zero consulting.',
      price: 9999,
      duration: '60 days',
      modules: 12,
      category: 'Sector',
      icon: TrendingUp,
      highlights: [
        'GHG Protocol accounting',
        'Verra VCS project development',
        'Carbon credit trading',
        'Net Zero strategy consulting',
      ],
      outcomes: [
        'Carbon accounting capability',
        'Credit project development',
        'Trading relationships',
        'Consulting service offering',
      ],
      includes: [
        '80+ sustainability templates',
        'GHG calculation tools',
        'Project development guides',
        'BRSR reporting templates',
      ],
      idealFor: 'Sustainability consultants, companies with carbon projects, ESG advisors',
    },
    // Core Functions (P16-P19)
    {
      code: 'P16',
      title: 'HR & Team Building Mastery',
      description: 'Complete HR infrastructure from recruitment to scaling. Build and retain your A-team.',
      price: 5999,
      duration: '45 days',
      modules: 9,
      category: 'Core Functions',
      icon: Users,
      highlights: [
        'Recruitment and hiring systems',
        'Compensation design with ESOPs',
        'PF, ESI, and labor compliance',
        'POSH compliance and HR policies',
      ],
      outcomes: [
        'Complete recruitment infrastructure',
        'Competitive compensation structures',
        'Labor law compliance achieved',
        'Performance management system',
      ],
      includes: [
        '50+ HR templates',
        'Offer letter and contract templates',
        'ESOP agreement drafts',
        'Salary benchmarking tools',
      ],
      idealFor: 'Startups hiring their first team, growing companies needing HR systems',
    },
    {
      code: 'P17',
      title: 'Product Development & Validation',
      description: 'Master product-market fit. From customer discovery to growth experiments.',
      price: 6999,
      duration: '50 days',
      modules: 10,
      category: 'Core Functions',
      icon: Lightbulb,
      highlights: [
        'Customer discovery frameworks',
        'MVP design and validation',
        'Agile methodology for startups',
        'Product metrics and growth loops',
      ],
      outcomes: [
        'Validated product-market fit',
        'Data-driven product decisions',
        'Growth experimentation system',
        'Product roadmap framework',
      ],
      includes: [
        '40+ product templates',
        'PRD and user persona templates',
        'TAM/SAM/SOM calculators',
        'Feature prioritization matrix',
      ],
      idealFor: 'Product managers, founders building MVPs, teams seeking product-market fit',
    },
    {
      code: 'P18',
      title: 'Operations & Supply Chain',
      description: 'Build scalable operations. From process design to supply chain optimization.',
      price: 5999,
      duration: '40 days',
      modules: 8,
      category: 'Core Functions',
      icon: Settings,
      highlights: [
        'Process design and SOPs',
        'Supply chain management',
        'Quality management systems',
        'Inventory optimization',
      ],
      outcomes: [
        'Scalable operational processes',
        'Optimized supply chain network',
        'Quality certifications ready',
        '30% cost reduction achieved',
      ],
      includes: [
        '35+ operations templates',
        'SOP and process map templates',
        'Vendor agreement drafts',
        'Inventory optimization tools',
      ],
      idealFor: 'Operations managers, manufacturing startups, D2C brands',
    },
    {
      code: 'P19',
      title: 'Technology Stack & Infrastructure',
      description: 'Build robust technical infrastructure. CTO-level architecture and security.',
      price: 6999,
      duration: '45 days',
      modules: 9,
      category: 'Core Functions',
      icon: Server,
      highlights: [
        'System architecture design',
        'Cloud strategy (AWS/GCP/Azure)',
        'DevOps and CI/CD pipelines',
        'Security frameworks',
      ],
      outcomes: [
        'Scalable system architecture',
        'Optimized cloud infrastructure',
        'Robust security posture',
        '50% infrastructure cost savings',
      ],
      includes: [
        '40+ tech templates',
        'Architecture documentation',
        'Security policy templates',
        'Cloud cost calculators',
      ],
      idealFor: 'CTOs, tech leads, founders building technical infrastructure',
    },
    // High-Growth Sectors (P20-P24)
    {
      code: 'P20',
      title: 'FinTech Mastery',
      description: 'Navigate India\'s ₹1 trillion+ FinTech market. RBI compliance to scale.',
      price: 8999,
      duration: '55 days',
      modules: 11,
      category: 'High-Growth',
      icon: CreditCard,
      highlights: [
        'RBI regulatory frameworks',
        'PA/PG and NBFC licensing',
        'Digital lending guidelines',
        'Account Aggregator framework',
      ],
      outcomes: [
        'RBI-compliant operations',
        'Licensing pathway clarity',
        'Partnership-ready compliance',
        'Scalable FinTech infrastructure',
      ],
      includes: [
        '50+ FinTech templates',
        'RBI application templates',
        'KYC/AML policy frameworks',
        'Compliance checkers',
      ],
      idealFor: 'FinTech founders, payment startups, digital lending companies',
    },
    {
      code: 'P21',
      title: 'HealthTech & Medical Devices',
      description: 'Master India\'s top-funded sector. CDSCO compliance to healthcare scale.',
      price: 8999,
      duration: '55 days',
      modules: 11,
      category: 'High-Growth',
      icon: Heart,
      highlights: [
        'CDSCO medical device regulations',
        'Telemedicine practice guidelines',
        'ABDM integration',
        'Clinical trial compliance',
      ],
      outcomes: [
        'CDSCO-compliant products',
        'Telemedicine regulatory clearance',
        'Healthcare partnership network',
        'ISO 13485 certification ready',
      ],
      includes: [
        '55+ HealthTech templates',
        'CDSCO application guides',
        'Clinical protocol templates',
        'Device classification tools',
      ],
      idealFor: 'HealthTech founders, medical device startups, telemedicine platforms',
    },
    {
      code: 'P22',
      title: 'E-commerce & D2C Mastery',
      description: 'Build profitable e-commerce. From marketplace to omnichannel scale.',
      price: 7999,
      duration: '50 days',
      modules: 10,
      category: 'High-Growth',
      icon: ShoppingCart,
      highlights: [
        'E-commerce business models',
        'Consumer Protection Act compliance',
        'Marketplace mastery (Amazon, Flipkart)',
        'D2C website optimization',
      ],
      outcomes: [
        'Optimized marketplace presence',
        'High-converting D2C website',
        'Efficient logistics network',
        'Omnichannel growth strategy',
      ],
      includes: [
        '45+ e-commerce templates',
        'Seller agreement templates',
        'Unit economics calculators',
        'Logistics optimization tools',
      ],
      idealFor: 'E-commerce founders, D2C brands, marketplace sellers',
    },
    {
      code: 'P23',
      title: 'EV & Clean Mobility',
      description: 'Access ₹25,938 Cr PLI scheme. FAME II to manufacturing mastery.',
      price: 8999,
      duration: '55 days',
      modules: 11,
      category: 'High-Growth',
      icon: Zap,
      highlights: [
        'FAME II and state subsidies',
        'PLI scheme application',
        'Battery supply chain',
        'Vehicle homologation (ARAI/iCAT)',
      ],
      outcomes: [
        'PLI scheme access',
        'Subsidy-optimized manufacturing',
        'Homologation certification',
        'EV business model validated',
      ],
      includes: [
        '50+ EV templates',
        'PLI application guides',
        'Subsidy calculators',
        'DVA compliance trackers',
      ],
      idealFor: 'EV manufacturers, charging infrastructure startups, clean mobility ventures',
    },
    {
      code: 'P24',
      title: 'Manufacturing & Make in India',
      description: 'Master 13 PLI schemes worth ₹1.97 lakh crore. Factory to export scale.',
      price: 8999,
      duration: '55 days',
      modules: 11,
      category: 'High-Growth',
      icon: Factory,
      highlights: [
        'Factory setup and licensing',
        '13 PLI scheme navigation',
        'Quality certifications (ISO, BIS)',
        'SEZ and industrial park benefits',
      ],
      outcomes: [
        'Compliant factory operations',
        'PLI scheme approval',
        'Quality certifications achieved',
        'Export-ready manufacturing',
      ],
      includes: [
        '55+ manufacturing templates',
        'PLI application guides',
        'Factory license checklists',
        'Capacity planning tools',
      ],
      idealFor: 'Manufacturing entrepreneurs, PLI applicants, export-focused companies',
    },
    // Emerging Sectors (P25-P28)
    {
      code: 'P25',
      title: 'EdTech Mastery',
      description: 'Navigate NEP 2020 compliance. UGC/AICTE approvals to EdTech scale.',
      price: 6999,
      duration: '45 days',
      modules: 9,
      category: 'Emerging',
      icon: GraduationCap,
      highlights: [
        'NEP 2020 curriculum frameworks',
        'UGC ODL and AICTE approvals',
        'LMS and content creation',
        'Student data privacy (DPDPA)',
      ],
      outcomes: [
        'Regulatory compliance achieved',
        'Engaging content platform',
        'Sustainable monetization',
        'Accreditation pathway',
      ],
      includes: [
        '40+ EdTech templates',
        'UGC application guides',
        'Content licensing frameworks',
        'LMS comparison tools',
      ],
      idealFor: 'EdTech founders, online education platforms, upskilling ventures',
    },
    {
      code: 'P26',
      title: 'AgriTech & Farm-to-Fork',
      description: 'Build agricultural ventures. FPO formation to APEDA exports.',
      price: 6999,
      duration: '45 days',
      modules: 9,
      category: 'Emerging',
      icon: Wheat,
      highlights: [
        'FPO formation and management',
        'APMC reforms and e-NAM',
        'Government schemes (PM-KISAN, PMFBY)',
        'Cold chain and APEDA exports',
      ],
      outcomes: [
        'FPO registration complete',
        'Government scheme access',
        'Cold chain infrastructure',
        'Export-ready operations',
      ],
      includes: [
        '40+ AgriTech templates',
        'FPO registration guides',
        'Scheme eligibility checkers',
        'Cold chain planning tools',
      ],
      idealFor: 'AgriTech founders, FPO organizers, agricultural exporters',
    },
    {
      code: 'P27',
      title: 'Real Estate & PropTech',
      description: 'Master RERA compliance. PropTech innovations to smart city scale.',
      price: 7999,
      duration: '50 days',
      modules: 10,
      category: 'Emerging',
      icon: Building2,
      highlights: [
        'State-wise RERA compliance',
        'Construction permits and approvals',
        'PropTech innovations (VR, blockchain)',
        'REIT and real estate finance',
      ],
      outcomes: [
        'RERA-compliant operations',
        'PropTech solution deployed',
        'Real estate finance structured',
        'Smart city integration',
      ],
      includes: [
        '45+ PropTech templates',
        'RERA registration guides',
        'Property valuation tools',
        'Compliance tracking systems',
      ],
      idealFor: 'PropTech founders, real estate developers, co-living/co-working ventures',
    },
    {
      code: 'P28',
      title: 'Biotech & Life Sciences',
      description: 'Navigate drug development. CDSCO to global regulatory pathways.',
      price: 9999,
      duration: '60 days',
      modules: 12,
      category: 'Emerging',
      icon: Microscope,
      highlights: [
        'CDSCO drug approval pathway',
        'Clinical trials (CTRI) compliance',
        'GMP and WHO-GMP certifications',
        'BIRAC and DBT funding',
      ],
      outcomes: [
        'Regulatory pathway clarity',
        'Clinical trial readiness',
        'GMP certification achieved',
        'BIRAC funding secured',
      ],
      includes: [
        '60+ Biotech templates',
        'CDSCO application guides',
        'Clinical protocol templates',
        'GMP documentation',
      ],
      idealFor: 'Biotech founders, pharma startups, medical research ventures',
    },
    // Advanced & Global (P29-P30)
    {
      code: 'P29',
      title: 'SaaS & B2B Tech Mastery',
      description: 'Build global SaaS. Metrics mastery to international compliance.',
      price: 7999,
      duration: '50 days',
      modules: 10,
      category: 'Advanced',
      icon: Cloud,
      highlights: [
        'SaaS pricing and packaging',
        'Metrics mastery (ARR, NRR, LTV)',
        'Product-led growth strategies',
        'GDPR and SOC 2 compliance',
      ],
      outcomes: [
        'Optimized SaaS metrics',
        'Product-led growth engine',
        'Enterprise sales pipeline',
        'Global compliance achieved',
      ],
      includes: [
        '45+ SaaS templates',
        'ToS, DPA, SLA agreements',
        'SaaS metrics dashboards',
        'Pricing optimization tools',
      ],
      idealFor: 'SaaS founders, B2B tech companies, enterprise software ventures',
    },
    {
      code: 'P30',
      title: 'International Expansion',
      description: 'Go global from India. FEMA compliance to US/EU/MENA market entry.',
      price: 9999,
      duration: '55 days',
      modules: 11,
      category: 'Advanced',
      icon: Globe,
      highlights: [
        'FEMA compliance for overseas investment',
        'US (Delaware C-Corp) and EU entity setup',
        'Export procedures and documentation',
        'Global hiring (EOR) and tax optimization',
      ],
      outcomes: [
        'FEMA-compliant structure',
        'International entity established',
        'Export operations running',
        'Global tax optimization',
      ],
      includes: [
        '55+ international templates',
        'FEMA filing guides',
        'International contract templates',
        'Market assessment tools',
      ],
      idealFor: 'Startups expanding globally, export businesses, international SaaS companies',
    },
  ];

  const isInCart = (code: string) => cart.some(item => item.product.code === code);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo variant="full" className="h-8 text-black" />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm hover:text-black transition-colors hover:underline hidden sm:block">
                Home
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white border-2 border-black text-black text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {user ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push('/signup')}
                  className="px-4 py-2"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <Heading as="h2" variant="h5">Your Cart</Heading>
                {cartCount > 0 && (
                  <Badge className="bg-blue-100 text-blue-700">{cartCount} items</Badge>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <Text color="muted">Your cart is empty</Text>
                  <Text size="sm" color="muted" className="mt-2">
                    Browse courses and add them to your cart
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Browse Courses
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.product.code} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.product.icon className="w-5 h-5 text-gray-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Text weight="medium" className="truncate">{item.product.title}</Text>
                          <Text size="sm" color="muted">{item.product.duration}</Text>
                          <Text className="font-bold mt-1">₹{item.product.price.toLocaleString('en-IN')}</Text>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.code)}
                          className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* All-Access Suggestion */}
                  {cartTotal > 30000 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Text weight="semibold" className="text-blue-900 mb-1">
                        Consider All-Access Bundle
                      </Text>
                      <Text size="sm" className="text-blue-700 mb-3">
                        Get all 30 courses for ₹1,49,999 (Save ₹{(cartTotal - 149999).toLocaleString('en-IN')} vs your cart)
                      </Text>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                        onClick={() => {
                          clearCart();
                          handlePurchase('ALL_ACCESS', 149999);
                        }}
                      >
                        Get All-Access Instead
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Text weight="semibold">Total</Text>
                    <Text className="text-2xl font-bold">₹{cartTotal.toLocaleString('en-IN')}</Text>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                  </Button>
                  <button
                    onClick={clearCart}
                    className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Header */}
      <section className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" variant="h2" className="mb-4">
              Choose Your Path
            </Heading>
            <Text size="xl" color="muted" className="mb-8">
              30 comprehensive courses for Indian founders. Add courses to your cart and checkout when ready.
            </Text>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>30 courses</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span>450+ templates</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <Shield className="w-4 h-4" />
                <span>3-day guarantee</span>
              </div>
            </div>

            {/* Social Proof Banner */}
            <SocialProofBanner className="max-w-2xl mx-auto" />
          </div>
        </div>
      </section>

      {/* All-Access Bundle - Enhanced Value Display */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-gray-900 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 text-center">
                <Badge className="bg-green-500 text-white mb-2">BEST VALUE - SAVE 48%</Badge>
                <div className="text-lg font-medium">All-Access Mastermind Bundle</div>
              </div>
              <CardContent className="p-8">
                {/* Value Breakdown Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Total Value */}
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <Text size="sm" color="muted" className="mb-1">Total Value</Text>
                    <Text className="text-3xl font-bold text-green-700">₹2,90,952</Text>
                    <Text size="xs" color="muted" className="mt-1">30 courses + 18 toolkits</Text>
                  </div>

                  {/* Your Price */}
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <Text size="sm" color="muted" className="mb-1">Your Investment</Text>
                    <Text className="text-3xl font-bold text-blue-700">₹1,49,999</Text>
                    <Text size="xs" color="muted" className="mt-1">One-time payment</Text>
                  </div>

                  {/* You Save */}
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <Text size="sm" color="muted" className="mb-1">You Save</Text>
                    <Text className="text-3xl font-bold text-purple-700">₹1,40,953</Text>
                    <Badge className="bg-purple-600 text-white mt-1">48% OFF</Badge>
                  </div>
                </div>

                {/* Per-Course Value */}
                <div className="text-center mb-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <Text className="text-lg">
                    That&apos;s only <span className="font-bold text-yellow-700">₹3,125</span> per course!
                  </Text>
                  <Text size="sm" color="muted" className="mt-1">
                    Compare: A single month of startup consulting costs ₹50,000 - ₹2,00,000
                  </Text>
                </div>

                {/* What's Included */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Text weight="semibold" className="mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Courses Included (30)
                    </Text>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Foundation (P1-P12)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Sector-Specific (P13-P15)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Core Functions (P16-P19)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>High-Growth (P20-P24)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Emerging (P25-P28)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Advanced (P29-P30)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Text weight="semibold" className="mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      Toolkits Included (18)
                    </Text>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>450+ downloadable templates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>300+ tools and calculators</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Legal document library</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Financial models & spreadsheets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Pitch deck templates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Government scheme applications</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bonus Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Lifetime updates</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Founder community</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Completion certificates</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full max-w-md text-lg py-4"
                    onClick={() => handlePurchase('ALL_ACCESS', 149999)}
                    disabled={isLoading}
                  >
                    {loadingProduct === 'ALL_ACCESS' ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    Get All-Access Bundle - ₹1,49,999
                  </Button>

                  <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>3-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      <span>Instant access</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Individual Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heading as="h2" variant="h3" className="mb-2">
              Individual Courses
            </Heading>
            <Text color="muted">
              Click any course to see details, then add to cart
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {allProducts.map((product) => {
              const isExpanded = expandedCourse === product.code;
              const isOwned = hasProduct(product.code);
              const inCart = isInCart(product.code);
              const isLoadingThis = loadingProduct === product.code;

              return (
                <Card
                  key={product.code}
                  className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'} ${inCart ? 'ring-2 ring-green-500' : ''}`}
                >
                  <CardContent className="p-0">
                    {/* Card Header - Always Visible */}
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => toggleCourse(product.code)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <product.icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                              {inCart && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  In Cart
                                </Badge>
                              )}
                              {isOwned && (
                                <Badge className="bg-blue-100 text-blue-700 text-xs">
                                  Owned
                                </Badge>
                              )}
                            </div>
                            <Heading as="h3" variant="h6">
                              {product.title}
                            </Heading>
                          </div>
                        </div>
                        <div className="text-right">
                          <Text className="text-xl font-bold">
                            ₹{product.price.toLocaleString('en-IN')}
                          </Text>
                          <Text size="xs" color="muted">{product.duration}</Text>
                          {/* Value ROI Badge */}
                          <Badge className="bg-green-100 text-green-700 text-xs mt-1">
                            {Math.round((product.price * 3) / 1000)}K+ value
                          </Badge>
                        </div>
                      </div>

                      <Text size="sm" color="muted" className="mb-4">
                        {product.description}
                      </Text>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {product.modules} modules
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            Templates included
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600">
                          <span className="text-sm font-medium">
                            {isExpanded ? 'Hide details' : 'View details'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 bg-gray-50 p-6">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          {/* What You'll Learn */}
                          <div>
                            <Text weight="semibold" className="mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4 text-blue-600" />
                              Key Topics
                            </Text>
                            <ul className="space-y-2">
                              {product.highlights.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Outcomes */}
                          <div>
                            <Text weight="semibold" className="mb-3 flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-600" />
                              What You Will Achieve
                            </Text>
                            <ul className="space-y-2">
                              {product.outcomes.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* What's Included */}
                        <div className="mb-6">
                          <Text weight="semibold" className="mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange-600" />
                            What is Included
                          </Text>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {product.includes.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm bg-white p-2 rounded">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Ideal For */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                          <Text weight="semibold" className="mb-1 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            Ideal For
                          </Text>
                          <Text size="sm" color="muted">
                            {product.idealFor}
                          </Text>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div>
                            <Text className="text-2xl font-bold">
                              ₹{product.price.toLocaleString('en-IN')}
                            </Text>
                            <Text size="xs" color="muted">One-time payment • 365 days access</Text>
                          </div>

                          {isOwned ? (
                            <Button
                              variant="outline"
                              onClick={() => router.push(`/products/${product.code.toLowerCase()}`)}
                            >
                              Access Course
                            </Button>
                          ) : inCart ? (
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                onClick={() => removeFromCart(product.code)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => setIsCartOpen(true)}
                              >
                                View Cart
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={() => addToCart(product)}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          )}
                        </div>

                        {isOwned && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                            <Text size="sm" className="text-green-700 font-medium">
                              ✓ You own this course
                            </Text>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Cart Button (Mobile) */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 z-40 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
            <span className="bg-white text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <Heading as="h3" variant="h6" className="mb-2">India-Specific</Heading>
                <Text size="sm" color="muted">
                  Built for Indian regulations, tax laws, and business environment
                </Text>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <Heading as="h3" variant="h6" className="mb-2">Expert-Designed</Heading>
                <Text size="sm" color="muted">
                  Created by successful founders, CAs, and legal experts
                </Text>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <Heading as="h3" variant="h6" className="mb-2">Implementation-Focused</Heading>
                <Text size="sm" color="muted">
                  Templates, tools, and step-by-step action plans
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <Heading as="h2" variant="h3" className="mb-4">
              3-Day Money-Back Guarantee
            </Heading>
            <Text size="lg" color="muted" className="mb-6">
              Not satisfied? Get a full refund within 3 days. No questions asked.
            </Text>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Full refund</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No questions asked</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Keep downloaded templates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Heading as="h2" variant="h3" className="text-center mb-12">
              Frequently Asked Questions
            </Heading>

            <div className="space-y-8">
              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  Should I buy individual courses or the bundle?
                </Heading>
                <Text color="muted">
                  If you need 3 or more courses, the All-Access Bundle offers better value - you get all 30 courses for the price of about 15. Individual courses are perfect if you need specific expertise in one area.
                </Text>
              </div>

              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  How long do I have access?
                </Heading>
                <Text color="muted">
                  You get 365 days of access to all purchased content, including any updates made during that period. Download templates to keep them forever.
                </Text>
              </div>

              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  Are these courses suitable for beginners?
                </Heading>
                <Text color="muted">
                  Yes. Each course starts with fundamentals and progresses to advanced topics. P1 (30-Day Launch Sprint) is specifically designed for first-time founders with no prior experience.
                </Text>
              </div>

              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  Can I upgrade later?
                </Heading>
                <Text color="muted">
                  Yes. Contact support and we will help you upgrade to the All-Access Bundle, adjusting the price based on courses you already own.
                </Text>
              </div>

              <div>
                <Heading as="h3" variant="h5" className="mb-2">
                  How does the refund work?
                </Heading>
                <Text color="muted">
                  Email support@theindianstartup.in within 3 days of purchase. We will process your refund within 24-48 hours with no questions asked. You can keep any templates you have downloaded.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Text size="sm" color="muted">
              © {new Date().getFullYear()} The Indian Startup. All products are digital with instant access.
            </Text>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Privacy
              </Link>
              <Link href="/refund-policy" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Refund Policy
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
