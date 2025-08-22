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
  MapPin, 
  CheckCircle, 
  Lock, 
  Clock, 
  Target,
  FileText,
  Building,
  IndianRupee,
  TrendingUp,
  Users,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Map,
  Briefcase,
  Calculator,
  Globe,
  Factory,
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
    id: 'federal-structure',
    title: 'Federal Structure & National Framework',
    description: 'Understand India\'s federal business ecosystem and strategic navigation',
    days: 'Days 1-3',
    lessons: 3,
    icon: Building,
    color: 'bg-blue-500',
    xpReward: 390,
    topics: [
      'India\'s federal business ecosystem',
      'State scheme taxonomy & classification',
      'Strategic navigation framework'
    ]
  },
  {
    id: 'northern-states',
    title: 'Northern States Deep Dive',
    description: 'Master schemes in Delhi NCR, Haryana, Punjab, and hill states',
    days: 'Days 4-6',
    lessons: 3,
    icon: Map,
    color: 'bg-green-500',
    xpReward: 390,
    topics: [
      'Delhi NCR capital advantages',
      'Haryana & Punjab agricultural tech',
      'Himachal & Uttarakhand hill benefits'
    ]
  },
  {
    id: 'western-states',
    title: 'Western States Opportunities',
    description: 'Navigate Maharashtra, Gujarat, Rajasthan, and Goa ecosystems',
    days: 'Days 7-9',
    lessons: 3,
    icon: Factory,
    color: 'bg-purple-500',
    xpReward: 390,
    topics: [
      'Maharashtra commercial capital benefits',
      'Gujarat vibrant business ecosystem',
      'Rajasthan & Goa emerging opportunities'
    ]
  },
  {
    id: 'southern-states',
    title: 'Southern States Excellence',
    description: 'Leverage Karnataka, Tamil Nadu, Telangana, AP, and Kerala benefits',
    days: 'Days 10-12',
    lessons: 3,
    icon: Zap,
    color: 'bg-red-500',
    xpReward: 420,
    topics: [
      'Karnataka startup capital advantages',
      'Tamil Nadu & Telangana industrial hubs',
      'Andhra Pradesh & Kerala tech ecosystems'
    ]
  },
  {
    id: 'eastern-states',
    title: 'Eastern States Potential',
    description: 'Explore opportunities in West Bengal, Odisha, Jharkhand, and Bihar',
    days: 'Days 13-15',
    lessons: 3,
    icon: TrendingUp,
    color: 'bg-indigo-500',
    xpReward: 390,
    topics: [
      'West Bengal eastern gateway benefits',
      'Odisha & Jharkhand resource advantages',
      'Bihar & Chhattisgarh emerging schemes'
    ]
  },
  {
    id: 'northeastern-states',
    title: 'North-Eastern States Advantages',
    description: 'Unlock special benefits in India\'s North-Eastern states',
    days: 'Days 16-18',
    lessons: 3,
    icon: Globe,
    color: 'bg-yellow-500',
    xpReward: 420,
    topics: [
      'Assam & Meghalaya gateway benefits',
      'Manipur, Mizoram, Nagaland, Tripura schemes',
      'Arunachal Pradesh & Sikkim opportunities'
    ]
  },
  {
    id: 'implementation-framework',
    title: 'Strategic Implementation Framework',
    description: 'Master multi-state analysis, applications, and government relations',
    days: 'Days 19-21',
    lessons: 3,
    icon: Briefcase,
    color: 'bg-orange-500',
    xpReward: 420,
    topics: [
      'Multi-state location analysis',
      'Scheme application mastery',
      'Government relations management'
    ]
  },
  {
    id: 'sector-specific',
    title: 'Sector-Specific State Benefits',
    description: 'Optimize benefits for tech, manufacturing, agriculture, and services',
    days: 'Days 22-24',
    lessons: 3,
    icon: Target,
    color: 'bg-pink-500',
    xpReward: 420,
    topics: [
      'Technology & IT sector benefits',
      'Manufacturing sector optimization',
      'Agriculture & service sector schemes'
    ]
  },
  {
    id: 'financial-planning',
    title: 'Financial Planning & Optimization',
    description: 'Maximize ROI through strategic financial planning and subsidies',
    days: 'Days 25-27',
    lessons: 3,
    icon: Calculator,
    color: 'bg-teal-500',
    xpReward: 450,
    topics: [
      'Multi-state tax optimization',
      'Subsidy & grant management',
      'ROI maximization strategies'
    ]
  },
  {
    id: 'advanced-strategies',
    title: 'Advanced Strategies & Future Planning',
    description: 'Build strategic presence and adapt to policy changes',
    days: 'Days 28-30',
    lessons: 3,
    icon: Users,
    color: 'bg-violet-500',
    xpReward: 450,
    topics: [
      'Strategic multi-state presence',
      'Policy monitoring & adaptation',
      'Scaling with state benefits'
    ]
  }
];

