'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  CheckCircle2, 
  Lock,
  ChevronRight,
  ArrowLeft,
  Play,
  FileText,
  Download,
  Calculator,
  Users,
  Award,
  Clock,
  BookOpen,
  Star,
  Lightbulb
} from 'lucide-react';
import { P2ActivityCapture } from '@/components/portfolio/P2ActivityCapture';
import { useRouter } from 'next/navigation';
import { sanitizeHTML } from '@/lib/sanitize';

interface P2LessonInterfaceProps {
  lessonId: string;
  day: number;
  isUnlocked: boolean;
  onComplete: (lessonId: string) => void;
}

export default function P2LessonInterface({ 
  lessonId, 
  day, 
  isUnlocked, 
  onComplete 
}: P2LessonInterfaceProps) {
  const router = useRouter();
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState('content');

  useEffect(() => {
    fetchLessonData();
  }, [lessonId]);

  const fetchLessonData = async () => {
    try {
      // Mock data for now - in production this would fetch from API
      setLessonData({
        id: lessonId,
        day: day,
        title: getLessonTitle(day),
        moduleTitle: getModuleTitle(day),
        content: getLessonContent(day),
        resources: getLessonResources(day),
        xpReward: 100,
        estimatedTime: 45
      });
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleTitle = (day: number) => {
    if (day <= 5) return 'Incorporation Foundations';
    if (day <= 10) return 'Licenses & Permits';
    if (day <= 15) return 'Financial Compliance';
    if (day <= 20) return 'Contracts & Agreements';
    if (day <= 25) return 'Advanced Compliance';
    return 'Ongoing Compliance';
  };

  const getLessonTitle = (day: number) => {
    const lessons: Record<number, string> = {
      1: 'Understanding Business Structures in India',
      2: 'Pre-Incorporation Essentials',
      3: 'Incorporation Documentation Mastery',
      4: 'The Incorporation Process',
      5: 'Corporate Governance Setup'
    };
    return lessons[day] || `Lesson ${day}`;
  };

  const getLessonContent = (day: number) => {
    if (day === 1) {
      return {
        overview: `Master all 15 business structures available in India and choose the optimal structure for your business model.`,
        keyPoints: [
          'Personal Liability Shield - Your Financial Fortress',
          'Credibility Multiplier: 300% higher client trust with Pvt Ltd',
          'Funding Gateway: Only companies can raise VC/PE funding',
          'Tax Optimization: Save 10-30% annually through corporate structure'
        ],
        caseStudy: `**Real Case Study: Rahul's Disaster**
        
Rahul ran his consultancy as sole proprietorship. When a client sued for ₹15 lakhs, his personal house worth ₹50 lakhs was attached. Had he incorporated, his liability would be limited to ₹1 lakh company assets.`
      };
    }
    return {
      overview: 'Comprehensive training on legal requirements and best practices.',
      keyPoints: [
        'Understand regulatory requirements',
        'Implement best practices',
        'Build compliance systems',
        'Create documentation frameworks'
      ],
      caseStudy: 'This lesson provides expert guidance on legal infrastructure.'
    };
  };

  const getLessonResources = (day: number) => {
    return [
      {
        title: 'Business Structure Comparison Matrix',
        type: 'Excel',
        size: '245 KB',
        icon: <FileText className="w-5 h-5 text-green-500" />,
        description: 'Compare all 15 structures side-by-side with costs, benefits, and suitability analysis'
      },
      {
        title: 'AI Structure Selector Tool',
        type: 'Interactive Tool',
        size: 'Web App',
        icon: <Calculator className="w-5 h-5 text-blue-500" />,
        description: '15-question assessment with AI-powered recommendations based on your specific needs'
      }
    ];
  };

  const handleSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const handleActivityComplete = (activityId: string) => {
    console.log('Activity completed:', activityId);
    handleSectionComplete('activities');
  };

  const handleLessonComplete = () => {
    if (completedSections.length >= 2) {
      onComplete(lessonId);
    }
  };

  const calculateProgress = () => {
    const totalSections = 4;
    return (completedSections.length / totalSections) * 100;
  };

  if (!isUnlocked) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Lesson Locked</h2>
          <p className="text-gray-600 mb-6">
            Complete previous lessons to unlock this content
          </p>
          <Button variant="outline" onClick={() => router.push('/incorporation-compliance')}>
            View Previous Lessons
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Day {day}: {lessonData?.title || 'Loading...'}
              </h1>
              <p className="text-gray-600">
                {lessonData?.moduleTitle || 'Module Content'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Lesson Progress</div>
              <div className="flex items-center gap-2">
                <ProgressBar value={calculateProgress()} className="w-32" />
                <span className="text-sm font-medium">{Math.round(calculateProgress())}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Lesson Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Lesson Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{lessonData?.content?.overview}</p>
                <ul className="space-y-2">
                  {lessonData?.content?.keyPoints?.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {lessonData?.content?.caseStudy && (
              <Card>
                <CardHeader>
                  <CardTitle>Real-World Case Study</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm">
                    <div dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(lessonData.content.caseStudy.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'))
                    }} />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Play className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-lg font-semibold mb-2">Expert Training Session</h3>
                  <p className="text-gray-600 mb-4">45-minute comprehensive lesson with real examples</p>
                  <Button>
                    <Play className="w-4 h-4 mr-2" />
                    Start Video Lesson
                  </Button>
                </div>
                <Button 
                  className="w-full mt-4"
                  onClick={() => handleSectionComplete('content')}
                  disabled={completedSections.includes('content')}
                >
                  {completedSections.includes('content') ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Content Completed
                    </>
                  ) : (
                    'Mark Content Complete'
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <h2 className="text-xl font-bold">Build Your Portfolio</h2>
            
            {day === 1 && (
              <P2ActivityCapture
                activityTypeId="entity_selection_decision"
                activityName="Document Your Business Structure Decision"
                lessonId={lessonId}
                courseCode="P2"
                moduleId="p2-mod-1"
                onComplete={() => handleSectionComplete('portfolio')}
              />
            )}
            
            {day === 2 && (
              <P2ActivityCapture
                activityTypeId="incorporation_document_completion"
                activityName="Track Your Incorporation Progress"
                lessonId={lessonId}
                courseCode="P2"
                moduleId="p2-mod-1"
                onComplete={() => handleSectionComplete('portfolio')}
              />
            )}

            {![1, 2].includes(day) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Document Your Learning</h3>
                  <p className="text-gray-600 mb-4">
                    Capture key insights and decisions from this lesson to build your startup portfolio.
                  </p>
                  <Button 
                    onClick={() => handleSectionComplete('portfolio')}
                    disabled={completedSections.includes('portfolio')}
                  >
                    Add to Portfolio
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessonData?.resources?.map((resource: any, idx: number) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span>{resource.type}</span>
                          <span>{resource.size}</span>
                        </div>
                        <Button size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Lesson Completion */}
        {completedSections.length >= 2 && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">Ready to Complete!</h3>
                    <p className="text-sm text-green-700">
                      You've mastered the core concepts. Complete this lesson to unlock the next one.
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleLessonComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Lesson
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Outcomes Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {lessonData?.xpReward || 100}
                </div>
                <div className="text-sm text-gray-600">XP Earned</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {lessonData?.resources?.length || 5}
                </div>
                <div className="text-sm text-gray-600">Resources Accessed</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {completedSections.length}
                </div>
                <div className="text-sm text-gray-600">Sections Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}