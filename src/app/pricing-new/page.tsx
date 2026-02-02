'use client';

import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  BookOpen, 
  FileText, 
  Award,
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
  Database
} from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Product {
  code: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  outcomes: string[];
  estimatedTime: string;
  icon: React.ElementType;
  badge?: string;
  popular?: boolean;
}

const products: Product[] = [
  {
    code: 'P1',
    title: '30-Day India Launch Sprint',
    description: 'Go from idea to incorporated startup with daily action plans and India-specific guidance.',
    price: 999,
    originalPrice: 2499,
    features: [
      '30 daily action plans with checklists',
      'Incorporation step-by-step guide',
      'DPIIT registration walkthrough',
      'GST & compliance basics',
      'First 10 customers framework',
      'Pitch deck template',
      'Community access',
      'WhatsApp support group'
    ],
    outcomes: [
      'Incorporated startup with all compliances',
      'Clear go-to-market strategy',
      'Ready-to-launch MVP',
      'First customer validation'
    ],
    estimatedTime: '30 days (1-2 hours/day)',
    icon: Target,
    badge: 'Most Popular',
    popular: true
  },
  {
    code: 'P2',
    title: 'Incorporation & Compliance Kit',
    description: 'Complete legal setup guide with templates, forms, and step-by-step compliance roadmap.',
    price: 2999,
    features: [
      'Entity type comparison guide',
      'SPICe+ form walkthrough',
      'DSC/DIN application process',
      'PAN/TAN registration',
      'GST registration guide',
      'Bank account opening checklist',
      'Share certificate templates',
      'Board resolution formats'
    ],
    outcomes: [
      'Legally compliant business entity',
      'All regulatory registrations complete',
      'Professional documentation ready',
      'Clear compliance calendar'
    ],
    estimatedTime: '7-14 days',
    icon: Shield
  },
  {
    code: 'P3',
    title: 'Funding in India',
    description: 'Navigate grants, loans, and equity funding with eligibility checkers and application templates.',
    price: 3999,
    features: [
      'Government schemes database',
      'Eligibility assessment tools',
      'Grant application templates',
      'Investor pitch deck framework',
      'Term sheet negotiation guide',
      'Due diligence checklist',
      'Funding calendar & deadlines',
      'Angel investor directory'
    ],
    outcomes: [
      'Matched to relevant funding opportunities',
      'Professional investor pitch ready',
      'Grant applications submitted',
      'Investor-ready documentation'
    ],
    estimatedTime: '2-4 weeks',
    icon: TrendingUp
  },
  {
    code: 'P4',
    title: 'Finance Stack',
    description: 'CFO-level financial management with accounting setup, GST compliance, and financial modeling.',
    price: 2999,
    features: [
      'Chart of accounts for startups',
      'Monthly closing procedures',
      'GST return filing guide',
      'TDS compliance calendar',
      'Financial model templates',
      'Investor reporting formats',
      'Expense management system',
      'Payroll setup guide'
    ],
    outcomes: [
      'Professional accounting system',
      'GST compliant operations',
      'Investor-ready financials',
      'Clear runway tracking'
    ],
    estimatedTime: '1-2 weeks',
    icon: DollarSign
  },
  {
    code: 'P5',
    title: 'Legal Stack',
    description: 'Comprehensive legal templates and IP protection with founder agreements and contracts.',
    price: 4999,
    features: [
      'Founder agreement template',
      'Employment contract formats',
      'IP assignment agreements',
      'NDA templates (mutual & one-way)',
      'Terms of service template',
      'Privacy policy (DPDPA compliant)',
      'Vendor agreements',
      'ESOP policy framework'
    ],
    outcomes: [
      'Legally protected business',
      'Professional contracts ready',
      'IP properly assigned',
      'Compliance with data protection laws'
    ],
    estimatedTime: '1 week',
    icon: Scale
  },
  {
    code: 'P6',
    title: 'Sales & GTM in India',
    description: 'Master Indian market sales with scripts, processes, and distribution strategies.',
    price: 3999,
    features: [
      'ICP development framework',
      'Cold outreach scripts (email/WhatsApp)',
      'Government tender guide (GeM)',
      'UPI & payment integration',
      'ONDC marketplace strategy',
      'B2B sales process',
      'Channel partner programs',
      'CRM setup & tracking'
    ],
    outcomes: [
      'Structured sales process',
      'First 100 customers roadmap',
      'Government sales capability',
      'Scalable revenue operations'
    ],
    estimatedTime: '2-3 weeks',
    icon: Users
  },
  {
    code: 'P7',
    title: 'State-wise Scheme Map',
    description: 'Navigate state government benefits, incentives, and location-specific opportunities.',
    price: 2999,
    features: [
      'All 28 states scheme database',
      'Sector-wise incentive filters',
      'Application deadline tracker',
      'Eligibility requirement matrix',
      'Contact directory',
      'Success rate statistics',
      'Application templates',
      'Regional partnership opportunities'
    ],
    outcomes: [
      'Optimized location strategy',
      'Maximum government benefits',
      'Regional market access',
      'Cost-effective operations'
    ],
    estimatedTime: '1 week',
    icon: MapPin
  },
  {
    code: 'P8',
    title: 'Investor-Ready Data Room',
    description: 'Professional due diligence preparation with templates and investor presentation materials.',
    price: 4999,
    features: [
      'Data room folder structure',
      'Document checklist by stage',
      'Financial model templates',
      'Legal document organization',
      'Red flag audit checklist',
      'Investor presentation deck',
      'Cap table management',
      'Term sheet comparison tool'
    ],
    outcomes: [
      'Investor-ready documentation',
      'Professional data room',
      'Clear cap table structure',
      'Faster due diligence process'
    ],
    estimatedTime: '1-2 weeks',
    icon: Database
  }
];

