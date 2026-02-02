'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Alert } from '@/components/ui/Alert';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  TrendingUp, 
  CheckCircle, 
  Lock, 
  Clock, 
  Target,
  FileText,
  Users,
  BarChart,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  MousePointer,
  Mail,
  Smartphone,
  Globe,
  Zap,
  DollarSign
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  days: string;
  lessons: number;
  icon: React.ElementType;
  color: string;
  xpReward: number;
  topics: string[];
}

const modules: Module[] = [
  {
    id: 'p12_mod_1',
    title: 'Strategic Marketing Foundation & Executive Leadership',
    description: 'Master strategic marketing thinking with frameworks from Flipkart CEO. Build marketing vision, goal-setting systems, and resource optimization for 10x growth.',
    days: 'Days 1-5',
    lessons: 5,
    icon: Target,
    color: 'bg-blue-500',
    xpReward: 750,
    topics: [
      'Marketing Strategy Evolution - From Startup to ₹1000Cr (Flipkart CEO)',
      'Digital-First Marketing - Building India\'s Largest Tech Brands',
      'Marketing Goal Setting & OKR Framework Mastery',
      'Marketing Budget Optimization & ROI Maximization',
      'Competitive Analysis & Market Positioning Excellence'
    ]
  },
  {
    id: 'p12_mod_2',
    title: 'Digital Marketing Excellence - Multi-Channel Mastery',
    description: 'Complete digital ecosystem mastery with Zomato CMO insights. Performance marketing, SEO dominance, and PPC optimization generating ₹100Cr+ revenue.',
    days: 'Days 6-10',
    lessons: 5,
    icon: Globe,
    color: 'bg-green-500',
    xpReward: 900,
    topics: [
      'Performance Marketing at Scale - ₹100Cr+ Ad Spend (Zomato CEO)',
      'Search Marketing Supremacy - Dominating Google (Paytm CMO)',
      'Social Media Advertising & Paid Social Mastery',
      'Marketing Analytics & Data-Driven Optimization',
      'Conversion Rate Optimization & A/B Testing Mastery'
    ]
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Rate Optimization',
    description: 'Optimize every touchpoint for maximum conversion and customer acquisition',
    days: 'Days 11-15',
    lessons: 5,
    icon: MousePointer,
    color: 'bg-purple-500',
    xpReward: 750,
    topics: [
      'Landing page optimization',
      'A/B testing methodologies',
      'User experience optimization',
      'Funnel analysis & improvement'
    ]
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing & Automation',
    description: 'Build sophisticated email campaigns and marketing automation systems',
    days: 'Days 16-20',
    lessons: 5,
    icon: Mail,
    color: 'bg-red-500',
    xpReward: 750,
    topics: [
      'Email campaign creation & design',
      'Marketing automation workflows',
      'Segmentation & personalization',
      'Email deliverability & compliance'
    ]
  },
  {
    id: 'mobile-marketing',
    title: 'Mobile Marketing & App Growth',
    description: 'Master mobile-first marketing strategies and app user acquisition',
    days: 'Days 21-25',
    lessons: 5,
    icon: Smartphone,
    color: 'bg-indigo-500',
    xpReward: 750,
    topics: [
      'Mobile app marketing strategies',
      'Push notification campaigns',
      'In-app marketing optimization',
      'Mobile attribution & analytics'
    ]
  },
  {
    id: 'analytics-attribution',
    title: 'Analytics & Attribution',
    description: 'Master data analysis, attribution modeling, and performance measurement',
    days: 'Days 26-30',
    lessons: 5,
    icon: BarChart,
    color: 'bg-yellow-500',
    xpReward: 750,
    topics: [
      'Google Analytics 4 mastery',
      'Attribution modeling & analysis',
      'Customer journey tracking',
      'Marketing ROI measurement'
    ]
  },
  {
    id: 'marketing-automation',
    title: 'Marketing Automation & Tech Stack',
    description: 'Build sophisticated marketing technology infrastructure and automation',
    days: 'Days 31-35',
    lessons: 5,
    icon: Zap,
    color: 'bg-orange-500',
    xpReward: 750,
    topics: [
      'Marketing technology stack setup',
      'CRM integration & optimization',
      'Lead scoring & nurturing',
      'Marketing & sales alignment'
    ]
  },
  {
    id: 'growth-hacking',
    title: 'Growth Hacking & Experimentation',
    description: 'Advanced growth strategies, viral loops, and rapid experimentation',
    days: 'Days 36-40',
    lessons: 5,
    icon: TrendingUp,
    color: 'bg-pink-500',
    xpReward: 750,
    topics: [
      'Growth hacking methodologies',
      'Viral marketing strategies',
      'Product-led growth tactics',
      'Rapid experimentation frameworks'
    ]
  },
  {
    id: 'b2b-marketing',
    title: 'B2B Marketing Mastery',
    description: 'Master business-to-business marketing, lead generation, and enterprise sales support',
    days: 'Days 41-45',
    lessons: 5,
    icon: Users,
    color: 'bg-gray-600',
    xpReward: 750,
    topics: [
      'B2B marketing strategies',
      'Account-based marketing (ABM)',
      'Lead generation & qualification',
      'Sales enablement & support'
    ]
  },
  {
    id: 'ecommerce-marketing',
    title: 'E-commerce Marketing',
    description: 'Specialized strategies for online retail, marketplace optimization, and customer retention',
    days: 'Days 46-50',
    lessons: 5,
    icon: DollarSign,
    color: 'bg-emerald-500',
    xpReward: 750,
    topics: [
      'E-commerce marketing strategies',
      'Marketplace optimization (Amazon, Flipkart)',
      'Customer retention & loyalty programs',
      'Shopping campaign optimization'
    ]
  },
  {
    id: 'international-marketing',
    title: 'International Marketing',
    description: 'Global marketing strategies, localization, and international expansion',
    days: 'Days 51-55',
    lessons: 5,
    icon: Globe,
    color: 'bg-cyan-500',
    xpReward: 750,
    topics: [
      'International marketing strategies',
      'Localization & cultural adaptation',
      'Global campaign management',
      'Cross-border marketing compliance'
    ]
  },
  {
    id: 'advanced-strategies',
    title: 'Advanced Marketing Strategies',
    description: 'Cutting-edge marketing techniques, AI integration, and future-proofing strategies',
    days: 'Days 56-60',
    lessons: 5,
    icon: Zap,
    color: 'bg-violet-500',
    xpReward: 750,
    topics: [
      'AI-powered marketing strategies',
      'Predictive analytics & modeling',
      'Marketing innovation & trends',
      'Future-proofing marketing systems'
    ]
  }
];

