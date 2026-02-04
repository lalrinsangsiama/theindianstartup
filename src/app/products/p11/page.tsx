'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  Palette, 
  Users, 
  Megaphone, 
  Award, 
  Clock, 
  CheckCircle, 
  Lock,
  Play,
  BookOpen,
  TrendingUp,
  Star,
  Target,
  Eye,
  Calendar,
  FileText,
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useUserProducts } from '@/hooks/useUserProducts';
import BrandStrategyCalculator from '@/components/branding/BrandStrategyCalculator';
import PRCampaignManager from '@/components/branding/PRCampaignManager';
import BrandAssetGenerator from '@/components/branding/BrandAssetGenerator';
import MediaRelationshipManager from '@/components/branding/MediaRelationshipManager';
import BrandingErrorBoundary from '@/components/branding/BrandingErrorBoundary';
import P11Navigation from '@/components/branding/P11Navigation';
import BrandingLoadingState from '@/components/branding/BrandingLoadingState';

interface Module {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  lessonCount: number;
  completedLessons: number;
  estimatedTime: number;
  progress: number;
}

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent?: string;
  actionItems?: string[];
  resources?: Array<{title: string; type: string; isPremium?: boolean}>;
  estimatedTime: number;
  xpReward: number;
  completed: boolean;
  locked: boolean;
  orderIndex: number;
}

