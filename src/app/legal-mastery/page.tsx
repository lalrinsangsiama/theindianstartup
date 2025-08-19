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
  Scale, 
  CheckCircle, 
  Lock, 
  Clock, 
  Target,
  FileText,
  Shield,
  Users,
  Gavel,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Briefcase,
  AlertTriangle,
  Globe,
  Cpu,
  ShieldAlert,
  TrendingUp
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
    id: 'legal-foundations',
    title: 'Legal Foundations & Structure',
    description: 'Build the legal backbone of your startup from day one',
    days: 'Days 1-5',
    lessons: 5,
    icon: Shield,
    color: 'bg-blue-500',
    xpReward: 500,
    topics: [
      'Legal-first founder mindset',
      'Entity structure mastery',
      'Founder agreements & vesting',
      'Equity structures & cap table',
      'Board structure & governance'
    ]
  },
  {
    id: 'contract-mastery',
    title: 'Contract Mastery',
    description: 'Master the art and science of bulletproof contracts',
    days: 'Days 6-10',
    lessons: 5,
    icon: FileText,
    color: 'bg-green-500',
    xpReward: 650,
    topics: [
      'Contract fundamentals & framework',
      'Customer contracts excellence',
      'Vendor & partner agreements',
      'Contract negotiation mastery',
      'Contract lifecycle management'
    ]
  },
  {
    id: 'ip-protection',
    title: 'Intellectual Property Fortress',
    description: 'Build and protect your IP moat for competitive advantage',
    days: 'Days 11-14',
    lessons: 4,
    icon: Cpu,
    color: 'bg-purple-500',
    xpReward: 600,
    topics: [
      'IP strategy & portfolio building',
      'Trademark protection & brand defense',
      'Copyright & code protection',
      'IP enforcement & defense'
    ]
  },
  {
    id: 'employment-law',
    title: 'Employment Law Excellence',
    description: 'Create compliant and protective employment frameworks',
    days: 'Days 15-18',
    lessons: 4,
    icon: Users,
    color: 'bg-red-500',
    xpReward: 600,
    topics: [
      'Employment contracts & offers',
      'Consultant & contractor management',
      'Workplace policies & handbook',
      'POSH & workplace safety compliance'
    ]
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution & Litigation',
    description: 'Prevent disputes and manage them effectively when they arise',
    days: 'Days 19-22',
    lessons: 4,
    icon: Gavel,
    color: 'bg-indigo-500',
    xpReward: 600,
    topics: [
      'Dispute prevention strategies',
      'Negotiation & settlement mastery',
      'Litigation management & strategy',
      'Arbitration & ADR excellence'
    ]
  },
  {
    id: 'data-protection',
    title: 'Data Protection & Privacy',
    description: 'Build compliant data protection and privacy systems',
    days: 'Days 23-26',
    lessons: 4,
    icon: ShieldAlert,
    color: 'bg-yellow-500',
    xpReward: 600,
    topics: [
      'Data protection law framework',
      'Privacy policies & notices',
      'Data security & breach management',
      'Vendor data management & DPAs'
    ]
  },
  {
    id: 'regulatory-compliance',
    title: 'Regulatory Compliance',
    description: 'Navigate complex regulatory requirements with confidence',
    days: 'Days 27-30',
    lessons: 4,
    icon: BookOpen,
    color: 'bg-orange-500',
    xpReward: 600,
    topics: [
      'Building compliance infrastructure',
      'Sector-specific regulations',
      'Licenses, permits & registrations',
      'Regulatory reporting & audits'
    ]
  },
  {
    id: 'ma-investment',
    title: 'M&A and Investment Legal',
    description: 'Master investment documentation and M&A transactions',
    days: 'Days 31-34',
    lessons: 4,
    icon: Briefcase,
    color: 'bg-pink-500',
    xpReward: 700,
    topics: [
      'Investment documentation mastery',
      'Due diligence excellence',
      'M&A transaction structuring',
      'Exit planning & execution'
    ]
  },
  {
    id: 'international-law',
    title: 'International Business Law',
    description: 'Navigate cross-border legal requirements and expansion',
    days: 'Days 35-37',
    lessons: 3,
    icon: Globe,
    color: 'bg-teal-500',
    xpReward: 450,
    topics: [
      'Cross-border contracts & trade',
      'Foreign investment & FEMA',
      'Global expansion legal framework'
    ]
  },
  {
    id: 'tech-digital-law',
    title: 'Technology & Digital Law',
    description: 'Master technology agreements and digital compliance',
    days: 'Days 38-40',
    lessons: 3,
    icon: Cpu,
    color: 'bg-gray-600',
    xpReward: 450,
    topics: [
      'Technology agreements & licensing',
      'Digital compliance & IT Act',
      'Emerging tech legal landscape'
    ]
  },
  {
    id: 'crisis-management',
    title: 'Crisis Management & Legal Risk',
    description: 'Build systems to prevent and manage legal crises',
    days: 'Days 41-43',
    lessons: 3,
    icon: AlertTriangle,
    color: 'bg-emerald-500',
    xpReward: 420,
    topics: [
      'Legal crisis response system',
      'Legal risk management framework',
      'Reputation & brand protection'
    ]
  },
  {
    id: 'legal-leadership',
    title: 'Legal Leadership & Strategy',
    description: 'Become a legally empowered founder and leader',
    days: 'Days 44-45',
    lessons: 2,
    icon: TrendingUp,
    color: 'bg-violet-500',
    xpReward: 300,
    topics: [
      'Legal leadership excellence',
      'Legal stack integration & future'
    ]
  }
];

