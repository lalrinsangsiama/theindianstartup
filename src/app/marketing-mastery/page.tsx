'use client';

import React, { useState, useEffect } from 'react';
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
    id: 'foundations',
    title: 'Marketing Foundations & Strategy',
    description: 'Master modern marketing fundamentals, customer understanding, and strategic framework development',
    days: 'Days 1-4',
    lessons: 4,
    icon: Target,
    color: 'bg-blue-500',
    xpReward: 600,
    topics: [
      'Marketing vs Sales vs Branding distinction',
      'Customer journey mapping (AAARRR)',
      'Performance vs Brand marketing balance',
      'Marketing metrics & KPIs mastery'
    ]
  },
  {
    id: 'digital-fundamentals',
    title: 'Digital Marketing Fundamentals',
    description: 'Master SEO, PPC, social media, and content marketing for maximum online presence',
    days: 'Days 5-10',
    lessons: 6,
    icon: Globe,
    color: 'bg-green-500',
    xpReward: 900,
    topics: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click Advertising (PPC)',
      'Social media marketing strategies',
      'Content marketing frameworks'
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
        // This would be replaced with actual API call
        setProgress({
          totalLessons: 60,
          completedLessons: 0,
          currentDay: 1,
          totalXP: 0,
          badges: [],
          moduleProgress: {}
        });
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const startModule = (moduleId: string) => {
    // This would navigate to the first lesson of the module
    console.log(`Starting module: ${moduleId}`);
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
              Transform into a data-driven marketing machine generating predictable customer acquisition, 
              retention, and growth with measurable ROI. Master all marketing channels from SEO to AI, 
              build complete marketing systems, and create predictable growth engines that scale.
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
              <Heading as="h2" variant="h4" className="mb-4">What You&apos;ll Achieve</Heading>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Heading as="h3" variant="h6" className="mb-3">Marketing Infrastructure</Heading>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Complete marketing technology stack setup</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Advanced analytics & attribution systems</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Marketing automation workflows</Text>
                    </li>
                  </ul>
                </div>
                <div>
                  <Heading as="h3" variant="h6" className="mb-3">Growth & Results</Heading>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Predictable customer acquisition engine</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Measurable ROI on all marketing campaigns</Text>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Scalable growth systems & processes</Text>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Course Modules */}
          <div className="space-y-4">
            <Heading as="h2" variant="h4" className="mb-6">Course Modules</Heading>
            {modules.map((module, index) => {
              const isExpanded = expandedModules.includes(module.id);
              const moduleProgress = progress?.moduleProgress[module.id] || 0;
              
              return (
                <Card key={module.id} className="overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${module.color} text-white`}>
                          <module.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <Heading as="h3" variant="h6">{module.title}</Heading>
                            <Badge variant="outline" size="sm">{module.days}</Badge>
                            <Badge variant="default" size="sm">{module.lessons} Lessons</Badge>
                          </div>
                          <Text color="muted">{module.description}</Text>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Text size="sm" color="muted">+{module.xpReward} XP</Text>
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
                            {module.topics.map((topic, topicIndex) => (
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
                                onClick={() => startModule(module.id)} 
                                className="w-full"
                              >
                                Continue Module <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            ) : (
                              <Button 
                                onClick={() => startModule(module.id)} 
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