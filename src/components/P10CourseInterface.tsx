'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Star, 
  Target, 
  TrendingUp,
  FileText,
  Search,
  BarChart3,
  Lightbulb,
  Scale,
  Globe,
  Users,
  Award,
  Shield,
  Zap,
  Download,
  Play,
  Calculator,
  Database,
  Brain,
  Briefcase,
  ArrowRight,
  ChevronRight,
  Lock,
  Sparkles,
  Trophy
} from 'lucide-react';
import { logger } from '@/lib/logger';

interface P10CourseData {
  course: {
    id: string;
    title: string;
    description: string;
    modules: Module[];
  };
  userProgress: {
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    totalXP: number;
    currentStreak: number;
  };
  portfolios: PatentPortfolio[];
  lessonProgress: LessonProgress[];
  accessInfo: {
    hasAccess: boolean;
    purchaseDate: string;
    expiresAt: string;
  };
}

interface Module {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  actionItems: ActionItem[];
  resources: Resource[];
  estimatedTime: number;
  xpReward: number;
}

interface ActionItem {
  title: string;
  description: string;
  timeRequired: string;
  deliverable: string;
}

interface Resource {
  type: 'template' | 'guide' | 'video' | 'tool' | 'calculator';
  title: string;
  description: string;
  url: string;
}

interface PatentPortfolio {
  id: string;
  portfolioName: string;
  description: string;
  totalPatents: number;
  activePatents: number;
  portfolioValue: number;
}

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  xpEarned: number;
}