interface LegalMetric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const legalMetrics: LegalMetric[] = [
  {
    label: 'Legal Templates',
    value: '300+ Documents',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    label: 'Risk Prevention',
    value: '95% Reduction',
    icon: Shield,
    color: 'text-green-600'
  },
  {
    label: 'Compliance Coverage',
    value: '100% Complete',
    icon: BookOpen,
    color: 'text-purple-600'
  },
  {
    label: 'Legal Cost Savings',
    value: '₹10L+ Annually',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
];

export default function LegalMasteryPage() {
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
      router.push(`/legal-mastery/${moduleId}`);
    }, 500);
  };

  return (
    <ProductProtectedRoute productCode="P5">
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="default">45-Day Intensive</Badge>
              <Badge variant="outline">12 Modules</Badge>
              <Badge variant="default">₹7,999</Badge>
            </div>
            <Heading as="h1" className="mb-4">
              Legal Stack - Bulletproof Legal Framework
            </Heading>
            <Text size="lg" color="muted" className="mb-6 max-w-3xl">
              Build bulletproof legal infrastructure that protects your startup from day one. 
              Master contracts, IP protection, employment law, and dispute prevention with 
              300+ templates and expert frameworks.
            </Text>

            {/* Legal Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {legalMetrics.map((metric, index) => (
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
                    Your Legal Mastery Progress
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
                      <Text weight="medium">Ready to build bulletproof legal protection?</Text>
                      <Text size="sm" color="muted">
                        Start with Module 1 to establish your legal foundations
                      </Text>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartModule('legal-foundations')}
                      disabled={isLoading}
                    >
                      Start Learning
                    </Button>
                  </div>
                </Alert>
              )}
            </Card>

            {/* Key Outcomes */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50">
              <Heading as="h3" variant="h6" className="mb-4">
                What You&apos;ll Achieve
              </Heading>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Bulletproof contracts that prevent disputes and litigation</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Complete IP protection strategy with trademarks and copyrights</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Employment law compliance with POSH and workplace policies</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Data protection and privacy compliance frameworks</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Dispute prevention and resolution mechanisms</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">Regulatory compliance across all business areas</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">M&A readiness with complete documentation</Text>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <Text size="sm">300+ legal templates ready for immediate use</Text>
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
                        <Text weight="medium" className="mb-3">What you&apos;ll learn:</Text>
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
          <Card className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50">
            <Heading as="h3" variant="h5" className="mb-4">
              Special Features Included
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-red-600" />
                  <Text weight="medium">Complete Legal Library</Text>
                </div>
                <Text size="sm" color="muted">
                  300+ legal templates including contracts, policies, notices, 
                  and compliance documents ready for use
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <Text weight="medium">Risk Prevention Tools</Text>
                </div>
                <Text size="sm" color="muted">
                  Contract generators, compliance calendars, risk assessors, 
                  and dispute evaluation frameworks
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-red-600" />
                  <Text weight="medium">Expert Legal Network</Text>
                </div>
                <Text size="sm" color="muted">
                  Access to corporate lawyers, IP attorneys, litigation counsels, 
                  and regulatory experts for guidance
                </Text>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="inline-block p-8">
              <Heading as="h3" variant="h5" className="mb-2">
                Ready to Build Bulletproof Legal Protection?
              </Heading>
              <Text color="muted" className="mb-6">
                Join 200+ founders who have protected their startups legally
              </Text>
              <Button 
                size="lg"
                onClick={() => handleStartModule('legal-foundations')}
                disabled={isLoading}
              >
                Start Your Legal Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}