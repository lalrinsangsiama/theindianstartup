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
  DollarSign,
  Building2,
  CreditCard,
  BarChart3,
  Briefcase,
  HandshakeIcon,
  Calculator,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Shield,
  PiggyBank,
  LineChart,
  Banknote,
  Globe
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
    id: 'funding-landscape',
    title: 'Funding Landscape & Strategy',
    description: 'Master the complete Indian funding ecosystem and build your strategic roadmap',
    days: 'Days 1-5',
    lessons: 5,
    icon: TrendingUp,
    color: 'bg-blue-500',
    xpReward: 500,
    topics: [
      'Funding ecosystem mapping',
      'Readiness assessment tools',
      'Strategic funding planning',
      'Dilution & cap table management',
      'Process timeline mastery'
    ]
  },
  {
    id: 'government-funding',
    title: 'Government Funding Ecosystem',
    description: 'Navigate ₹20L-₹5Cr government grants and schemes with proven frameworks',
    days: 'Days 6-10',
    lessons: 5,
    icon: Building2,
    color: 'bg-green-500',
    xpReward: 550,
    topics: [
      'Startup India Seed Fund',
      'SAMRIDH & MSME schemes',
      'State-wise funding programs',
      'Grant application mastery',
      'Compliance & utilization'
    ]
  },
  {
    id: 'incubator-funding',
    title: 'Incubator & Accelerator Funding',
    description: 'Access seed grants and support through India\'s top incubation programs',
    days: 'Days 11-15',
    lessons: 5,
    icon: Shield,
    color: 'bg-purple-500',
    xpReward: 600,
    topics: [
      'IIT/IIM incubator access',
      'Corporate accelerators',
      'Equity vs grant models',
      'Selection strategies',
      'Network maximization'
    ]
  },
  {
    id: 'debt-funding',
    title: 'Debt Funding Mastery',
    description: 'Master bank loans, NBFCs, and venture debt worth ₹10L-₹10Cr',
    days: 'Days 16-22',
    lessons: 7,
    icon: CreditCard,
    color: 'bg-red-500',
    xpReward: 910,
    topics: [
      'Bank lending landscape',
      'MUDRA & CGTMSE loans',
      'Digital lenders & NBFCs',
      'Working capital management',
      'Venture debt strategies',
      'Credit score optimization'
    ]
  },
  {
    id: 'angel-investment',
    title: 'Angel Investment Deep Dive',
    description: 'Raise ₹25L-₹2Cr from angel investors with proven playbooks',
    days: 'Days 23-28',
    lessons: 6,
    icon: Users,
    color: 'bg-indigo-500',
    xpReward: 840,
    topics: [
      'Angel psychology mastery',
      'IAN & Mumbai Angels',
      'Pitch deck optimization',
      'Valuation negotiation',
      'Term sheet essentials',
      'Portfolio management'
    ]
  },
  {
    id: 'venture-capital',
    title: 'Venture Capital Mastery',
    description: 'Navigate Series A-D funding from top VCs (₹10Cr-₹500Cr)',
    days: 'Days 29-35',
    lessons: 7,
    icon: LineChart,
    color: 'bg-yellow-500',
    xpReward: 1050,
    topics: [
      'VC ecosystem mapping',
      'Series A readiness',
      'Growth round strategies',
      'Due diligence preparation',
      'Top Indian VCs',
      'International investors'
    ]
  },
  {
    id: 'advanced-instruments',
    title: 'Advanced Funding Instruments',
    description: 'Master convertible notes, SAFE, revenue financing, and strategic investments',
    days: 'Days 36-40',
    lessons: 5,
    icon: Briefcase,
    color: 'bg-orange-500',
    xpReward: 800,
    topics: [
      'Convertible notes structure',
      'SAFE & CCPS in India',
      'Revenue-based financing',
      'Crowdfunding strategies',
      'Strategic partnerships'
    ]
  },
  {
    id: 'negotiation-closing',
    title: 'Negotiation & Deal Closing',
    description: 'Master term sheets, legal docs, and close deals like a pro',
    days: 'Days 41-45',
    lessons: 5,
    icon: HandshakeIcon,
    color: 'bg-pink-500',
    xpReward: 850,
    topics: [
      'Term sheet mastery',
      'Negotiation tactics',
      'Legal documentation',
      'RBI compliance',
      'Post-funding management'
    ]
  },
  {
    id: 'international-funding',
    title: 'International Funding',
    description: 'Advanced strategies for cross-border funding and structures',
    days: 'Days 46-50',
    lessons: 5,
    icon: Globe,
    color: 'bg-teal-500',
    xpReward: 900,
    topics: [
      'Singapore holding structures',
      'Delaware flip strategies',
      'Cross-border taxation',
      'Currency hedging',
      'Regulatory arbitrage'
    ]
  },
  {
    id: 'distressed-funding',
    title: 'Distressed Funding',
    description: 'Navigate down rounds, restructuring, and turnaround capital',
    days: 'Days 51-55',
    lessons: 5,
    icon: PiggyBank,
    color: 'bg-gray-500',
    xpReward: 850,
    topics: [
      'Down round management',
      'Bridge funding tactics',
      'Debt restructuring',
      'Asset optimization',
      'Turnaround strategies'
    ]
  },
  {
    id: 'exit-strategies',
    title: 'Exit Strategies',
    description: 'Master secondary sales, M&A, and IPO preparation',
    days: 'Days 56-60',
    lessons: 5,
    icon: Banknote,
    color: 'bg-emerald-500',
    xpReward: 950,
    topics: [
      'Secondary sale planning',
      'Strategic exit routes',
      'Financial buyer exits',
      'IPO readiness',
      'Valuation maximization'
    ]
  },
  {
    id: 'sector-specific',
    title: 'Sector-Specific Funding',
    description: 'Specialized strategies for B2B SaaS, FinTech, DeepTech, and more',
    days: 'Days 46-60',
    lessons: 5,
    icon: BarChart3,
    color: 'bg-violet-500',
    xpReward: 850,
    topics: [
      'B2B SaaS metrics',
      'Consumer tech funding',
      'DeepTech capital',
      'FinTech regulations',
      'HealthTech opportunities'
    ]
  }
];

