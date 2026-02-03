'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  Target,
  Users,
  TrendingUp,
  Award,
  Globe,
  Building,
  FileText,
  CheckCircle,
  Lock,
  Play,
  Download,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Briefcase,
  MessageSquare,
  Clock,
  Star,
  Zap,
  Layers,
  GraduationCap
} from 'lucide-react';
import { COURSE_CONTENT_STATS, ContentStatsRow } from '@/components/courses/CourseContentBreakdown';

// Product-specific configurations
export interface CourseConfig {
  // Hero section
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  badgeText: string;
  badgeBgColor: string;
  badgeTextColor: string;

  // Stats
  stats: Array<{
    value: string;
    label: string;
  }>;

  // Achievements
  achievements: string[];

  // Features
  features: Array<{
    icon: React.ReactNode;
    text: string;
  }>;

  // Journey steps
  journeySteps: Array<{
    title: string;
    description: string;
    color: string;
  }>;

  // Resources
  resources: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    buttonIcon: React.ReactNode;
  }>;

  // Community stats
  communityStats: Array<{
    value: string;
    label: string;
    color: string;
  }>;

  // CTA
  ctaText: string;
  ctaSubtext: string;
  price: string;
}

// Default configuration that can be extended
export const defaultCourseConfig: Partial<CourseConfig> = {
  gradientFrom: 'from-blue-900',
  gradientVia: 'via-blue-800',
  gradientTo: 'to-indigo-900',
  badgeBgColor: 'bg-yellow-500',
  badgeTextColor: 'text-black',
};

interface GenericCourseInterfaceProps {
  courseData: {
    product: {
      code: string;
      title: string;
      description: string;
      price: number;
      modules?: Array<{
        id: string;
        title: string;
        description: string;
        lessons?: Array<{
          id: string;
          day: number;
          title: string;
          briefContent: string;
          actionItems?: string[];
          resources?: Record<string, string[]> | string[];
          xpReward: number;
        }>;
      }>;
    };
    hasAccess: boolean;
    userProgress: Record<string, { completed: boolean }>;
  };
  config: CourseConfig;
}