export default function P10CourseInterface() {
  const [courseData, setCourseData] = useState<P10CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  useEffect(() => {
    loadCourseData();
  }, []);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products/p10');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load course data');
      }

      const data = await response.json();
      setCourseData(data);
      
      if (data.course.modules && data.course.modules.length > 0) {
        setSelectedModule(data.course.modules[0].id);
      }
    } catch (err) {
      logger.error('Error loading P10 course data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return courseData?.lessonProgress.find(p => p.lessonId === lessonId)?.completed || false;
  };

  const getLessonXP = (lessonId: string) => {
    return courseData?.lessonProgress.find(p => p.lessonId === lessonId)?.xpEarned || 0;
  };

  const handleLessonComplete = async (lessonId: string, xpEarned: number) => {
    try {
      const response = await fetch('/api/products/p10', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete_lesson',
          data: { lessonId, xpEarned }
        })
      });

      if (response.ok) {
        await loadCourseData(); // Refresh data
      }
    } catch (error) {
      logger.error('Error completing lesson:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading P10: Patent Mastery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Required</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.href = '/pricing'}>
              Get Access to P10
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!courseData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Scale className="h-8 w-8 text-blue-600" />
                P10: Patent Mastery for Indian Startups
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Master intellectual property from filing to monetization with comprehensive patent strategy
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                60-Day Program
              </Badge>
              <Badge variant="outline" className="text-sm">
                ₹7,999 Value
              </Badge>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-2xl font-bold text-green-600">
                      {courseData.userProgress.progressPercentage}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <Progress 
                  value={courseData.userProgress.progressPercentage} 
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Lessons Completed</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {courseData.userProgress.completedLessons}/{courseData.userProgress.totalLessons}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">XP Earned</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {courseData.userProgress.totalXP}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Streak</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {courseData.userProgress.currentStreak} days
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="tools">IP Tools</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Course Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    What You'll Master
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Complete IP strategy from filing to monetization
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Master Indian Patent Office navigation and procedures
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Professional patent drafting and claims writing
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Global filing strategies and cost optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Portfolio management and licensing excellence
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      Industry-specific patent strategies (AI, biotech, fintech)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Course Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      Filed patent applications with strong claims
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      Complete IP strategy with 5-year roadmap
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      Patent portfolio management system
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      Licensing and monetization capabilities
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      International filing strategy optimization
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      Expert-level patent prosecution skills
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4"
                    onClick={() => setActiveTab('lessons')}
                  >
                    <div className="text-center">
                      <Play className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <p className="font-medium">Start Learning</p>
                      <p className="text-sm text-gray-600">Continue your patent mastery journey</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4"
                    onClick={() => setActiveTab('tools')}
                  >
                    <div className="text-center">
                      <Calculator className="h-6 w-6 mx-auto mb-2 text-green-600" />
                      <p className="font-medium">Use IP Tools</p>
                      <p className="text-sm text-gray-600">Access interactive calculators and tools</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto p-4"
                    onClick={() => setActiveTab('portfolio')}
                  >
                    <div className="text-center">
                      <Briefcase className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                      <p className="font-medium">Manage Portfolio</p>
                      <p className="text-sm text-gray-600">Track your patent applications</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Module Overview */}
            <Card>
              <CardHeader>
                <CardTitle>12 Comprehensive Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courseData.course.modules?.map((module, index) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <h3 className="font-semibold text-sm">{module.title}</h3>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{module.description}</p>
                      <div className="text-xs text-gray-500">
                        {module.lessons?.length || 0} lessons
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Module Navigation */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Modules</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {courseData.course.modules?.map((module, index) => (
                        <button
                          key={module.id}
                          onClick={() => setSelectedModule(module.id)}
                          className={`w-full text-left p-3 text-sm hover:bg-gray-50 transition-colors border-l-4 ${
                            selectedModule === module.id 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                              {index + 1}
                            </span>
                            <span className="font-medium">{module.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lesson Content */}
              <div className="lg:col-span-3">
                {selectedModule && (
                  <div className="space-y-4">
                    {courseData.course.modules
                      ?.find(m => m.id === selectedModule)
                      ?.lessons?.map((lesson) => (
                      <Card key={lesson.id} className="border-2 hover:border-blue-200 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline">Day {lesson.day}</Badge>
                                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                                {isLessonCompleted(lesson.id) && (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{lesson.briefContent}</p>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {lesson.estimatedTime} min
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {lesson.xpReward} XP
                                </div>
                              </div>
                            </div>
                            <div className="ml-4">
                              {isLessonCompleted(lesson.id) ? (
                                <Badge className="bg-green-100 text-green-800">
                                  Completed
                                </Badge>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => handleLessonComplete(lesson.id, lesson.xpReward)}
                                >
                                  Start Lesson
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Action Items */}
                          {lesson.actionItems && lesson.actionItems.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Action Items:</h4>
                              <div className="space-y-2">
                                {lesson.actionItems.map((item, idx) => (
                                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                    <h5 className="font-medium text-sm">{item.title}</h5>
                                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                      <span>⏱️ {item.timeRequired}</span>
                                      <span>📋 {item.deliverable}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Resources */}
                          {lesson.resources && lesson.resources.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Resources:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {lesson.resources.map((resource, idx) => (
                                  <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    className="justify-start h-auto p-2"
                                  >
                                    <div className="flex items-center gap-2">
                                      {resource.type === 'template' && <FileText className="h-4 w-4" />}
                                      {resource.type === 'calculator' && <Calculator className="h-4 w-4" />}
                                      {resource.type === 'video' && <Play className="h-4 w-4" />}
                                      {resource.type === 'tool' && <Zap className="h-4 w-4" />}
                                      <div className="text-left">
                                        <p className="text-xs font-medium">{resource.title}</p>
                                        <p className="text-xs text-gray-500">{resource.type}</p>
                                      </div>
                                    </div>
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* IP Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-blue-600" />
                    Prior Art Search Engine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive search across global patent databases for novelty assessment.
                  </p>
                  <Button className="w-full">
                    Launch Search Tool
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-green-600" />
                    Patentability Checker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    AI-powered assessment for patent eligibility and success probability.
                  </p>
                  <Button variant="outline" className="w-full">
                    Analyze Innovation
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    Cost Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculate filing and maintenance costs across multiple jurisdictions.
                  </p>
                  <Button variant="outline" className="w-full">
                    Calculate Costs
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    Portfolio Analyzer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Analyze patent landscapes and identify white space opportunities.
                  </p>
                  <Button variant="outline" className="w-full">
                    Analyze Market
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                    ROI Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Calculate return on IP investment with scenario modeling.
                  </p>
                  <Button variant="outline" className="w-full">
                    Calculate ROI
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-indigo-600" />
                    Filing Strategy Optimizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimize international filing strategy based on market analysis.
                  </p>
                  <Button variant="outline" className="w-full">
                    Optimize Strategy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            {courseData.portfolios && courseData.portfolios.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courseData.portfolios.map((portfolio) => (
                  <Card key={portfolio.id} className="border-2 border-gray-200">
                    <CardHeader>
                      <CardTitle>{portfolio.portfolioName}</CardTitle>
                      <p className="text-sm text-gray-600">{portfolio.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{portfolio.totalPatents}</p>
                          <p className="text-xs text-gray-600">Total Patents</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{portfolio.activePatents}</p>
                          <p className="text-xs text-gray-600">Active</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">
                            ₹{Math.round(portfolio.portfolioValue / 100000)}L
                          </p>
                          <p className="text-xs text-gray-600">Value</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Manage Portfolio
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Patent Portfolio Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start building your patent portfolio by creating your first application.
                  </p>
                  <Button>
                    Create Portfolio
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Templates Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      IP Strategy Canvas
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Patent Application Templates
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Licensing Agreement Templates
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Portfolio Management Tools
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Expert Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>50+ Patent Attorneys</li>
                    <li>20+ IP Strategists</li>
                    <li>15+ Technology Experts</li>
                    <li>Direct consultation access</li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Find Expert
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Knowledge Base
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>100+ Case Studies</li>
                    <li>Patent Law Updates</li>
                    <li>Industry Best Practices</li>
                    <li>International Filing Guides</li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Browse Library
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}