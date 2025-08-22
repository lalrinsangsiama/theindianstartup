'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  MapPin, 
  Calculator, 
  FileText, 
  TrendingUp, 
  CheckCircle,
  Calendar,
  BookOpen,
  ArrowRight,
  Star,
  Award,
  Target,
  DollarSign,
  Building,
  Database,
  Search
} from 'lucide-react';
import ComprehensiveSchemeDatabase from '@/components/schemes/ComprehensiveSchemeDatabase';

interface Module {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  totalXP: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
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

export default function StateSchemeMapPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);

  useEffect(() => {
    const fetchP7Progress = async () => {
      try {
        const response = await fetch('/api/products/P7/progress', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setOverallProgress(data.progressPercentage || 0);
          setTotalXPEarned(data.totalXP || 0);
          
          // Set P7 modules based on actual backend data
          const p7Modules: Module[] = [
            {
              id: 'p7_m1_federal_structure',
              title: 'Federal Structure & Central Government Benefits',
              description: 'Master India\'s federal governance structure, central government schemes, and national-level benefits for startups and businesses.',
              lessonsCount: 3,
              totalXP: 450,
              isUnlocked: true,
              isCompleted: data.moduleProgress?.['p7_m1_federal_structure'] === 100,
              progress: data.moduleProgress?.['p7_m1_federal_structure'] || 0
            },
            {
              id: 'p7_m2_northern_states',
              title: 'Northern States Powerhouse (UP, Punjab, Haryana, Delhi, Rajasthan)',
              description: 'Deep dive into Northern India\'s industrial landscape, policy benefits, and massive market opportunities.',
              lessonsCount: 3,
              totalXP: 540,
              isUnlocked: data.moduleProgress?.['p7_m1_federal_structure'] > 0,
              isCompleted: data.moduleProgress?.['p7_m2_northern_states'] === 100,
              progress: data.moduleProgress?.['p7_m2_northern_states'] || 0
            },
            {
              id: 'p7_m3_western_states',
              title: 'Western States Excellence (Maharashtra, Gujarat, Goa, MP)',
              description: 'Navigate India\'s industrial heartland with comprehensive scheme mapping and optimization strategies.',
              lessonsCount: 3,
              totalXP: 600,
              isUnlocked: data.moduleProgress?.['p7_m2_northern_states'] > 0,
              isCompleted: data.moduleProgress?.['p7_m3_western_states'] === 100,
              progress: data.moduleProgress?.['p7_m3_western_states'] || 0
            },
            {
              id: 'p7_m4_southern_states',
              title: 'Southern States Innovation Hub (Karnataka, Tamil Nadu, Telangana, AP, Kerala)',
              description: 'Master the South Indian innovation ecosystem with tech-focused benefits and startup-friendly policies.',
              lessonsCount: 3,
              totalXP: 660,
              isUnlocked: data.moduleProgress?.['p7_m3_western_states'] > 0,
              isCompleted: data.moduleProgress?.['p7_m4_southern_states'] === 100,
              progress: data.moduleProgress?.['p7_m4_southern_states'] || 0
            },
            {
              id: 'p7_m5_eastern_states',
              title: 'Eastern States Potential (West Bengal, Odisha, Jharkhand, Bihar)',
              description: 'Unlock Eastern India\'s emerging opportunities and government incentive programs.',
              lessonsCount: 3,
              totalXP: 450,
              isUnlocked: data.moduleProgress?.['p7_m4_southern_states'] > 0,
              isCompleted: data.moduleProgress?.['p7_m5_eastern_states'] === 100,
              progress: data.moduleProgress?.['p7_m5_eastern_states'] || 0
            },
            {
              id: 'p7_m6_northeastern_states',
              title: 'North-Eastern States Advantages (8 Sister States + Sikkim)',
              description: 'Explore India\'s most incentivized region with maximum subsidies, tax benefits, and development schemes.',
              lessonsCount: 3,
              totalXP: 540,
              isUnlocked: data.moduleProgress?.['p7_m5_eastern_states'] > 0,
              isCompleted: data.moduleProgress?.['p7_m6_northeastern_states'] === 100,
              progress: data.moduleProgress?.['p7_m6_northeastern_states'] || 0
            },
            {
              id: 'p7_m7_implementation',
              title: 'Implementation Framework & Multi-State Strategy',
              description: 'Build systematic approach to leverage multiple state benefits and create optimized business presence.',
              lessonsCount: 3,
              totalXP: 600,
              isUnlocked: data.moduleProgress?.['p7_m6_northeastern_states'] > 0,
              isCompleted: data.moduleProgress?.['p7_m7_implementation'] === 100,
              progress: data.moduleProgress?.['p7_m7_implementation'] || 0
            },
            {
              id: 'p7_m8_sector_benefits',
              title: 'Sector-Specific State Benefits Mapping',
              description: 'Navigate industry-specific incentives across manufacturing, technology, agriculture, and services sectors.',
              lessonsCount: 3,
              totalXP: 600,
              isUnlocked: data.moduleProgress?.['p7_m7_implementation'] > 0,
              isCompleted: data.moduleProgress?.['p7_m8_sector_benefits'] === 100,
              progress: data.moduleProgress?.['p7_m8_sector_benefits'] || 0
            },
            {
              id: 'p7_m9_financial_planning',
              title: 'Financial Planning & ROI Optimization',
              description: 'Master the art of maximizing state benefits to achieve 30-50% cost savings and optimal ROI.',
              lessonsCount: 3,
              totalXP: 660,
              isUnlocked: data.moduleProgress?.['p7_m8_sector_benefits'] > 0,
              isCompleted: data.moduleProgress?.['p7_m9_financial_planning'] === 100,
              progress: data.moduleProgress?.['p7_m9_financial_planning'] || 0
            },
            {
              id: 'p7_m10_advanced_strategies',
              title: 'Advanced Strategies & Policy Monitoring',
              description: 'Stay ahead with policy tracking, relationship building, and future-proofing strategies.',
              lessonsCount: 3,
              totalXP: 750,
              isUnlocked: data.moduleProgress?.['p7_m9_financial_planning'] > 0,
              isCompleted: data.moduleProgress?.['p7_m10_advanced_strategies'] === 100,
              progress: data.moduleProgress?.['p7_m10_advanced_strategies'] || 0
            }
          ];
          
          setModules(p7Modules);
        } else {
          // Default modules if API fails
          setModules([]);
        }
      } catch (error) {
        logger.error('Failed to fetch P7 progress:', error);
        setModules([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchP7Progress();
    }
  }, [user]);

  const handleStartModule = (moduleId: string) => {
    // Find the module to get the first lesson day
    const module = modules.find(m => m.id === moduleId);
    if (module) {
      // Calculate first day based on module index (3 lessons per module)
      const moduleIndex = modules.indexOf(module);
      const firstDay = (moduleIndex * 3) + 1;
      router.push(`/products/P7/lessons/${firstDay}`);
    }
  };

  const handleContinueProgress = () => {
    // Find the first incomplete lesson
    let nextDay = 1;
    if (overallProgress > 0) {
      // Calculate next lesson based on progress
      const completedLessons = Math.floor((overallProgress / 100) * 30);
      nextDay = Math.min(30, completedLessons + 1);
    }
    router.push(`/products/P7/lessons/${nextDay}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P7">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                P7 Course
              </Badge>
            </div>
            <Heading as="h1" variant="h2" className="text-3xl font-bold">
              State-wise Scheme Map - Complete Navigation
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Master India's state ecosystem with comprehensive coverage of all states and UTs. 
              Navigate 500+ state schemes and achieve 30-50% cost savings through strategic state benefits.
            </Text>
          </div>

          {/* Progress Overview */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {overallProgress}%
                </div>
                <Text size="sm" color="muted">Overall Progress</Text>
                <ProgressBar value={overallProgress} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {totalXPEarned}
                </div>
                <Text size="sm" color="muted">XP Earned / 5,850 Total</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  30
                </div>
                <Text size="sm" color="muted">Total Lessons</Text>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              {overallProgress > 0 && (
                <Button onClick={handleContinueProgress} className="px-8">
                  Continue Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => router.push('/products/P7/resources')}
                className="px-8"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resources
              </Button>
            </div>
          </Card>

          {/* Key Features */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">Live Database</Text>
                  <Text size="sm" color="muted">Real-time access</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-green-600" />
                <div>
                  <Text weight="medium">Smart Search</Text>
                  <Text size="sm" color="muted">Find matching schemes</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-purple-600" />
                <div>
                  <Text weight="medium">All 36 States/UTs</Text>
                  <Text size="sm" color="muted">Complete coverage</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-600" />
                <div>
                  <Text weight="medium">376+ Schemes</Text>
                  <Text size="sm" color="muted">Verified database</Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Comprehensive Scheme Database */}
          <Card className="p-6">
            <div className="mb-6">
              <Heading as="h2" variant="h3" className="mb-2">
                State Schemes Database - Live Access
              </Heading>
              <Text color="muted">
                Explore our comprehensive database of 376+ verified state schemes across all 36 states and UTs. 
                Filter by location, sector, funding amount, and scheme type to find opportunities matching your business needs.
              </Text>
            </div>
            <ComprehensiveSchemeDatabase 
              productCode="P7" 
              showFilters={true}
              limit={12}
            />
          </Card>

          {/* Modules */}
          <div className="space-y-6">
            <Heading as="h2" variant="h3">
              Course Modules
            </Heading>
            
            <div className="grid gap-6">
              {modules.map((module, index) => (
                <Card key={module.id} className={`p-6 transition-all ${
                  module.isUnlocked 
                    ? 'hover:shadow-md border-blue-200' 
                    : 'opacity-60 bg-gray-50'
                }`}>
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
                        <Heading as="h3" variant="h4">
                          {module.title}
                        </Heading>
                        {module.isUnlocked && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Unlocked
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
                          {Math.ceil(module.lessonsCount * 1.5)} hours
                        </div>
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
                        onClick={() => handleStartModule(module.id)}
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

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
            <Heading as="h2" variant="h3" className="text-white mb-4">
              Ready to Master India's State Ecosystem?
            </Heading>
            <Text className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start with Module 1 to unlock strategic state benefits and achieve 30-50% cost savings 
              through systematic state scheme navigation.
            </Text>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleStartModule('p7_m1_federal_structure')}
              className="bg-white text-blue-700 hover:bg-gray-50"
            >
              Start Your State Mastery Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}