const allAccessBundle = {
  title: 'All-Access Bundle',
  description: 'Get all 8 products with 1-year access plus exclusive bonuses and priority support.',
  price: 19999,
  originalPrice: 32992, // Sum of all individual prices
  savings: 12993,
  features: [
    'All 8 products (P1-P8) included',
    'Exclusive bonus content & templates',
    'Priority email support',
    'Monthly group office hours',
    'Founder community access',
    'Quarterly content updates',
    'Mobile app access',
    '1-year validity'
  ],
  outcomes: [
    'Complete startup toolkit',
    'End-to-end guidance',
    'Maximum cost savings',
    'Ongoing support & updates'
  ]
};

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePurchase = async (productCode: string, amount: number) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsLoading(productCode);

    try {
      // Create order
      const orderResponse = await fetch('/api/purchase/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productType: productCode,
          amount: amount * 100 // Convert to paise
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId, amount: orderAmount, currency, productName } = await orderResponse.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency: currency,
        name: 'The Indian Startup',
        description: productName,
        order_id: orderId,
        handler: function (response: any) {
          // Verify payment
          fetch('/api/purchase/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          }).then(() => {
            router.push('/dashboard?purchase=success');
          });
        },
        prefill: {
          name: user.user_metadata?.name || '',
          email: user.email || '',
        },
        theme: {
          color: '#000000'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      logger.error('Purchase error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Heading as="h1" className="text-white mb-4">
              Choose Your Startup Journey
            </Heading>
            <Text size="xl" className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Buy individual products as you need them, or save 40% with our All-Access Bundle. 
              Each product gives you 1-year access to expert guidance, templates, and community support.
            </Text>
            
            {/* Free vs Paid */}
            <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <Heading as="h3" variant="h5" className="text-white mb-3">
                    Free Access
                  </Heading>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Personal dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Community access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Basic ecosystem directory
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Founder networking
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card className="bg-yellow-50 border-yellow-200">
                <div className="p-6">
                  <Heading as="h3" variant="h5" className="text-black mb-3">
                    Paid Products
                  </Heading>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Step-by-step playbooks (P1-P8)
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Professional templates & forms
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Expert guidance & frameworks
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Priority support & mentorship
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* All-Access Bundle */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge size="lg" className="mb-4">Most Popular Choice</Badge>
            <Heading as="h2" className="mb-4">All-Access Bundle</Heading>
            <Text size="lg" color="muted">Save ₹{allAccessBundle.savings.toLocaleString('en-IN')} and get everything you need</Text>
          </div>
          
          <Card className="border-4 border-black shadow-xl max-w-4xl mx-auto">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-4xl font-bold">₹{allAccessBundle.price.toLocaleString('en-IN')}</span>
                  <span className="text-xl text-gray-500 line-through">₹{allAccessBundle.originalPrice.toLocaleString('en-IN')}</span>
                  <Badge variant="default" size="lg">40% OFF</Badge>
                </div>
                <Text color="muted">{allAccessBundle.description}</Text>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Heading as="h4" variant="h6" className="mb-4">What's Included</Heading>
                  <ul className="space-y-2">
                    {allAccessBundle.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <Text size="sm">{feature}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <Heading as="h4" variant="h6" className="mb-4">You'll Achieve</Heading>
                  <ul className="space-y-2">
                    {allAccessBundle.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <Text size="sm">{outcome}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full md:w-auto px-12"
                  onClick={() => handlePurchase('ALL_ACCESS', allAccessBundle.price)}
                  disabled={isLoading === 'ALL_ACCESS'}
                >
                  {isLoading === 'ALL_ACCESS' ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Get All-Access Bundle
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Text size="xs" color="muted" className="mt-2">
                  One-time payment • 1-year access • Cancel anytime
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Individual Products */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Heading as="h2" className="mb-4">Individual Products</Heading>
            <Text size="lg" color="muted">
              Buy only what you need, when you need it. Each product is designed to solve specific startup challenges.
            </Text>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const IconComponent = product.icon;
              return (
                <Card 
                  key={product.code} 
                  className={`relative h-full ${product.popular ? 'border-2 border-black shadow-lg' : ''}`}
                >
                  {product.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="default">{product.badge}</Badge>
                    </div>
                  )}
                  
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <Text size="sm" color="muted">{product.code}</Text>
                        <Text weight="medium">{product.title}</Text>
                      </div>
                    </div>
                    
                    <Text size="sm" color="muted" className="mb-4 flex-grow">
                      {product.description}
                    </Text>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <Text size="sm" color="muted">{product.estimatedTime}</Text>
                      </div>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      
                      <Button 
                        variant={product.popular ? "primary" : "outline"} 
                        className="w-full"
                        onClick={() => handlePurchase(product.code, product.price)}
                        disabled={isLoading === product.code}
                      >
                        {isLoading === product.code ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Purchase {product.code}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Heading as="h2" className="mb-4">Frequently Asked Questions</Heading>
          </div>
          
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <Heading as="h4" variant="h6" className="mb-2">How long do I have access to the content?</Heading>
                <Text color="muted">
                  Each purchase gives you 1-year access to all content, templates, and community features. 
                  You can renew at a discount after expiry.
                </Text>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <Heading as="h4" variant="h6" className="mb-2">Can I upgrade to All-Access later?</Heading>
                <Text color="muted">
                  Yes! You can upgrade anytime and we'll credit the amount you've already paid towards the bundle price.
                </Text>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <Heading as="h4" variant="h6" className="mb-2">Do you offer refunds?</Heading>
                <Text color="muted">
                  We offer a 3-day money-back guarantee if you're not satisfied with the content quality.
                </Text>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <Heading as="h4" variant="h6" className="mb-2">Is the content updated regularly?</Heading>
                <Text color="muted">
                  Yes, we update content quarterly to reflect changes in Indian startup regulations and best practices.
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heading as="h2" className="text-white mb-4">
            Ready to Launch Your Startup?
          </Heading>
          <Text size="lg" className="text-gray-300 mb-8">
            Join hundreds of founders who have successfully launched their startups using our proven frameworks.
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => handlePurchase('P1', 999)}
              disabled={isLoading === 'P1'}
            >
              Start with P1 (₹999)
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={() => handlePurchase('ALL_ACCESS', allAccessBundle.price)}
              disabled={isLoading === 'ALL_ACCESS'}
            >
              Get All-Access Bundle
            </Button>
          </div>
          
          <Text size="sm" className="text-gray-400 mt-4">
            Not ready to purchase? <Link href="/community" className="text-white underline">Join our free community</Link>
          </Text>
        </div>
      </div>
    </div>
  );
}