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
  DollarSign, 
  CheckCircle, 
  Lock, 
  Clock, 
  Target,
  FileText,
  Building,
  BarChart3,
  Shield,
  Calculator,
  Briefcase,
  Users,
  TrendingUp,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Receipt,
  PieChart,
  Laptop,
  Globe,
  Zap
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
    id: 'financial-foundations',
    title: 'Financial Foundations & Strategy',
    description: 'Build the backbone of your startup\'s financial infrastructure',
    days: 'Days 1-5',
    lessons: 5,
    icon: Building,
    color: 'bg-blue-500',
    xpReward: 600,
    topics: [
      'Finance as competitive advantage',
      'Three pillars of finance architecture',
      'Chart of accounts mastery',
      'Accounting policies framework',
      'Financial systems design'
    ]
  },
  {
    id: 'accounting-systems',
    title: 'Accounting Systems Setup',
    description: 'Implement professional accounting systems from day one',
    days: 'Days 6-10',
    lessons: 5,
    icon: Calculator,
    color: 'bg-green-500',
    xpReward: 650,
    topics: [
      'Software selection framework',
      'Implementation roadmap',
      'Transaction processing SOPs',
      'Month-end closing mastery',
      'Internal controls setup'
    ]
  },
  {
    id: 'gst-compliance',
    title: 'GST Compliance Mastery',
    description: 'Master GST compliance with e-invoicing and ITC optimization',
    days: 'Days 11-16',
    lessons: 6,
    icon: Receipt,
    color: 'bg-purple-500',
    xpReward: 900,
    topics: [
      'GST fundamentals & structure',
      'Monthly compliance cycle',
      'E-invoicing implementation',
      'E-way bill management',
      'ITC optimization strategies',
      'GST audit preparation'
    ]
  },
  {
    id: 'corporate-compliance',
    title: 'Corporate Compliance',
    description: 'Ensure complete regulatory compliance across MCA, tax, and secretarial',
    days: 'Days 17-21',
    lessons: 5,
    icon: Shield,
    color: 'bg-red-500',
    xpReward: 750,
    topics: [
      'MCA compliance framework',
      'Board governance setup',
      'Statutory audit management',
      'Secretarial compliance',
      'Income tax strategies'
    ]
  },
  {
    id: 'financial-planning',
    title: 'Financial Planning & Analysis',
    description: 'Build dynamic models and real-time management reporting',
    days: 'Days 22-27',
    lessons: 6,
    icon: BarChart3,
    color: 'bg-indigo-500',
    xpReward: 900,
    topics: [
      'Dynamic financial modeling',
      'Revenue forecasting methods',
      'Cost optimization framework',
      'Working capital management',
      'Cash flow forecasting',
      'Management dashboards'
    ]
  },
  {
    id: 'investor-finance',
    title: 'Investor-Ready Finance',
    description: 'Create investor-grade reporting and due diligence readiness',
    days: 'Days 28-33',
    lessons: 6,
    icon: TrendingUp,
    color: 'bg-yellow-500',
    xpReward: 900,
    topics: [
      'Investor reporting standards',
      'Due diligence preparation',
      'Valuation frameworks',
      'Cap table management',
      'Financial controls for scale',
      'IPO readiness basics'
    ]
  },
  {
    id: 'banking-treasury',
    title: 'Banking & Treasury',
    description: 'Optimize banking relationships and treasury operations',
    days: 'Days 34-37',
    lessons: 4,
    icon: Briefcase,
    color: 'bg-orange-500',
    xpReward: 600,
    topics: [
      'Banking relationship management',
      'Payment systems & controls',
      'Foreign exchange management',
      'Investment & surplus management'
    ]
  },
  {
    id: 'advanced-management',
    title: 'Advanced Financial Management',
    description: 'Master risk management, M&A finance, and international operations',
    days: 'Days 38-42',
    lessons: 5,
    icon: Globe,
    color: 'bg-pink-500',
    xpReward: 750,
    topics: [
      'Financial risk management',
      'Performance analytics',
      'M&A financial integration',
      'International operations',
      'Finance transformation'
    ]
  },
  {
    id: 'team-operations',
    title: 'Team Building & Operations',
    description: 'Build and scale your world-class finance team',
    days: 'Days 43-45',
    lessons: 3,
    icon: Users,
    color: 'bg-teal-500',
    xpReward: 450,
    topics: [
      'Finance team structure',
      'Operations excellence',
      'Strategic partnerships'
    ]
  },
  {
    id: 'cfo-toolkit',
    title: 'CFO Strategic Toolkit',
    description: 'Advanced strategic finance and leadership skills',
    days: 'Days 46-50',
    lessons: 5,
    icon: Zap,
    color: 'bg-gray-600',
    xpReward: 800,
    topics: [
      'Strategic planning process',
      'Business partnering',
      'Board engagement',
      'Crisis management',
      'Leadership development'
    ]
  },
  {
    id: 'tax-strategies',
    title: 'Advanced Tax Strategies',
    description: 'Optimize tax structures and international planning',
    days: 'Days 51-55',
    lessons: 5,
    icon: PieChart,
    color: 'bg-emerald-500',
    xpReward: 800,
    topics: [
      'Tax structure optimization',
      'International tax planning',
      'M&A tax strategies',
      'R&D and state incentives',
      'Advance rulings & treaties'
    ]
  },
  {
    id: 'fintech-innovation',
    title: 'Financial Technology',
    description: 'Leverage technology for finance transformation',
    days: 'Days 56-60',
    lessons: 5,
    icon: Laptop,
    color: 'bg-violet-500',
    xpReward: 800,
    topics: [
      'ERP selection & implementation',
      'Data analytics & AI',
      'Blockchain applications',
      'API ecosystem design',
      'Future tech roadmap'
    ]
  }
];

