'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Alert } from '@/components/ui/Alert';
import { 
  Shield, 
  FileText, 
  Building, 
  Scale, 
  BookOpen,
  CheckCircle,
  Calendar,
  ArrowRight,
  Star,
  Award,
  Crown,
  Zap,
  Users,
  DollarSign,
  Briefcase,
  Lock,
  Settings,
  AlertTriangle,
  CheckSquare,
  Gavel
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  estimatedTime: number;
  xpReward: number;
  orderIndex: number;
  completed: boolean;
  isLocked: boolean;
}

interface ProductData {
  hasAccess: boolean;
  product: {
    code: string;
    title: string;
    description: string;
  };
  modules: Module[];
  totalModules: number;
  totalLessons: number;
}

export default function IncorporationCompliancePage() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('/api/products/P2/modules');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch modules');
        }
        
        setProductData(data);
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError(err instanceof Error ? err.message : 'Failed to load course data');
        
        // Fallback to mock data structure for display
        setProductData({
          hasAccess: false,
          product: {
            code: 'P2',
            title: 'Incorporation & Compliance Kit - Complete',
            description: 'Master Indian business incorporation and ongoing compliance'
          },
          modules: [],
          totalModules: 10,
          totalLessons: 40
        });
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleStartLesson = (moduleId: string) => {
    if (!productData) return;
    
    // Find the module and its first lesson
    const targetModule = productData.modules.find(m => m.id === moduleId);
    if (targetModule && targetModule.lessons.length > 0) {
      const firstLesson = targetModule.lessons.sort((a, b) => a.orderIndex - b.orderIndex)[0];
      // Navigate to lesson page - you can implement this route
      window.location.href = `/incorporation-compliance/lessons/${firstLesson.id}`;
    }
  };

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
      <ProductProtectedRoute productCode="P2">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Shield className="w-4 h-4" />
                COMPLETE KIT
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2 mt-8">
              <Shield className="w-6 h-6 text-green-600" />
              <Badge variant="outline" className="bg-green-100 text-green-800">
                P2 Complete Kit
              </Badge>
            </div>
            <Heading as="h1" variant="h2" className="text-3xl font-bold">
              Incorporation & Compliance Kit - Complete
            </Heading>
            <Text size="lg" color="muted" className="max-w-3xl mx-auto">
              Master Indian business incorporation and ongoing compliance. 40-day comprehensive course covering 
              entity selection, filing procedures, tax registrations, labor law compliance, and ongoing management with 150+ templates.
            </Text>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                40 Days Comprehensive
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                150+ Templates
              </div>
              <div className="flex items-center gap-1">
                <Scale className="w-4 h-4" />
                Legal Compliance Focus
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="warning" className="mb-6">
              {error}
            </Alert>
          )}

          {/* Progress Overview */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {calculateOverallProgress()}%
                </div>
                <Text size="sm" color="muted">Course Progress</Text>
                <ProgressBar value={calculateOverallProgress()} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {calculateTotalXP()}
                </div>
                <Text size="sm" color="muted">XP Earned</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {productData?.totalLessons || 40}
                </div>
                <Text size="sm" color="muted">Comprehensive Lessons</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {productData?.totalModules || 10}
                </div>
                <Text size="sm" color="muted">Complete Modules</Text>
              </div>
            </div>
          </Card>

          {/* Course Features Showcase */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500">
            <Heading as="h2" variant="h4" className="mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Master Legal Foundation & Compliance
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-green-600" />
                <div>
                  <Text weight="medium">Entity Selection Mastery</Text>
                  <Text size="sm" color="muted">Choose optimal business structure</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <Text weight="medium">Incorporation Process</Text>
                  <Text size="sm" color="muted">SPICe+, forms, and filing mastery</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <div>
                  <Text weight="medium">Tax Compliance</Text>
                  <Text size="sm" color="muted">PAN, TAN, GST, and tax registrations</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <Text weight="medium">Labor Law Compliance</Text>
                  <Text size="sm" color="muted">EPF, ESI, and employment laws</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-red-600" />
                <div>
                  <Text weight="medium">IP Protection</Text>
                  <Text size="sm" color="muted">Trademarks, copyrights, and NDAs</Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-gray-600" />
                <div>
                  <Text weight="medium">Ongoing Compliance</Text>
                  <Text size="sm" color="muted">Management systems and audits</Text>
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
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {productData?.totalModules || 0} Complete Modules
              </Badge>
            </div>
            
            {productData?.modules && productData.modules.length > 0 ? (
              <div className="grid gap-6">
                {productData.modules.map((module, index) => {
                  const isUnlocked = index === 0 || (index > 0 && productData.modules[index - 1].progress === 100);
                  const isCompleted = module.progress === 100;
                  
                  return (
                    <Card key={module.id} className={`p-6 transition-all ${
                      isUnlocked 
                        ? 'hover:shadow-md border-green-200' 
                        : 'opacity-60 bg-gray-50'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              isCompleted 
                                ? 'bg-green-100 text-green-800' 
                                : isUnlocked 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="w-5 h-5 text-gray-600" />
                              <Heading as="h3" variant="h4">
                                {module.title}
                              </Heading>
                            </div>
                            {isUnlocked && (
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
                              {module.totalLessons} lessons
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              {module.lessons.reduce((sum, lesson) => sum + lesson.xpReward, 0)} XP
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {Math.ceil(module.totalLessons * 2)} hours
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
                            variant={isUnlocked ? "primary" : "outline"}
                            disabled={!isUnlocked}
                            onClick={() => handleStartLesson(module.id)}
                            className="whitespace-nowrap"
                          >
                            {isCompleted ? 'Review' : module.progress > 0 ? 'Continue' : 'Start'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Text color="muted">
                  {error ? 'Unable to load course modules. Please try again later.' : 'Loading course modules...'}
                </Text>
              </Card>
            )}
          </div>

          {/* Value Proposition */}
          <Card className="p-8 bg-gradient-to-r from-green-600 to-blue-700 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-yellow-300" />
              <Heading as="h2" variant="h3" className="text-white">
                Build a Rock-Solid Legal Foundation
              </Heading>
            </div>
            <Text className="text-green-100 mb-6 max-w-3xl mx-auto">
              Join thousands of founders who built legally compliant businesses from day one. Avoid costly mistakes, 
              penalties, and legal issues with our comprehensive incorporation and compliance framework.
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">150+</Text>
                <Text className="text-green-100">Legal Templates</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">40</Text>
                <Text className="text-green-100">Comprehensive Lessons</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">10</Text>
                <Text className="text-green-100">Complete Modules</Text>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Text className="text-2xl font-bold text-yellow-300">6,660</Text>
                <Text className="text-green-100">Total XP Available</Text>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => handleStartLesson('p2_m1_structure_fundamentals')}
              className="bg-white text-green-700 hover:bg-gray-50"
            >
              Start Your Legal Foundation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}