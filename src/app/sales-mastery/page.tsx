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
  Users, 
  TrendingUp, 
  Target, 
  Phone, 
  CheckCircle,
  Calendar,
  BookOpen,
  ArrowRight,
  Star,
  Award,
  Crown,
  Zap,
  Globe,
  DollarSign,
  Building,
  Handshake,
  BarChart3,
  Brain,
  Heart
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

export default function SalesMasteryPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);

  useEffect(() => {
    // Simulate loading modules and progress from API
    const mockModules: Module[] = [
      {
        id: 'p6_m1_market_fundamentals',
        title: 'Indian Market Fundamentals',
        description: 'Master the unique psychology, structure, and dynamics of Indian markets across regions and industries',
        lessonsCount: 5,
        totalXP: 500,
        isUnlocked: true,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Globe
      },
      {
        id: 'p6_m2_sales_foundation',
        title: 'Building Your Sales Foundation',
        description: 'Architect your sales strategy, design processes, structure teams, select technology, and set up revenue operations',
        lessonsCount: 5,
        totalXP: 600,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Building
      },
      {
        id: 'p6_m3_lead_generation',
        title: 'Lead Generation Mastery',
        description: 'Master digital and traditional lead generation channels, cold outreach, partnerships, and account-based marketing',
        lessonsCount: 5,
        totalXP: 550,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Target
      },
      {
        id: 'p6_m4_sales_execution',
        title: 'Sales Execution Excellence',
        description: 'Master first meetings, solution selling, negotiations, enterprise sales, SME tactics, and government sales',
        lessonsCount: 7,
        totalXP: 840,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Handshake
      },
      {
        id: 'p6_m5_pricing_monetization',
        title: 'Pricing & Monetization',
        description: 'Master pricing strategies for India, payment terms, discounting, revenue model innovation',
        lessonsCount: 5,
        totalXP: 650,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: DollarSign
      },
      {
        id: 'p6_m6_team_management',
        title: 'Sales Team Management',
        description: 'Build and manage high-performing sales teams with hiring, training, performance management, and leadership',
        lessonsCount: 6,
        totalXP: 840,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Users
      },
      {
        id: 'p6_m7_customer_success',
        title: 'Customer Success & Retention',
        description: 'Master customer onboarding, account management, support systems, feedback loops, and expansion revenue',
        lessonsCount: 5,
        totalXP: 750,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: Heart
      },
      {
        id: 'p6_m8_channel_partnerships',
        title: 'Channel & Partnership Sales',
        description: 'Build channel strategies, enable partners, create distribution networks, and leverage marketplace strategies',
        lessonsCount: 5,
        totalXP: 800,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: TrendingUp
      },
      {
        id: 'p6_m9_tech_analytics',
        title: 'Sales Technology & Analytics',
        description: 'Master sales analytics, reporting, AI automation, and future-ready sales technology implementation',
        lessonsCount: 2,
        totalXP: 340,
        isUnlocked: false,
        isCompleted: false,
        progress: 0,
        premium: false,
        icon: BarChart3
      },
      {
        id: 'p6_m10_advanced_strategies',
        title: 'Advanced Strategies & Specializations',
        description: 'Master international expansion, M&A sales strategies, and deep industry vertical expertise',
        lessonsCount: 15,
        totalXP: 2700,
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Premium Header */}
          <div className="text-center space-y-4 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="bg-gradient-to-r from-blue-400 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Crown className="w-4 h-4" />
                PREMIUM COURSE
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2 mt-8">
              <Users className="w-6 h-6 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                P6 Premium Course
              </Badge>
            </div>
            <Heading as="h1" variant="h2" className="text-3xl font-bold">
              Sales & GTM in India - Master Course
            </Heading>
            <Text size="lg" color="muted" className="max-w-3xl mx-auto">
              Transform your startup into a revenue-generating machine with India-specific sales strategies. 
              60-day intensive course with 75+ templates, real case studies, and expert frameworks.
            </Text>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                60 Days Intensive
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                75+ Templates
              </div>
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                Indian Market Focus
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
                <Text size="sm" color="muted">XP Earned / 8,570 Total</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  60
                </div>
                <Text size="sm" color="muted">Expert Lessons</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  10
                </div>
                <Text size="sm" color="muted">Comprehensive Modules</Text>
              </div>
            </div>
          </Card>

          {/* Course Features Showcase */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
            <Heading as="h2" variant="h4" className="mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Master Indian Sales Excellence
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">Regional Market Mastery</Text>
                  <Text size="sm" color="muted">North, South, East, West strategies</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-600" />
                <div>
                  <Text weight="medium">Buyer Psychology Deep Dive</Text>
                  <Text size="sm" color="muted">Trust-building & cultural nuances</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-green-600" />
                <div>
                  <Text weight="medium">Enterprise & SME Tactics</Text>
                  <Text size="sm" color="muted">Tailored approaches for every segment</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <Text weight="medium">Government Sales (GeM)</Text>
                  <Text size="sm" color="muted">Tender navigation & compliance</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">Sales Team Building</Text>
                  <Text size="sm" color="muted">Hiring, training, & management</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-yellow-600" />
                <div>
                  <Text weight="medium">Advanced Analytics & AI</Text>
                  <Text size="sm" color="muted">Data-driven sales optimization</Text>
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
                10 Comprehensive Modules
              </Badge>
            </div>
            
            <div className="grid gap-6">
              {modules.map((module, index) => {
                const IconComponent = module.icon;
                return (
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

          {/* Success Stories & Value Proposition */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-300" />
              <Heading as="h2" variant="h3" className="text-white">
                Transform Your Sales Success in India
              </Heading>
            </div>
            <Text className="text-blue-100 mb-6 max-w-3xl mx-auto">
              Join successful founders who used this course to build systematic sales processes, scale revenue operations, 
              and dominate Indian markets with proven frameworks and strategies.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-green-300">75+</Text>
                <Text className="text-blue-100">Templates & Scripts</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-green-300">60</Text>
                <Text className="text-blue-100">Expert Lessons</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-green-300">10</Text>
                <Text className="text-blue-100">Specialized Modules</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-green-300">8,570</Text>
                <Text className="text-blue-100">Total XP Available</Text>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleStartLesson('p6_m1_market_fundamentals')}
              className="bg-white text-blue-700 hover:bg-gray-50"
            >
              Start Your Sales Transformation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}