interface FinanceMetric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const financeMetrics: FinanceMetric[] = [
  {
    label: 'Templates & Tools',
    value: '250+ Items',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    label: 'Compliance Coverage',
    value: '100% Complete',
    icon: Shield,
    color: 'text-green-600'
  },
  {
    label: 'Time to Finance Excellence',
    value: '45 Days',
    icon: Clock,
    color: 'text-purple-600'
  },
  {
    label: 'ROI on Course',
    value: '10x+ Returns',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
];

export default function FinanceMasteryPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total progress
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons, 0);
  const totalCompleted = Object.values(completedLessons).reduce((sum, count) => sum + count, 0);
  const overallProgress = Math.round((totalCompleted / totalLessons) * 100);
  const totalXP = modules.reduce((sum, module, index) => {
    const completed = completedLessons[module.id] || 0;
    return sum + (completed / module.lessons) * module.xpReward;
  }, 0);

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleStartModule = (moduleId: string) => {
    setIsLoading(true);
    // Simulate navigation to module content
    setTimeout(() => {
      router.push(`/finance-mastery/${moduleId}`);
    }, 500);
  };

  return (
    <ProductProtectedRoute productCode="P4">
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">45-Day Intensive</Badge>
              <Badge variant="outline">12 Modules</Badge>
              <Badge variant="default">₹6,999</Badge>
            </div>
            <Heading as="h1" className="mb-4">
              Finance Stack - CFO-Level Mastery
            </Heading>
            <Text size="lg" color="muted" className="mb-6 max-w-3xl">
              Build world-class financial infrastructure that scales from startup to IPO. 
              Master accounting systems, GST compliance, investor reporting, and strategic 
              finance with 250+ templates and real-world implementation.
            </Text>

            {/* Finance Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {financeMetrics.map((metric, index) => (
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
                    Your Finance Mastery Progress
                  </Heading>
                  <Text color="muted">
                    {totalCompleted} of {totalLessons} lessons completed • {Math.round(totalXP)} XP earned
                  </Text>
                </div>
                <div className="text-right">
                  <Text size="xl" weight="bold">{overallProgress}%</Text>
                  <Text size="sm" color="muted">Complete</Text>
                </div>
              </div>
              <ProgressBar value={overallProgress} className="mb-4" />
              
              {overallProgress === 0 && (
                <Alert variant="info" className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text weight="medium">Ready to build world-class finance?</Text>
                      <Text size="sm" color="muted">
                        Start with Module 1 to lay the financial foundations
                      </Text>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartModule('financial-foundations')}
                      disabled={isLoading}
                    >
                      Start Learning
                    </Button>
                  </div>
                </Alert>
              )}
            </Card>

            {/* Key Outcomes */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-green-50">
              <Heading as="h3" variant="h6" className="mb-4">
                What You'll Achieve
              </Heading>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Professional accounting system with real-time dashboards</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Complete GST compliance with e-invoicing and ITC optimization</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">MCA, tax, and secretarial compliance frameworks</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Dynamic financial models and FP&A capabilities</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Investor-grade reporting and due diligence readiness</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Banking and treasury optimization strategies</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">CFO-level strategic finance capabilities</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Finance team structure and operations excellence</Text>
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
            
            {modules.map((module, index) => {
              const isExpanded = expandedModule === module.id;
              const moduleProgress = completedLessons[module.id] || 0;
              const progressPercentage = Math.round((moduleProgress / module.lessons) * 100);
              const isLocked = index > 0 && !completedLessons[modules[index - 1].id];
              
              return (
                <Card key={module.id} className={`transition-all ${isExpanded ? 'shadow-lg' : ''}`}>
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <module.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Heading as="h4" variant="h6">{module.title}</Heading>
                            {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                            <Badge variant="outline" size="sm">{module.days}</Badge>
                            <Badge variant="outline" size="sm">{module.xpReward} XP</Badge>
                          </div>
                          <Text color="muted" size="sm" className="mb-3">
                            {module.description}
                          </Text>
                          <div className="flex items-center gap-4">
                            <Text size="sm">
                              {moduleProgress}/{module.lessons} lessons
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
                        <Text weight="medium" className="mb-3">What you'll learn:</Text>
                        <div className="grid md:grid-cols-2 gap-2 mb-4">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                              <Text size="sm">{topic}</Text>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartModule(module.id);
                            }}
                            disabled={isLocked || isLoading}
                            size="sm"
                          >
                            {moduleProgress > 0 ? 'Continue' : 'Start'} Module
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
            })}
          </div>

          {/* Special Features */}
          <Card className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
            <Heading as="h3" variant="h5" className="mb-4">
              Special Features Included
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <Text weight="medium">Complete Template Library</Text>
                </div>
                <Text size="sm" color="muted">
                  250+ templates including financial models, compliance checklists, 
                  board presentations, and investor reports
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <Text weight="medium">Interactive Tools</Text>
                </div>
                <Text size="sm" color="muted">
                  Financial model builder, ratio analyzer, cash flow forecaster, 
                  and compliance calendar generator
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <Text weight="medium">Expert Network</Text>
                </div>
                <Text size="sm" color="muted">
                  Access to CFO mentors, CA advisors, tax experts, and 
                  technology consultants for guidance
                </Text>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="inline-block p-8">
              <Heading as="h3" variant="h5" className="mb-2">
                Ready to Build World-Class Finance?
              </Heading>
              <Text color="muted" className="mb-6">
                Join 300+ founders who have transformed their financial operations
              </Text>
              <Button 
                size="lg"
                onClick={() => handleStartModule('financial-foundations')}
                disabled={isLoading}
              >
                Start Your Finance Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}