export function GenericCourseInterface({ courseData, config }: GenericCourseInterfaceProps) {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const { product, hasAccess, userProgress } = courseData || {};

  const completedLessons = Object.values(userProgress || {}).filter((p) => p.completed).length;
  const totalLessons = product?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Get course content stats
  const courseStats = product?.code ? COURSE_CONTENT_STATS[product.code] : null;
  const totalModules = product?.modules?.length || courseStats?.moduleCount || 0;
  const templateCount = courseStats?.templateCount || 50;
  const estimatedDays = courseStats?.estimatedDays || 30;

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'modules', label: 'Course Content' },
    { id: 'resources', label: 'Resources' },
    { id: 'community', label: 'Community' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${config.gradientFrom} ${config.gradientVia} ${config.gradientTo} text-white`}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <Badge className={`mb-4 ${config.badgeBgColor} ${config.badgeTextColor}`}>
              {config.badgeText}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {product?.title}
            </h1>
            <p className="text-xl mb-6 opacity-90">
              {product?.description}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {config.stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            {hasAccess && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Your Progress</span>
                  <span className="text-sm">{completedLessons}/{totalLessons} Lessons</span>
                </div>
                <div className="bg-white/20 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            {tabItems.map(item => (
              <TabsTrigger key={item.id} value={item.id}>{item.label}</TabsTrigger>
            ))}
          </TabsList>
          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* What's Included Section */}
            <Card className="p-6 mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                What's Included in This Course
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Layers className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{totalModules}</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{totalLessons || courseStats?.lessonCount || 0}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{templateCount}+</div>
                  <div className="text-sm text-gray-600">Templates</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700">{Math.round((totalLessons || courseStats?.lessonCount || 30) * 1.5)}</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
              </div>

              {/* Additional Value Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Learning Duration</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Complete in <span className="font-semibold text-gray-900">{estimatedDays} days</span> with daily action plans
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Downloadable Resources</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{templateCount + (courseStats?.toolCount || 10)}+</span> templates, tools, and checklists included
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* What You Will Achieve */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  What You Will Achieve
                </h3>
                <ul className="space-y-3">
                  {config.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Key Features */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Exclusive Features
                </h3>
                <ul className="space-y-3">
                  {config.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Success Journey */}
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">Your Learning Journey</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {config.journeySteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className={`bg-${step.color}-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3`}>
                      <span className={`text-2xl font-bold text-${step.color}-600`}>{index + 1}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules">
            <div className="space-y-4">
              {product?.modules?.map((module, index) => (
                <Card key={module.id} className="overflow-hidden">
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{module.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          activeModule === index ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {activeModule === index && (
                    <div className="border-t">
                      {module.lessons?.map((lesson) => {
                        const isCompleted = userProgress?.[lesson.id]?.completed;
                        const isLocked = !hasAccess;

                        return (
                          <div
                            key={lesson.id}
                            className={`p-4 border-b last:border-b-0 ${
                              isLocked ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'
                            } transition-colors`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`mt-1 ${
                                  isCompleted ? 'text-green-500' : isLocked ? 'text-gray-400' : 'text-gray-300'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : isLocked ? (
                                    <Lock className="w-5 h-5" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-current" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-gray-500">
                                      Day {lesson.day}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {lesson.xpReward} XP
                                    </Badge>
                                  </div>
                                  <h4 className="font-medium mb-2">{lesson.title}</h4>
                                  <p className="text-sm text-gray-600 mb-3">{lesson.briefContent}</p>

                                  {!isLocked && (
                                    <Button
                                      onClick={() => setExpandedLesson(
                                        expandedLesson === lesson.id ? null : lesson.id
                                      )}
                                      variant="outline"
                                      size="sm"
                                    >
                                      <BookOpen className="w-4 h-4 mr-2" />
                                      View Details
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {expandedLesson === lesson.id && (
                              <div className="mt-4 pl-8 space-y-4">
                                {/* Action Items */}
                                {lesson.actionItems && lesson.actionItems.length > 0 && (
                                  <div>
                                    <h5 className="font-medium mb-2 text-sm text-gray-700">Action Items:</h5>
                                    <ul className="space-y-1">
                                      {lesson.actionItems.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                          <span className="text-green-500 mt-0.5">•</span>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Resources */}
                                {lesson.resources && (
                                  <div>
                                    <h5 className="font-medium mb-2 text-sm text-gray-700">Resources:</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {Array.isArray(lesson.resources) ? (
                                        lesson.resources.map((item, i) => (
                                          <Badge key={i} variant="secondary" className="text-xs">
                                            {item}
                                          </Badge>
                                        ))
                                      ) : (
                                        Object.entries(lesson.resources).map(([key, items]) =>
                                          (items as string[])?.map((item, i) => (
                                            <Badge key={`${key}-${i}`} variant="secondary" className="text-xs">
                                              {item}
                                            </Badge>
                                          ))
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                                <Button className="w-full sm:w-auto">
                                  <Play className="w-4 h-4 mr-2" />
                                  Start Lesson
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              ))}

              {(!product?.modules || product.modules.length === 0) && (
                <Card className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Course Content Loading</h3>
                  <p className="text-gray-600">
                    Course modules and lessons are being prepared. Check back soon!
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.resources.map((resource, index) => (
                <Card key={index} className="p-6">
                  {resource.icon}
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {resource.buttonIcon}
                    {resource.buttonText}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <Card className="p-8 text-center">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Connect with fellow entrepreneurs, share experiences, get advice,
                and build strategic partnerships in our exclusive community.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {config.communityStats.map((stat, index) => (
                  <div key={index}>
                    <div className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Button size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Join Community Discussions
              </Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        {!hasAccess && (
          <Card className={`mt-8 p-8 bg-gradient-to-r ${config.gradientFrom.replace('from-', 'from-')}-50 to-blue-50 border-blue-200`}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{config.ctaText}</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {config.ctaSubtext}
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Instant Access - {config.price}
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                30-day money-back guarantee • Lifetime updates included
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// Pre-built configurations for common course types
export const courseConfigs: Record<string, CourseConfig> = {
  P3: {
    gradientFrom: 'from-purple-900',
    gradientVia: 'via-purple-800',
    gradientTo: 'to-indigo-900',
    badgeText: 'COMPLETE FUNDING MASTERY',
    badgeBgColor: 'bg-yellow-500',
    badgeTextColor: 'text-black',
    stats: [
      { value: '12', label: 'Modules' },
      { value: '45', label: 'Days' },
      { value: '₹5Cr+', label: 'Funding Range' },
      { value: '87%', label: 'Success Rate' }
    ],
    achievements: [
      'Master government funding from grants to venture capital',
      'Build investor-ready pitch materials',
      'Create 18-month funding roadmap',
      'Understand term sheets and deal structures',
      'Access active funding pipeline'
    ],
    features: [
      { icon: <Building className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Government grants ₹20L-₹5Cr coverage' },
      { icon: <Users className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'Angel investment strategies' },
      { icon: <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />, text: 'VC funding roadmap' },
      { icon: <FileText className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Term sheet generator' },
      { icon: <Zap className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Interactive calculators' }
    ],
    journeySteps: [
      { title: 'Foundation', description: 'Understand funding landscape', color: 'purple' },
      { title: 'Government', description: 'Master non-dilutive funding', color: 'blue' },
      { title: 'Private', description: 'Angels & VCs strategy', color: 'green' },
      { title: 'Scale', description: 'Growth funding mastery', color: 'orange' }
    ],
    resources: [
      { icon: <FileText className="w-8 h-8 text-purple-600 mb-3" />, title: 'Pitch Deck Templates', description: 'Investor-ready presentation templates', buttonText: 'Download Templates', buttonIcon: <Download className="w-4 h-4 mr-2" /> },
      { icon: <Globe className="w-8 h-8 text-blue-600 mb-3" />, title: 'Investor Database', description: '700+ verified investors with contact details', buttonText: 'Access Database', buttonIcon: <ExternalLink className="w-4 h-4 mr-2" /> },
      { icon: <TrendingUp className="w-8 h-8 text-green-600 mb-3" />, title: 'Financial Models', description: 'Pro forma templates and calculators', buttonText: 'Get Models', buttonIcon: <Download className="w-4 h-4 mr-2" /> }
    ],
    communityStats: [
      { value: '1,000+', label: 'Active Members', color: 'purple' },
      { value: '₹500Cr+', label: 'Funding Raised', color: 'blue' },
      { value: '200+', label: 'Success Stories', color: 'green' }
    ],
    ctaText: 'Ready to Master Funding?',
    ctaSubtext: 'Join 1,000+ founders who have successfully raised funding using our proven frameworks.',
    price: '₹5,999'
  },
  P4: {
    gradientFrom: 'from-green-900',
    gradientVia: 'via-green-800',
    gradientTo: 'to-emerald-900',
    badgeText: 'CFO-LEVEL MASTERY',
    badgeBgColor: 'bg-yellow-500',
    badgeTextColor: 'text-black',
    stats: [
      { value: '12', label: 'Modules' },
      { value: '45', label: 'Days' },
      { value: '100%', label: 'Compliance' },
      { value: 'CFO', label: 'Level Skills' }
    ],
    achievements: [
      'Build world-class financial infrastructure',
      'Master GST compliance and optimization',
      'Create investor-ready reporting systems',
      'Implement FP&A best practices',
      'Manage treasury and banking efficiently'
    ],
    features: [
      { icon: <FileText className="w-5 h-5 text-green-500 mt-0.5" />, text: 'Complete accounting system setup' },
      { icon: <Building className="w-5 h-5 text-blue-500 mt-0.5" />, text: 'GST and MCA compliance frameworks' },
      { icon: <TrendingUp className="w-5 h-5 text-purple-500 mt-0.5" />, text: 'Financial planning & analysis' },
      { icon: <Award className="w-5 h-5 text-orange-500 mt-0.5" />, text: 'Investor-grade reporting' },
      { icon: <Globe className="w-5 h-5 text-pink-500 mt-0.5" />, text: 'Banking & treasury management' }
    ],
    journeySteps: [
      { title: 'Foundation', description: 'Accounting systems', color: 'green' },
      { title: 'Compliance', description: 'GST & tax mastery', color: 'blue' },
      { title: 'Planning', description: 'FP&A implementation', color: 'purple' },
      { title: 'Excellence', description: 'CFO-level systems', color: 'orange' }
    ],
    resources: [
      { icon: <FileText className="w-8 h-8 text-green-600 mb-3" />, title: 'Financial Templates', description: 'Complete financial model library', buttonText: 'Download Templates', buttonIcon: <Download className="w-4 h-4 mr-2" /> },
      { icon: <Building className="w-8 h-8 text-blue-600 mb-3" />, title: 'Compliance Checklists', description: 'GST, TDS, and MCA compliance guides', buttonText: 'Access Checklists', buttonIcon: <ExternalLink className="w-4 h-4 mr-2" /> },
      { icon: <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />, title: 'Dashboard Templates', description: 'Real-time financial dashboards', buttonText: 'Get Dashboards', buttonIcon: <Download className="w-4 h-4 mr-2" /> }
    ],
    communityStats: [
      { value: '500+', label: 'CFOs Trained', color: 'green' },
      { value: '₹100Cr+', label: 'Managed', color: 'blue' },
      { value: '100%', label: 'Compliance', color: 'purple' }
    ],
    ctaText: 'Ready for CFO-Level Finance?',
    ctaSubtext: 'Build financial infrastructure that scales with your startup.',
    price: '₹6,999'
  }
};

export default GenericCourseInterface;