interface StateMetric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const stateMetrics: StateMetric[] = [
  {
    label: 'States & UTs Covered',
    value: '28 + 8',
    icon: MapPin,
    color: 'text-blue-600'
  },
  {
    label: 'Schemes Database',
    value: '500+ Schemes',
    icon: FileText,
    color: 'text-green-600'
  },
  {
    label: 'Cost Savings Potential',
    value: '30-50%',
    icon: IndianRupee,
    color: 'text-purple-600'
  },
  {
    label: 'Application Support',
    value: '100% Guided',
    icon: CheckCircle,
    color: 'text-orange-600'
  }
];

export default function StateSchemesPage() {
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
      router.push(`/state-schemes/${moduleId}`);
    }, 500);
  };

  return (
    <ProductProtectedRoute productCode="P7">
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">30-Day Program</Badge>
              <Badge variant="outline">10 Modules</Badge>
              <Badge variant="default">₹4,999</Badge>
            </div>
            <Heading as="h1" className="mb-4">
              State-wise Scheme Map - Complete Navigation
            </Heading>
            <Text size="lg" color="muted" className="mb-6 max-w-3xl">
              Master India's state-level business ecosystem with comprehensive coverage of 
              all 28 states and 8 UTs. Navigate 500+ schemes, optimize location strategy, 
              and unlock 30-50% cost savings through strategic state benefits.
            </Text>

            {/* State Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {stateMetrics.map((metric, index) => (
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
                    Your State Mastery Progress
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
                      <Text weight="medium">Ready to unlock state benefits?</Text>
                      <Text size="sm" color="muted">
                        Start with Module 1 to understand India's federal structure
                      </Text>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartModule('federal-structure')}
                      disabled={isLoading}
                    >
                      Start Learning
                    </Button>
                  </div>
                </Alert>
              )}
            </Card>

            {/* Key Outcomes */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-emerald-50 to-teal-50">
              <Heading as="h3" variant="h6" className="mb-4">
                What You'll Achieve
              </Heading>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Complete understanding of all 28 states + 8 UTs schemes</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">30-50% cost reduction through subsidies and incentives</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Multi-state optimization strategy implemented</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Government relationships and contacts established</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Applications submitted for relevant schemes</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">SEZ and industrial park benefits accessed</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Sector-specific state advantages leveraged</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Investment summit participation strategy</Text>
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
                        <div className="space-y-2 mb-4">
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
          <Card className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
            <Heading as="h3" variant="h5" className="mb-4">
              Special Features Included
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-yellow-600" />
                  <Text weight="medium">Complete State Database</Text>
                </div>
                <Text size="sm" color="muted">
                  500+ schemes across all states, application templates, 
                  contact directories, and success stories
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-yellow-600" />
                  <Text weight="medium">Optimization Tools</Text>
                </div>
                <Text size="sm" color="muted">
                  State benefit calculators, location optimizer, subsidy 
                  estimators, and ROI analyzers
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <Text weight="medium">Government Network</Text>
                </div>
                <Text size="sm" color="muted">
                  Direct contacts with department officials, industry 
                  associations, and successful founders
                </Text>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="inline-block p-8">
              <Heading as="h3" variant="h5" className="mb-2">
                Ready to Unlock State Benefits?
              </Heading>
              <Text color="muted" className="mb-6">
                Join 400+ founders who have optimized their business locations
              </Text>
              <Button 
                size="lg"
                onClick={() => handleStartModule('federal-structure')}
                disabled={isLoading}
              >
                Start Your State Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}