interface ProgressData {
  totalLessons: number;
  completedLessons: number;
  currentDay: number;
  totalXP: number;
  badges: string[];
  moduleProgress: Record<string, number>;
}

export default function MarketingMasteryPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Fetch actual P12 progress from backend
        const response = await fetch('/api/products/p12/progress', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setProgress(data);
        } else {
          // Default progress if API fails
          setProgress({
            totalLessons: 60,
            completedLessons: 0,
            currentDay: 1,
            totalXP: 0,
            badges: [],
            moduleProgress: {}
          });
        }
      } catch (error) {
        logger.error('Failed to fetch P12 progress:', error);
        // Default progress on error
        setProgress({
          totalLessons: 60,
          completedLessons: 0,
          currentDay: 1,
          totalXP: 0,
          badges: [],
          moduleProgress: {}
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProgress();
    }
  }, [user]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const startModule = (moduleId: string) => {
    // Navigate to the first lesson of the P12 module
    logger.info(`Starting P12 module: ${moduleId}`);
    
    // Find the module to get the day range
    const foundModule = modules.find(m => m.id === moduleId);
    if (foundModule) {
      // Extract first day from the days string (e.g., "Days 1-5" -> 1)
      const firstDay = parseInt(foundModule.days.split(' ')[1].split('-')[0]);
      router.push(`/products/p12/lessons/${firstDay}`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      </DashboardLayout>
    );
  }

  const progressPercentage = progress ? (progress.completedLessons / progress.totalLessons) * 100 : 0;

  return (
    <ProductProtectedRoute productCode="P12">
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">60-Day Program</Badge>
              <Badge variant="outline">12 Modules</Badge>
              <Badge variant="default">₹9,999</Badge>
            </div>
            <Heading as="h1" className="mb-4">
              Marketing Mastery - Complete Growth Engine
            </Heading>
            <Text size="lg" color="muted" className="max-w-3xl">
              Build a data-driven marketing machine generating predictable growth across all channels with expert guidance 
              from Flipkart, Zomato, and Nykaa leadership teams. Master 500+ marketing templates (Worth ₹5,00,000+), 
              50+ hours of expert masterclasses, and get triple industry certification with 1,500x ROI potential.
            </Text>
          </div>

          {/* Progress Overview */}
          {progress && (
            <Card className="mb-8">
              <div className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <Text size="sm" color="muted" className="mb-1">Progress</Text>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={progressPercentage} className="flex-1" />
                      <Text size="sm" weight="medium">{Math.round(progressPercentage)}%</Text>
                    </div>
                  </div>
                  <div>
                    <Text size="sm" color="muted" className="mb-1">Current Day</Text>
                    <Text size="lg" weight="bold">Day {progress.currentDay}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="muted" className="mb-1">XP Earned</Text>
                    <Text size="lg" weight="bold">{progress.totalXP.toLocaleString()}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="muted" className="mb-1">Badges</Text>
                    <Text size="lg" weight="bold">{progress.badges.length}</Text>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Key Outcomes */}
          <Card className="mb-8">
            <div className="p-6">
              <Heading as="h2" variant="h4" className="mb-4">What You'll Achieve</Heading>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Heading as="h3" variant="h6" className="mb-3">Expert-Led Marketing Mastery</Heading>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">500+ Marketing Templates (Worth ₹5,00,000+)</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">50+ Hours Expert Masterclasses from Unicorn CEOs</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Triple Industry Certification & Recognition</Text>
                    </li>
                  </ul>
                </div>
                <div>
                  <Heading as="h3" variant="h6" className="mb-3">Growth & Career Impact</Heading>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">1,500x Return on Investment Potential</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">50-300% Salary Increase Capability</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Complete Marketing Technology Stack Mastery</Text>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Course Modules */}
          <div className="space-y-4">
            <Heading as="h2" variant="h4" className="mb-6">Course Modules</Heading>
            {modules.map((courseModule, index) => {
              const isExpanded = expandedModules.includes(courseModule.id);
              const moduleProgress = progress?.moduleProgress[courseModule.id] || 0;
              
              return (
                <Card key={courseModule.id} className="overflow-hidden">
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule(courseModule.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${courseModule.color} text-white`}>
                          <courseModule.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <Heading as="h3" variant="h6">{courseModule.title}</Heading>
                            <Badge variant="outline" size="sm">{courseModule.days}</Badge>
                            <Badge variant="default" size="sm">{courseModule.lessons} Lessons</Badge>
                          </div>
                          <Text color="muted">{courseModule.description}</Text>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Text size="sm" color="muted">+{courseModule.xpReward} XP</Text>
                          {moduleProgress > 0 && (
                            <Text size="sm" weight="medium">{Math.round(moduleProgress)}% Complete</Text>
                          )}
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Heading as="h4" variant="h6" className="mb-3">Topics Covered</Heading>
                          <ul className="space-y-2">
                            {courseModule.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <Text size="sm">{topic}</Text>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col justify-end">
                          <div className="space-y-3">
                            {moduleProgress > 0 ? (
                              <Button 
                                onClick={() => startModule(courseModule.id)}
                                className="w-full"
                              >
                                Continue Module <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            ) : (
                              <Button
                                onClick={() => startModule(courseModule.id)} 
                                variant="outline"
                                className="w-full"
                              >
                                Start Module <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <Card className="mt-8">
            <div className="p-6 text-center">
              <Heading as="h3" variant="h5" className="mb-2">Ready to Build Your Marketing Engine?</Heading>
              <Text color="muted" className="mb-4">
                Start with Module 1 and transform your marketing from guesswork to predictable growth machine.
              </Text>
              <Button size="lg" onClick={() => startModule('foundations')}>
                Start Your Marketing Journey <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}