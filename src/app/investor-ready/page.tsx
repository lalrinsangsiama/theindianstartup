'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  Database, 
  TrendingUp, 
  FileText, 
  Users, 
  CheckCircle,
  Calendar,
  BookOpen,
  ArrowRight,
  Star,
  Award,
  Crown,
  Zap,
  Target,
  Shield,
  DollarSign,
  Globe
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  totalXP: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  premium: boolean;
}

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  estimatedTime: number;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
}

export default function InvestorReadyPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);

  useEffect(() => {
    // Simulate loading modules and progress from API
    const mockModules: Module[] = [
      {
        id: 'p8_m1_fundamentals',
        title: 'Data Room Fundamentals',
        description: 'Master investor psychology, data room architecture, and stage-specific requirements from pre-seed to IPO',
        lessonsCount: 6,
        totalXP: 650,
        isUnlocked: true,
        isCompleted: false,
        progress: 0,
        premium: false
      },
      {
        id: 'p8_m2_legal',
        title: 'Legal Foundation',
        description: 'Complete legal documentation including corporate structure, investment docs, contracts, compliance, and IP portfolio',
        lessonsCount: 6,
        totalXP: 650,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false
      },
      {
        id: 'p8_m3_financial',
        title: 'Financial Deep Dive',
        description: 'Master financial statements, projections, MIS reports, cap table management, and tax documentation',
        lessonsCount: 8,
        totalXP: 900,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false
      },
      {
        id: 'p8_m4_operations',
        title: 'Business Operations',
        description: 'Document business strategy, market analysis, product roadmap, sales engine, and operational workflows',
        lessonsCount: 7,
        totalXP: 750,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false
      },
      {
        id: 'p8_m5_team',
        title: 'Team & Organization',
        description: 'Leadership profiles, HR systems, key person management, and organizational documentation',
        lessonsCount: 4,
        totalXP: 450,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false
      },
      {
        id: 'p8_m6_revenue',
        title: 'Customer & Revenue',
        description: 'Customer analytics, revenue quality analysis, and customer success metrics that investors demand',
        lessonsCount: 5,
        totalXP: 550,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false
      },
      {
        id: 'p8_m7_due_diligence',
        title: 'Due Diligence Preparation',
        description: 'Red flag remediation, Q&A preparation, and negotiation readiness for serious fundraising',
        lessonsCount: 5,
        totalXP: 550,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false
      },
      {
        id: 'p8_m8_post_investment',
        title: 'Post-Investment & Exit Strategy',
        description: 'Post-investment compliance, exit readiness, and unicorn scaling documentation',
        lessonsCount: 4,
        totalXP: 800,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: true
      }
    ];

    setModules(mockModules);
    setLoading(false);
  }, []);

  const handleStartLesson = (moduleId: string) => {
    // Navigate to first lesson of module
    logger.info('Starting module:', { moduleId });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Premium Header */}
          <div className="text-center space-y-4 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                PREMIUM COURSE
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2 mt-8">
              <Database className="w-6 h-6 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                P8 Premium Course
              </Badge>
            </div>
            <Heading as="h1" variant="h2" className="text-3xl font-bold">
              Investor-Ready Data Room Mastery
            </Heading>
            <Text size="lg" color="muted" className="max-w-3xl mx-auto">
              Transform your startup with a professional data room that accelerates fundraising and increases valuation. 
              45-day intensive course with 50+ templates, expert insights from VCs and CFOs.
            </Text>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                45 Days Intensive
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                50+ Templates
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                VC Masterclasses
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {overallProgress}%
                </div>
                <Text size="sm" color="muted">Course Progress</Text>
                <ProgressBar value={overallProgress} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {totalXPEarned}
                </div>
                <Text size="sm" color="muted">XP Earned / 5,300 Total</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  45
                </div>
                <Text size="sm" color="muted">Expert Lessons</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  8
                </div>
                <Text size="sm" color="muted">Comprehensive Modules</Text>
              </div>
            </div>
          </Card>

          {/* Premium Features Showcase */}
          <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500">
            <Heading as="h2" variant="h4" className="mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Premium Course Features
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">Advanced Valuation Models</Text>
                  <Text size="sm" color="muted">DCF, comps, precedent transactions</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-green-600" />
                <div>
                  <Text weight="medium">International Expansion</Text>
                  <Text size="sm" color="muted">Multi-jurisdiction compliance</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <Text weight="medium">Sector-Specific Modules</Text>
                  <Text size="sm" color="muted">FinTech, HealthTech, DeepTech</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <Text weight="medium">Unicorn Scaling Playbook</Text>
                  <Text size="sm" color="muted">Billion-dollar documentation</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">VC & CFO Masterclasses</Text>
                  <Text size="sm" color="muted">Expert video interviews</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-red-600" />
                <div>
                  <Text weight="medium">IPO Preparation</Text>
                  <Text size="sm" color="muted">Public company readiness</Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Modules */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Heading as="h2" variant="h3">
                Course Modules
              </Heading>
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                8 Comprehensive Modules
              </Badge>
            </div>
            
            <div className="grid gap-6">
              {modules.map((module, index) => (
                <Card key={module.id} className={`p-6 transition-all ${
                  module.isUnlocked 
                    ? 'hover:shadow-md border-blue-200' 
                    : 'opacity-60 bg-gray-50'
                } ${module.premium ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          module.isCompleted 
                            ? 'bg-green-100 text-green-800' 
                            : module.isUnlocked 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {module.isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        <Heading as="h3" variant="h4" className="flex items-center gap-2">
                          {module.title}
                          {module.premium && (
                            <Crown className="w-4 h-4 text-yellow-600" />
                          )}
                        </Heading>
                        {module.isUnlocked && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Unlocked
                          </Badge>
                        )}
                        {module.premium && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <Text color="muted" className="mb-4">
                        {module.description}
                      </Text>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {module.lessonsCount} lessons
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {module.totalXP} XP
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {Math.ceil(module.lessonsCount * 2)} hours
                        </div>
                        {module.premium && (
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            Advanced Content
                          </div>
                        )}
                      </div>
                      {module.progress > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <Text size="sm" color="muted">Progress</Text>
                            <Text size="sm">{module.progress}%</Text>
                          </div>
                          <ProgressBar value={module.progress} />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <Button
                        variant={module.isUnlocked ? "primary" : "outline"}
                        disabled={!module.isUnlocked}
                        onClick={() => handleStartLesson(module.id)}
                        className="whitespace-nowrap"
                      >
                        {module.isCompleted ? 'Review' : module.progress > 0 ? 'Continue' : 'Start'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Value Proposition */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-yellow-300" />
              <Heading as="h2" variant="h3" className="text-white">
                Transform Your Fundraising Success
              </Heading>
            </div>
            <Text className="text-blue-100 mb-6 max-w-3xl mx-auto">
              Join successful founders who used this course to create professional data rooms that accelerated their fundraising, 
              increased their valuations, and attracted top-tier investors. From pre-seed to IPO readiness.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">50+</Text>
                <Text className="text-blue-100">Professional Templates</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">45</Text>
                <Text className="text-blue-100">Expert Lessons</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">5,300</Text>
                <Text className="text-blue-100">Total XP Available</Text>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleStartLesson('p8_m1_fundamentals')}
              className="bg-white text-blue-700 hover:bg-gray-50"
            >
              Start Your Data Room Transformation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}