interface FinancialMetric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const financialMetrics: FinancialMetric[] = [
  {
    label: 'Total Funding Coverage',
    value: '₹5L - ₹500Cr',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    label: 'Funding Sources',
    value: '100+ Options',
    icon: Building2,
    color: 'text-blue-600'
  },
  {
    label: 'Success Rate',
    value: '3x Higher',
    icon: TrendingUp,
    color: 'text-purple-600'
  },
  {
    label: 'Templates & Tools',
    value: '200+ Items',
    icon: FileText,
    color: 'text-orange-600'
  }
];

interface ProductData {
  hasAccess: boolean;
  product: {
    code: string;
    title: string;
    description: string;
  };
  modules: {
    id: string;
    title: string;
    description: string;
    orderIndex: number;
    progress: number;
    completedLessons: number;
    totalLessons: number;
    lessons: {
      id: string;
      day: number;
      title: string;
      briefContent: string;
      estimatedTime: number;
      xpReward: number;
      orderIndex: number;
      completed: boolean;
      isLocked: boolean;
    }[];
  }[];
  totalModules: number;
  totalLessons: number;
}

export default function FundingMasteryPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const response = await fetch('/api/products/P3/modules');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch modules');
        }
        
        setProductData(data);
      } catch (err) {
        logger.error('Error fetching modules:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course data');
        
        // Fallback to basic structure for display
        setProductData({
          hasAccess: false,
          product: {
            code: 'P3',
            title: 'Funding in India - Complete Mastery',
            description: 'Master the Indian funding ecosystem from government grants to venture capital'
          },
          modules: [],
          totalModules: 12,
          totalLessons: 60
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Calculate total progress
  const calculateOverallProgress = () => {
    if (!productData || productData.modules.length === 0) return 0;
    
    const totalProgress = productData.modules.reduce((sum, module) => sum + module.progress, 0);
    return Math.round(totalProgress / productData.modules.length);
  };

  const calculateTotalXP = () => {
    if (!productData) return 0;
    
    return productData.modules.reduce((sum, module) => {
      return sum + module.lessons.reduce((lessonSum, lesson) => {
        return lessonSum + (lesson.completed ? lesson.xpReward : 0);
      }, 0);
    }, 0);
  };

  const calculateTotalCompleted = () => {
    if (!productData) return 0;
    
    return productData.modules.reduce((sum, module) => {
      return sum + module.lessons.filter(lesson => lesson.completed).length;
    }, 0);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleStartModule = (moduleId: string) => {
    if (!productData) return;

    // Find the module and its first lesson
    const targetModule = productData.modules.find(m => m.id === moduleId);
    if (targetModule && targetModule.lessons.length > 0) {
      const firstLesson = targetModule.lessons.sort((a, b) => a.orderIndex - b.orderIndex)[0];
      // Navigate to lesson page
      router.push(`/funding-mastery/lessons/${firstLesson.id}`);
    }
  };

  return (
    <ProductProtectedRoute productCode="P3">
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">45-Day Intensive</Badge>
              <Badge variant="outline">{productData?.totalModules || 12} Modules</Badge>
              <Badge variant="default">₹5,999</Badge>
            </div>
            <Heading as="h1" className="mb-4">
              {productData?.product.title || 'Funding in India - Complete Mastery'}
            </Heading>
            <Text size="lg" color="muted" className="mb-6 max-w-3xl">
              {productData?.product.description || 'Master the Indian funding ecosystem from government grants to venture capital. Access ₹5L to ₹500Cr through 100+ funding sources with proven frameworks, 200+ templates, and expert guidance.'}
            </Text>

            {/* Error Display */}
            {error && (
              <Alert variant="warning" className="mb-6">
                {error}
              </Alert>
            )}

            {/* Financial Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {financialMetrics.map((metric, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text size="sm" color="muted">{metric.label}</Text>
                      <Text size="lg" weight="bold" className={metric.color}>
                        {metric.value}
                      </Text>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </Card>
              ))}
            </div>

            {/* Progress Overview */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Heading as="h3" variant="h6" className="mb-1">
                    Your Funding Journey Progress
                  </Heading>
                  <Text color="muted">
                    {calculateTotalCompleted()} of {productData?.totalLessons || 0} lessons completed • {Math.round(calculateTotalXP())} XP earned
                  </Text>
                </div>
                <div className="text-right">
                  <Text size="xl" weight="bold">{calculateOverallProgress()}%</Text>
                  <Text size="sm" color="muted">Complete</Text>
                </div>
              </div>
              <ProgressBar value={calculateOverallProgress()} className="mb-4" />
              
              {calculateOverallProgress() === 0 && productData?.modules && productData.modules.length > 0 && (
                <Alert variant="info" className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text weight="medium">Ready to master funding?</Text>
                      <Text size="sm" color="muted">
                        Start with the first module to understand the complete funding landscape
                      </Text>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartModule(productData?.modules?.[0]?.id || '')}
                      disabled={isLoading}
                    >
                      Start Learning
                    </Button>
                  </div>
                </Alert>
              )}
            </Card>

            {/* Key Outcomes */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-green-50 to-blue-50">
              <Heading as="h3" variant="h6" className="mb-4">
                What You'll Achieve
              </Heading>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Active funding pipeline with 10+ applications submitted</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Government grant applications worth ₹50L-₹5Cr in process</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Angel investor meetings scheduled with warm intros</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Professional pitch deck and financial models ready</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Term sheet negotiation skills with legal frameworks</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Due diligence data room prepared and organized</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Clear 18-month funding roadmap aligned with growth</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Access to 200+ templates, tools, and calculators</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Exclusive investor database with 37+ verified contacts</Text>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Module Grid */}
          <div className="space-y-4">
            <Heading as="h2" variant="h5" className="mb-4">
              Course Modules
            </Heading>
            
            {productData?.modules && productData.modules.length > 0 ? (
              productData.modules.map((module, index) => {
                const isExpanded = expandedModule === module.id;
                const progressPercentage = module.progress;
                const isLocked = index > 0 && productData.modules[index - 1].progress < 100;
                const totalXP = module.lessons.reduce((sum, lesson) => sum + lesson.xpReward, 0);
                
                return (
                  <Card key={module.id} className={`transition-all ${isExpanded ? 'shadow-lg' : ''}`}>
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Heading as="h4" variant="h6">{module.title}</Heading>
                              {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                              <Badge variant="outline" size="sm">{module.totalLessons} lessons</Badge>
                              <Badge variant="outline" size="sm">{totalXP} XP</Badge>
                            </div>
                            <Text color="muted" size="sm" className="mb-3">
                              {module.description}
                            </Text>
                            <div className="flex items-center gap-4">
                              <Text size="sm">
                                {module.completedLessons}/{module.totalLessons} lessons
                              </Text>
                              <ProgressBar 
                                value={progressPercentage} 
                                className="w-32" 
                                size="sm"
                              />
                              <Text size="sm" color="muted">
                                {progressPercentage}%
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {progressPercentage === 100 && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t">
                        <div className="pt-4">
                          <Text weight="medium" className="mb-3">Module lessons:</Text>
                          <div className="space-y-2 mb-4">
                            {module.lessons.slice(0, 5).map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full ${lesson.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                                <Text size="sm">{lesson.title}</Text>
                                {lesson.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                              </div>
                            ))}
                            {module.lessons.length > 5 && (
                              <Text size="sm" color="muted">
                                +{module.lessons.length - 5} more lessons...
                              </Text>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartModule(module.id);
                              }}
                              disabled={isLocked}
                              size="sm"
                            >
                              {progressPercentage > 0 ? 'Continue' : 'Start'} Module
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            {isLocked && (
                              <Text size="sm" color="muted">
                                Complete previous module to unlock
                              </Text>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })
            ) : (
              <Card className="p-8 text-center">
                <Text color="muted">
                  {error ? 'Unable to load course modules. Please try again later.' : 'Loading course modules...'}
                </Text>
              </Card>
            )}
          </div>

          {/* Special Features */}
          <Card className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50">
            <Heading as="h3" variant="h5" className="mb-4">
              Special Features Included
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  <Text weight="medium">Financial Tools</Text>
                </div>
                <Text size="sm" color="muted">
                  Valuation calculator, dilution modeler, term sheet generator, 
                  and ROI calculators for data-driven decisions
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <Text weight="medium">Expert Sessions</Text>
                </div>
                <Text size="sm" color="muted">
                  VC partner interviews, angel investor panels, banker sessions, 
                  and founder case studies
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <Text weight="medium">Sector Tracks</Text>
                </div>
                <Text size="sm" color="muted">
                  Specialized paths for B2B SaaS, Consumer Tech, DeepTech, 
                  FinTech, and HealthTech funding
                </Text>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="inline-block p-8">
              <Heading as="h3" variant="h5" className="mb-2">
                Ready to Master Funding?
              </Heading>
              <Text color="muted" className="mb-6">
                Master the complete Indian funding ecosystem with our step-by-step guide
              </Text>
              <Button 
                size="lg"
                onClick={() => productData?.modules && productData.modules.length > 0 && handleStartModule(productData.modules[0].id)}
                disabled={isLoading || !productData?.modules?.length}
              >
                Start Your Funding Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}