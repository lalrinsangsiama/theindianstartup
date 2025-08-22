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
  Palette, 
  CheckCircle, 
  Lock, 
  Clock, 
  Target,
  FileText,
  Users,
  TrendingUp,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Award,
  Camera,
  Newspaper,
  Mic,
  Star,
  Globe,
  Heart,
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
    id: 'foundations',
    title: 'Foundations of Brand Building',
    description: 'Master the fundamentals of brand strategy, positioning, and identity creation',
    days: 'Days 1-5',
    lessons: 5,
    icon: Palette,
    color: 'bg-blue-500',
    xpReward: 750,
    topics: [
      'Brand vs Branding vs Marketing distinction',
      'Strategic brand positioning framework',
      'Brand personality & voice development'
    ]
  },
  {
    id: 'customer-experience',
    title: 'Customer Experience Branding',
    description: 'Design every touchpoint to reinforce your brand identity and values',
    days: 'Days 6-10',
    lessons: 5,
    icon: Heart,
    color: 'bg-pink-500',
    xpReward: 750,
    topics: [
      'Packaging as brand ambassador',
      'Retail and space design strategies',
      'Digital touchpoint excellence'
    ]
  },
  {
    id: 'team-culture',
    title: 'Team Culture as Brand',
    description: 'Build internal brand culture and turn employees into brand ambassadors',
    days: 'Days 11-15',
    lessons: 5,
    icon: Users,
    color: 'bg-green-500',
    xpReward: 750,
    topics: [
      'Internal brand building systems',
      'Employer branding strategies',
      'Leadership branding excellence'
    ]
  },
  {
    id: 'pr-fundamentals',
    title: 'Public Relations Fundamentals',
    description: 'Master media relations, storytelling, and strategic PR campaign execution',
    days: 'Days 16-20',
    lessons: 5,
    icon: Megaphone,
    color: 'bg-orange-500',
    xpReward: 750,
    topics: [
      'PR strategy development & planning',
      'Media landscape understanding',
      'Press release mastery & distribution'
    ]
  },
  {
    id: 'award-strategies',
    title: 'Award Winning Strategies',
    description: 'Navigate award programs and build industry recognition systematically',
    days: 'Days 21-25',
    lessons: 5,
    icon: Award,
    color: 'bg-yellow-500',
    xpReward: 750,
    topics: [
      'Award landscape mapping & selection',
      'Winning application strategies',
      'Speaking opportunities & industry recognition'
    ]
  },
  {
    id: 'digital-pr',
    title: 'Content & Digital PR',
    description: 'Leverage digital platforms and content for maximum PR impact',
    days: 'Days 26-30',
    lessons: 5,
    icon: Globe,
    color: 'bg-purple-500',
    xpReward: 750,
    topics: [
      'Content strategy for PR success',
      'Digital PR tactics & SEO integration',
      'Crisis management protocols'
    ]
  },
  {
    id: 'agency-relationships',
    title: 'Agency Relationships',
    description: 'Master agency selection, management, and maximize PR investment ROI',
    days: 'Days 31-35',
    lessons: 5,
    icon: FileText,
    color: 'bg-indigo-500',
    xpReward: 750,
    topics: [
      'Agency selection & evaluation process',
      'PR packages, pricing & negotiations',
      'Integrated communications management'
    ]
  },
  {
    id: 'regional-pr',
    title: 'Regional & Cultural PR',
    description: 'Navigate India\'s diverse markets with culturally sensitive PR strategies',
    days: 'Days 36-40',
    lessons: 5,
    icon: Newspaper,
    color: 'bg-red-500',
    xpReward: 750,
    topics: [
      'Regional media strategy & language considerations',
      'Cultural sensitivity & government relations',
      'CSR communication & international PR'
    ]
  },
  {
    id: 'founder-branding',
    title: 'Personal Branding for Founders',
    description: 'Build powerful founder brand and establish thought leadership position',
    days: 'Days 41-45',
    lessons: 5,
    icon: Star,
    color: 'bg-teal-500',
    xpReward: 750,
    topics: [
      'Founder as brand strategy',
      'LinkedIn mastery & media personality',
      'Thought leadership & executive coaching'
    ]
  },
  {
    id: 'entertainment-pr',
    title: 'Entertainment & Sports PR',
    description: 'Leverage celebrity partnerships and sports marketing for brand amplification',
    days: 'Days 46-48',
    lessons: 3,
    icon: Camera,
    color: 'bg-rose-500',
    xpReward: 540,
    topics: [
      'Celebrity partnerships & endorsement strategies',
      'Sports sponsorship marketing',
      'Entertainment marketing integration'
    ]
  },
  {
    id: 'financial-comms',
    title: 'Financial Communications',
    description: 'Master investor relations, M&A communications, and IPO readiness',
    days: 'Days 49-51',
    lessons: 3,
    icon: TrendingUp,
    color: 'bg-emerald-500',
    xpReward: 540,
    topics: [
      'Investor relations & financial PR mastery',
      'M&A communications strategy',
      'IPO readiness & market communications'
    ]
  },
  {
    id: 'global-pr',
    title: 'Global PR Strategies',
    description: 'Scale PR efforts internationally with multi-market campaign orchestration',
    days: 'Days 52-54',
    lessons: 3,
    icon: Zap,
    color: 'bg-violet-500',
    xpReward: 540,
    topics: [
      'Global expansion PR strategy',
      'Multi-market campaign orchestration',
      'International awards & recognition'
    ]
  }
];

