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
  Shield, 
  FileText, 
  Search, 
  Scale, 
  BookOpen,
  CheckCircle,
  Calendar,
  ArrowRight,
  Star,
  Award,
  Crown,
  Zap,
  Globe,
  DollarSign,
  Building,
  Gavel,
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
  Lock
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
  icon: React.ElementType;
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

export default function PatentMasteryPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);

  useEffect(() => {
    // Simulate loading modules and progress from API
    const mockModules: Module[] = [
      {
        id: 'p10_m1_fundamentals',
        title: 'Patent Fundamentals & IP Landscape',
        description: 'Master the intellectual property ecosystem, understand different types of IP protection, and learn the economic value of patents',
        lessonsCount: 5,
        totalXP: 750,
        isUnlocked: true,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Lightbulb
      },
      {
        id: 'p10_m2_prefiling',
        title: 'Pre-Filing Strategy & Preparation',
        description: 'Develop invention disclosure systems, conduct patentability assessments, and master patent drafting basics',
        lessonsCount: 5,
        totalXP: 800,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: FileText
      },
      {
        id: 'p10_m3_filing',
        title: 'Filing Process Mastery',
        description: 'Navigate jurisdiction selection, master Indian Patent Office procedures, and develop international filing strategies',
        lessonsCount: 6,
        totalXP: 1020,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Target
      },
      {
        id: 'p10_m4_prosecution',
        title: 'Prosecution & Examination',
        description: 'Master the examination process, respond to office actions, handle rejections, and navigate opposition proceedings',
        lessonsCount: 6,
        totalXP: 1080,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Search
      },
      {
        id: 'p10_m5_portfolio',
        title: 'Patent Portfolio Management',
        description: 'Build comprehensive patent strategies, conduct landscaping, optimize portfolios, and implement analytics systems',
        lessonsCount: 5,
        totalXP: 950,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Building
      },
      {
        id: 'p10_m6_commercialization',
        title: 'Commercialization & Monetization',
        description: 'Master patent valuation, licensing strategies, sales and acquisitions, and revenue generation models',
        lessonsCount: 6,
        totalXP: 1200,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: DollarSign
      },
      {
        id: 'p10_m7_industry_specific',
        title: 'Industry-Specific Strategies',
        description: 'Master patent strategies for software & AI, biotech & pharma, hardware & electronics, and traditional industries',
        lessonsCount: 5,
        totalXP: 1050,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Brain
      },
      {
        id: 'p10_m8_international',
        title: 'International Patent Strategy',
        description: 'Master global filing strategies, major jurisdiction practices, translation, and international enforcement',
        lessonsCount: 5,
        totalXP: 1100,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Globe
      },
      {
        id: 'p10_m9_cost_funding',
        title: 'Cost Management & Funding',
        description: 'Master complete cost breakdown analysis and explore funding opportunities including government grants',
        lessonsCount: 2,
        totalXP: 460,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: TrendingUp
      },
      {
        id: 'p10_m10_litigation',
        title: 'Litigation & Disputes',
        description: 'Master patent litigation processes, evidence collection, expert witnesses, and settlement strategies',
        lessonsCount: 5,
        totalXP: 1200,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: true,
        icon: Gavel
      },
      {
        id: 'p10_m11_advanced_prosecution',
        title: 'Advanced Prosecution',
        description: 'Master complex response strategies, appeal procedures, IPAB processes, and international coordination',
        lessonsCount: 5,
        totalXP: 1250,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: true,
        icon: Scale
      },
      {
        id: 'p10_m12_emerging_tech',
        title: 'Emerging Technologies',
        description: 'Master patent strategies for quantum computing, gene editing, autonomous vehicles, and Web3 technologies',
        lessonsCount: 5,
        totalXP: 1300,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: true,
        icon: Crown
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Premium Header */}
          <div className="text-center space-y-4 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="bg-gradient-to-r from-purple-400 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                EXPERT COURSE
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2 mt-8">
              <Shield className="w-6 h-6 text-purple-600" />
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                P10 Expert Course
              </Badge>
            </div>
            <Heading as="h1" variant="h2" className="text-3xl font-bold">
              Patent Mastery for Indian Startups
            </Heading>
            <Text size="lg" color="muted" className="max-w-3xl mx-auto">
              Master intellectual property from filing to monetization. 60-day comprehensive course covering 
              patent strategy, prosecution, portfolio management, and commercialization with 100+ templates and expert guidance.
            </Text>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                60 Days Expert Track
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                100+ Templates
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                IP Protection Focus
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {overallProgress}%
                </div>
                <Text size="sm" color="muted">Course Progress</Text>
                <ProgressBar value={overallProgress} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {totalXPEarned}
                </div>
                <Text size="sm" color="muted">XP Earned / 12,750 Total</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  60
                </div>
                <Text size="sm" color="muted">Expert Lessons</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  12
                </div>
                <Text size="sm" color="muted">Comprehensive Modules</Text>
              </div>
            </div>
          </Card>

          {/* Course Features Showcase */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500">
            <Heading as="h2" variant="h4" className="mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Master IP Strategy & Protection
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <Text weight="medium">Filing to Grant Journey</Text>
                  <Text size="sm" color="muted">Complete patent lifecycle mastery</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <Text weight="medium">Patent Monetization</Text>
                  <Text size="sm" color="muted">Licensing, sales & revenue generation</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">International Strategy</Text>
                  <Text size="sm" color="muted">Global filing & enforcement</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-orange-600" />
                <div>
                  <Text weight="medium">Industry-Specific Tactics</Text>
                  <Text size="sm" color="muted">Software, biotech, hardware strategies</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-600" />
                <div>
                  <Text weight="medium">Portfolio Management</Text>
                  <Text size="sm" color="muted">Strategic IP asset optimization</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gavel className="w-5 h-5 text-red-600" />
                <div>
                  <Text weight="medium">Litigation & Defense</Text>
                  <Text size="sm" color="muted">Protection & enforcement strategies</Text>
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
                12 Expert Modules
              </Badge>
            </div>
            
            <div className="grid gap-6">
              {modules.map((module, index) => {
                const IconComponent = module.icon;
                return (
                  <Card key={module.id} className={`p-6 transition-all ${
                    module.isUnlocked 
                      ? 'hover:shadow-md border-purple-200' 
                      : 'opacity-60 bg-gray-50'
                  } ${module.premium ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            module.isCompleted 
                              ? 'bg-green-100 text-green-800' 
                              : module.isUnlocked 
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {module.isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </div>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                            <Heading as="h3" variant="h4" className="flex items-center gap-2">
                              {module.title}
                              {module.premium && (
                                <Crown className="w-4 h-4 text-yellow-600" />
                              )}
                            </Heading>
                          </div>
                          {module.isUnlocked && (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Unlocked
                            </Badge>
                          )}
                          {module.premium && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              Advanced
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
                );
              })}
            </div>
          </div>

          {/* Value Proposition */}
          <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-700 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-yellow-300" />
              <Heading as="h2" variant="h3" className="text-white">
                Transform Your IP Strategy & Protection
              </Heading>
            </div>
            <Text className="text-purple-100 mb-6 max-w-3xl mx-auto">
              Join successful founders who built strong IP portfolios, protected their innovations, and monetized their patents. 
              From first filing to international expansion and commercialization.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">100+</Text>
                <Text className="text-purple-100">Patent Templates</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">60</Text>
                <Text className="text-purple-100">Expert Lessons</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">12</Text>
                <Text className="text-purple-100">Specialized Modules</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">12,750</Text>
                <Text className="text-purple-100">Total XP Available</Text>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleStartLesson('p10_m1_fundamentals')}
              className="bg-white text-purple-700 hover:bg-gray-50"
            >
              Start Your IP Mastery Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}