const P11BrandingPRPage: React.FC = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthContext();
  const { hasAccess, loading: accessLoading } = useUserProducts();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasP11Access = hasAccess('P11');

  useEffect(() => {
    if (!authLoading && !accessLoading && hasP11Access) {
      fetchModules();
    }
  }, [authLoading, accessLoading, hasP11Access]);

  const fetchModules = async () => {
    try {
      const response = await fetch('/api/products/p11/modules');
      if (!response.ok) throw new Error('Failed to fetch modules');
      
      const data = await response.json();
      if (data.success) {
        setModules(data.modules);
      }
    } catch (err) {
      setError('Failed to load course modules');
      logger.error('Error fetching modules:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleLessons = async (moduleId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/p11/modules/${moduleId}/lessons`);
      if (!response.ok) throw new Error('Failed to fetch lessons');
      
      const data = await response.json();
      if (data.success) {
        setLessons(data.lessons);
        setSelectedModule(modules.find(m => m.id === moduleId) || null);
      }
    } catch (err) {
      setError('Failed to load module lessons');
      logger.error('Error fetching lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || accessLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrandingLoadingState 
          message="Loading P11 Branding & PR Mastery course..."
          type="default"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-4">Please sign in to access the P11 Branding & PR Mastery course.</p>
            <Button onClick={() => router.push('/login')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasP11Access) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Crown className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-4">Premium Course Access Required</h2>
            <p className="text-gray-600 mb-4">
              Get access to P11 Branding & PR Mastery with 93 lessons, 12 modules, and premium resources for incredible value.
            </p>
            <div className="space-y-2 mb-4">
              <Button onClick={() => router.push('/pricing')} className="w-full">
                Unlock P11 Premium - ₹7,999
              </Button>
              <Button variant="outline" onClick={() => router.push('/pricing')} className="w-full">
                View All Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Branding & PR Mastery</h1>
              <p className="text-gray-600">
                Transform into a recognized industry leader with 93 comprehensive lessons, 12 expert modules, and real media contacts
              </p>
            </div>
          </div>
          
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold">93</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold">54</div>
                <div className="text-sm text-gray-600">Days</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-lg font-bold">12</div>
                <div className="text-sm text-gray-600">Modules</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold">₹7,999</div>
                <div className="text-sm text-gray-600">Value</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="mb-6">
          <P11Navigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showBackButton={true}
          />
        </div>

        {/* Course Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  What You'll Master
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Real Media Contact Database</h3>
                        <p className="text-sm text-gray-600">500+ verified journalist contacts with emails and beat information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Complete "How to Get Written About" System</h3>
                        <p className="text-sm text-gray-600">HERO framework system for consistent media coverage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Success Guarantee Program</h3>
                        <p className="text-sm text-gray-600">5+ media mentions, 1+ award win, or money back guarantee</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">25 Pitch Templates + 15 PR Formats</h3>
                        <p className="text-sm text-gray-600">Proven templates with 45% open rate success</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Advanced Financial Communications</h3>
                        <p className="text-sm text-gray-600">M&A PR, investor relations, and public company readiness</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Monthly Masterclasses + 1-on-1 Mentorship</h3>
                        <p className="text-sm text-gray-600">Live expert sessions and 3 personal mentorship calls included</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Premium Tools & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">Brand Strategy Calculator</h3>
                    <p className="text-xs text-gray-600">AI-powered brand analysis</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <Megaphone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">PR Campaign Manager</h3>
                    <p className="text-xs text-gray-600">End-to-end campaign tracking</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <Palette className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">Brand Asset Generator</h3>
                    <p className="text-xs text-gray-600">Professional design tools</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">500+ Media Contacts</h3>
                    <p className="text-xs text-gray-600">Verified journalist database</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Template Library Access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Access 300+ professional brand and PR templates worth ₹1,50,000+
                </p>
                <Button 
                  onClick={() => window.open('/branding/templates', '_blank')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Open Template Library
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Interactive Tools */}
        {activeTab === 'brand-strategy' && (
          <BrandingErrorBoundary>
            <React.Suspense fallback={<BrandingLoadingState type="brand-strategy" />}>
              <BrandStrategyCalculator />
            </React.Suspense>
          </BrandingErrorBoundary>
        )}
        {activeTab === 'pr-campaigns' && (
          <BrandingErrorBoundary>
            <React.Suspense fallback={<BrandingLoadingState type="pr-campaign" />}>
              <PRCampaignManager />
            </React.Suspense>
          </BrandingErrorBoundary>
        )}
        {activeTab === 'brand-assets' && (
          <BrandingErrorBoundary>
            <React.Suspense fallback={<BrandingLoadingState type="brand-assets" />}>
              <BrandAssetGenerator />
            </React.Suspense>
          </BrandingErrorBoundary>
        )}
        {activeTab === 'media-relations' && (
          <BrandingErrorBoundary>
            <React.Suspense fallback={<BrandingLoadingState type="media-relations" />}>
              <MediaRelationshipManager />
            </React.Suspense>
          </BrandingErrorBoundary>
        )}

        {/* Modules View */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            {!selectedModule ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Course Modules ({modules.length})</CardTitle>
                    <p className="text-sm text-gray-600">
                      Complete 12 comprehensive modules covering all aspects of branding and public relations
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {loading ? (
                        <div className="col-span-2 text-center py-8">
                          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p>Loading modules...</p>
                        </div>
                      ) : modules.length === 0 ? (
                        <div className="col-span-2 text-center py-8">
                          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600">No modules found</p>
                        </div>
                      ) : (
                        modules.map((module, index) => (
                          <Card 
                            key={module.id} 
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => fetchModuleLessons(module.id)}
                          >
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <CardTitle className="text-lg">{module.title}</CardTitle>
                                    <p className="text-sm text-gray-600">{module.description}</p>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{module.progress}%</span>
                                </div>
                                <Progress value={module.progress} className="h-2" />
                                
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                  <div className="flex items-center gap-4">
                                    <span>{module.lessonCount} lessons</span>
                                    <span>{module.estimatedTime}min</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {module.progress === 100 && (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    )}
                                    <Button size="sm" variant="outline">
                                      Start Module
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Module Lessons View */
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedModule.title}</CardTitle>
                        <p className="text-gray-600">{selectedModule.description}</p>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedModule(null)}>
                        ← Back to Modules
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{lessons.length}</div>
                        <div className="text-sm text-gray-600">Total Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{lessons.filter(l => l.completed).length}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{selectedModule.progress}%</div>
                        <div className="text-sm text-gray-600">Progress</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lessons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lessons.map((lesson) => (
                        <div 
                          key={lesson.id}
                          className={`p-4 border rounded-lg ${lesson.locked ? 'opacity-50' : 'cursor-pointer hover:shadow-md'} transition-all`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                                {lesson.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : lesson.locked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Play className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold">Day {lesson.day}: {lesson.title}</h3>
                                <p className="text-sm text-gray-600">{lesson.briefContent}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{lesson.estimatedTime}min</span>
                              <span>+{lesson.xpReward} XP</span>
                              {!lesson.locked && (
                                <Button size="sm" variant="outline">
                                  {lesson.completed ? 'Review' : 'Start'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default P11BrandingPRPage;