interface BrandMetric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const brandMetrics: BrandMetric[] = [
  {
    label: 'Templates & Tools',
    value: '300+',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    label: 'Brand Recognition',
    value: '10x Increase',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    label: 'Media Coverage',
    value: 'Active Presence',
    icon: Megaphone,
    color: 'text-purple-600'
  },
  {
    label: 'Industry Awards',
    value: 'Winning Strategy',
    icon: Award,
    color: 'text-orange-600'
  }
];

export default function BrandingMasteryPage() {
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
      router.push(`/branding-mastery/${moduleId}`);
    }, 500);
  };

  return (
    <ProductProtectedRoute productCode="P11">
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">54-Day Program</Badge>
              <Badge variant="outline">12 Modules</Badge>
              <Badge variant="default">₹7,999</Badge>
            </div>
            <Heading as="h1" className="mb-4">
              Branding & Public Relations Mastery
            </Heading>
            <Text size="lg" color="muted" className="mb-6 max-w-3xl">
              Transform into a recognized industry leader through powerful brand building and strategic PR. 
              Master every aspect from visual identity to media relations, award strategies, and crisis management 
              with 300+ templates and tools.
            </Text>

            {/* Brand Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {brandMetrics.map((metric, index) => (
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
                    Your Branding Mastery Progress
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
                      <Text weight="medium">Ready to build your brand empire?</Text>
                      <Text size="sm" color="muted">
                        Start with Module 1 to master brand building fundamentals
                      </Text>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartModule('foundations')}
                      disabled={isLoading}
                    >
                      Start Building
                    </Button>
                  </div>
                </Alert>
              )}
            </Card>

            {/* Key Outcomes */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-purple-50 to-pink-50">
              <Heading as="h3" variant="h6" className="mb-4">
                What You'll Achieve
              </Heading>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Powerful brand identity with complete visual system</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Active media presence with systematic PR campaigns</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Award wins and industry recognition strategy</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Crisis management protocols and recovery plans</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Strong personal brand as recognized founder</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Media training and interview excellence</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Agency relationships and PR investment optimization</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Global expansion PR strategy and execution</Text>
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
          <Card className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50">
            <Heading as="h3" variant="h5" className="mb-4">
              Special Features Included
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-5 h-5 text-orange-600" />
                  <Text weight="medium">Complete Brand Toolkit</Text>
                </div>
                <Text size="sm" color="muted">
                  300+ templates including brand guidelines, PR materials, 
                  visual assets, and crisis management protocols
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-5 h-5 text-orange-600" />
                  <Text weight="medium">Media Training</Text>
                </div>
                <Text size="sm" color="muted">
                  Comprehensive media interview training, presentation skills, 
                  and personal branding for founders
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <Text weight="medium">Award Strategy</Text>
                </div>
                <Text size="sm" color="muted">
                  Systematic approach to industry awards, speaking opportunities, 
                  and thought leadership positioning
                </Text>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="inline-block p-8">
              <Heading as="h3" variant="h5" className="mb-2">
                Ready to Build Your Brand Empire?
              </Heading>
              <Text color="muted" className="mb-6">
                Join 200+ founders who have built powerful brands and media presence
              </Text>
              <Button 
                size="lg"
                onClick={() => handleStartModule('foundations')}
                disabled={isLoading}
              >
                Start Your Branding Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}