'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  Shield, 
  Calculator, 
  FileText, 
  TrendingUp, 
  CheckCircle,
  Calendar,
  BookOpen,
  ArrowRight,
  Star,
  Award
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

export default function GovernmentSchemesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);

  useEffect(() => {
    // Simulate loading modules and progress from API
    const mockModules: Module[] = [
      {
        id: 'p9_m1_foundation',
        title: 'Foundation & Ecosystem Navigation',
        description: 'Master the ₹2.5L crore ecosystem, 23-ministry navigation, and your personal benefits calculator',
        lessonsCount: 5,
        totalXP: 375,
        isUnlocked: true,
        isCompleted: false,
        progress: 0
      },
      {
        id: 'p9_m2_funding',
        title: 'The Money Map - Funding Strategies',
        description: 'Deep-dive into grants, loans, equity with real case studies and stacking strategies for ₹2-5Cr combinations',
        lessonsCount: 7,
        totalXP: 525,
        isUnlocked: false,
        isCompleted: false,
        progress: 0
      },
      {
        id: 'p9_m3_advantages',
        title: 'Category & Sector Mastery',
        description: 'Unlock enhanced benefits: Women (+10%), SC/ST (+20%), Manufacturing PLI, Tech exemptions, State bonuses',
        lessonsCount: 5,
        totalXP: 375,
        isUnlocked: false,
        isCompleted: false,
        progress: 0
      },
      {
        id: 'p9_m4_implementation',
        title: 'Implementation Mastery & Tools',
        description: 'Master application systems, documentation mastery, GeM access, and your 90-day ₹10-50L roadmap',
        lessonsCount: 4,
        totalXP: 300,
        isUnlocked: false,
        isCompleted: false,
        progress: 0
      }
    ];

    setModules(mockModules);
    setLoading(false);
  }, []);

  const handleStartLesson = (moduleId: string) => {
    // Navigate to first lesson of module
    console.log('Starting module:', moduleId);
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
      <ProductProtectedRoute productCode="P9">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                P9 Course
              </Badge>
            </div>
            <Heading as="h1" variant="h2" className="text-3xl font-bold">
              Government Schemes & Funding Mastery
            </Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Master access to ₹50L-₹5Cr government funding through 100+ schemes. 
              Includes detailed case studies, calculators, and proven templates.
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
                <Text size="sm" color="muted">XP Earned / 1,575 Total</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  21
                </div>
                <Text size="sm" color="muted">Total Lessons</Text>
              </div>
            </div>
          </Card>

          {/* Key Features */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">Benefits Calculator</Text>
                  <Text size="sm" color="muted">₹85.5L+ potential</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <Text weight="medium">30+ Templates</Text>
                  <Text size="sm" color="muted">Ready applications</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <div>
                  <Text weight="medium">Real Case Studies</Text>
                  <Text size="sm" color="muted">₹45L+ success stories</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-600" />
                <div>
                  <Text weight="medium">100+ Schemes</Text>
                  <Text size="sm" color="muted">Complete database</Text>
                </div>
              </div>
            </div>
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

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
            <Heading as="h2" variant="h3" className="text-white mb-4">
              Ready to Access ₹50L-₹5Cr in Government Funding?
            </Heading>
            <Text className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start with Module 1 to unlock the complete system used by entrepreneurs 
              who accessed ₹45L+ in government benefits.
            </Text>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleStartLesson('p9_m1_foundation')}
              className="bg-white text-blue-700 hover:bg-gray-50"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}