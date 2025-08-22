'use client';

import React, { useState, useEffect } from 'react';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import P10CourseInterface from '@/components/P10CourseInterface';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  Scale, 
  Shield, 
  AlertCircle,
  Loader2,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Target,
  Award,
  Users,
  Globe,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { logger } from '@/lib/logger';

interface LoadingState {
  isLoading: boolean;
  error: string | null;
  hasAccess: boolean;
}

export default function P10PatentMasteryPage() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
    hasAccess: false
  });

  useEffect(() => {
    checkAccessAndLoadData();
  }, []);

  const checkAccessAndLoadData = async () => {
    try {
      setLoadingState(prev => ({ ...prev, isLoading: true, error: null }));

      // Check access to P10
      const response = await fetch('/api/products/p10/access');
      
      if (!response.ok) {
        if (response.status === 401) {
          // User not logged in - redirect to login
          window.location.href = '/login?redirect=/products/p10';
          return;
        } else if (response.status === 403) {
          // User doesn't have access to P10
          setLoadingState({
            isLoading: false,
            error: 'Access denied. Purchase P10: Patent Mastery to continue.',
            hasAccess: false
          });
          return;
        } else {
          throw new Error('Failed to check access');
        }
      }

      const accessData = await response.json();
      
      if (accessData.hasAccess) {
        setLoadingState({
          isLoading: false,
          error: null,
          hasAccess: true
        });
      } else {
        setLoadingState({
          isLoading: false,
          error: 'Access denied. Purchase P10: Patent Mastery to continue.',
          hasAccess: false
        });
      }

    } catch (error) {
      logger.error('Error checking P10 access:', error);
      setLoadingState({
        isLoading: false,
        error: 'Failed to load course. Please try again.',
        hasAccess: false
      });
    }
  };

  // Loading state
  if (loadingState.isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="mb-6">
              <Scale className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
              <div className="flex items-center justify-center gap-2 mb-4">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="text-lg font-medium text-gray-900">
                  Loading P10: Patent Mastery
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <span>Checking course access...</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <span>Loading patent management system...</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <span>Preparing IP tools and resources...</span>
              </div>
            </div>

            {/* Quick Info while loading */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">What You'll Get:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 60-day comprehensive patent strategy</li>
                <li>• 100+ professional templates & tools</li>
                <li>• Expert network access</li>
                <li>• Patent portfolio management</li>
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Access denied state
  if (!loadingState.hasAccess) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Scale className="h-16 w-16 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                P10: Patent Mastery for Indian Startups
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Master intellectual property from filing to monetization with comprehensive patent strategy development
              </p>
            </div>

            {/* Access Required Alert */}
            <Alert className="mb-8 border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Course Access Required:</strong> {loadingState.error}
              </AlertDescription>
            </Alert>

            {/* Course Preview */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* Course Highlights */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-blue-900">Course Highlights</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900">12 Comprehensive Modules</p>
                        <p className="text-sm text-blue-700">60-day structured learning path</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900">100+ Professional Templates</p>
                        <p className="text-sm text-blue-700">Worth ₹50,000+ if purchased separately</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900">Interactive IP Tools</p>
                        <p className="text-sm text-blue-700">Prior art search, ROI calculator, portfolio analyzer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900">Expert Network Access</p>
                        <p className="text-sm text-blue-700">50+ patent attorneys and IP strategists</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Outcomes */}
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                    <h2 className="text-xl font-bold text-green-900">Learning Outcomes</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-900">Filed Patent Applications</p>
                        <p className="text-sm text-green-700">Professional applications with strong claims</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-900">Complete IP Strategy</p>
                        <p className="text-sm text-green-700">5-year roadmap with portfolio management</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-900">Monetization Capabilities</p>
                        <p className="text-sm text-green-700">Licensing strategies and revenue generation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-green-900">Global Filing Strategy</p>
                        <p className="text-sm text-green-700">International expansion optimization</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Module Overview */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  12-Module Learning Journey
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Patent Fundamentals", days: "1-5", icon: Lightbulb },
                    { title: "Pre-Filing Strategy", days: "6-10", icon: Target },
                    { title: "Filing Process Mastery", days: "11-16", icon: Scale },
                    { title: "Prosecution & Examination", days: "17-22", icon: Shield },
                    { title: "Portfolio Management", days: "23-27", icon: Users },
                    { title: "Commercialization", days: "28-33", icon: Award },
                    { title: "Industry Strategies", days: "34-38", icon: Globe },
                    { title: "International Filing", days: "39-43", icon: Globe },
                    { title: "Cost Management", days: "44-45", icon: Target },
                    { title: "Advanced Litigation", days: "46-50", icon: Scale },
                    { title: "Advanced Prosecution", days: "51-55", icon: Shield },
                    { title: "Emerging Technologies", days: "56-60", icon: Lightbulb }
                  ].map((module, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <module.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{module.title}</h3>
                      <p className="text-xs text-gray-600">Days {module.days}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Access to P10 - ₹7,999
                  </Button>
                </Link>
                
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View All Courses
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Or get access to all courses with the 
                  <Link href="/pricing" className="text-blue-600 hover:underline font-medium mx-1">
                    All-Access Bundle (₹54,999)
                  </Link> 
                  - Save ₹25,986
                </p>
              </div>
            </div>

            {/* Related Courses */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-lg font-semibold mb-4 text-center">You might also be interested in:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/products/p5">
                  <Card className="hover:border-blue-300 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-green-600" />
                        <div>
                          <h4 className="font-semibold">P5: Legal Stack</h4>
                          <p className="text-sm text-gray-600">Bulletproof legal framework with IP protection</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/products/p8">
                  <Card className="hover:border-blue-300 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Award className="h-8 w-8 text-purple-600" />
                        <div>
                          <h4 className="font-semibold">P8: Data Room Mastery</h4>
                          <p className="text-sm text-gray-600">Professional data room for fundraising</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // User has access - show the full course interface
  return (
    <ProductProtectedRoute productCode="P10">
      <DashboardLayout>
        <P10CourseInterface />
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}