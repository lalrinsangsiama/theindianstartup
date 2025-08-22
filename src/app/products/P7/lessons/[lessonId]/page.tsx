'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Clock, 
  Award, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  ExternalLink,
  Download,
  Play
} from 'lucide-react';

interface LessonData {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  actionItems: any[];
  resources: any[];
  estimatedTime: number;
  xpReward: number;
  module: {
    title: string;
    description: string;
    orderIndex: number;
  };
  isCompleted: boolean;
  xpEarned: number;
  completedAt: string | null;
  hasAccess: boolean;
}

export default function P7LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const lessonId = params.lessonId as string;
  
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/products/P7/lessons/${lessonId}`, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setLesson(data);
        } else {
          logger.error('Failed to fetch P7 lesson:', response.statusText);
        }
      } catch (error) {
        logger.error('Error fetching P7 lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && lessonId) {
      fetchLesson();
    }
  }, [user, lessonId]);

  const handleCompleteLesson = async () => {
    if (!lesson) return;

    setCompleting(true);
    try {
      const response = await fetch(`/api/products/P7/lessons/${lessonId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          completed: true,
          reflection
        })
      });

      if (response.ok) {
        const result = await response.json();
        setLesson(prev => prev ? {
          ...prev,
          isCompleted: true,
          xpEarned: result.xpEarned,
          completedAt: new Date().toISOString()
        } : null);
      } else {
        logger.error('Failed to complete P7 lesson:', response.statusText);
      }
    } catch (error) {
      logger.error('Error completing P7 lesson:', error);
    } finally {
      setCompleting(false);
    }
  };

  const navigateLesson = (direction: 'prev' | 'next') => {
    const currentDay = parseInt(lessonId);
    const newDay = direction === 'prev' ? currentDay - 1 : currentDay + 1;
    
    if (newDay >= 1 && newDay <= 30) {
      router.push(`/products/P7/lessons/${newDay}`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!lesson) {
    return (
      <DashboardLayout>
        <div className="text-center space-y-4">
          <Heading as="h1" variant="h2">Lesson Not Found</Heading>
          <Text color="muted">The requested lesson could not be found.</Text>
          <Button onClick={() => router.push('/government-schemes')}>
            Back to Course
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P7">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/government-schemes')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                P7 · Day {lesson.day}
              </Badge>
            </div>
          </div>

          {/* Lesson Header */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Text size="sm" color="muted" className="mb-2">
                    Module {lesson.module.orderIndex}: {lesson.module.title}
                  </Text>
                  <Heading as="h1" variant="h2" className="mb-2">
                    {lesson.title}
                  </Heading>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.estimatedTime} minutes
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {lesson.xpReward} XP
                    </div>
                    {lesson.isCompleted && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>
                {lesson.isCompleted && (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    +{lesson.xpEarned} XP Earned
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Lesson Content */}
          <Card className="p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: lesson.briefContent }} />
            </div>
          </Card>

          {/* Action Items */}
          {lesson.actionItems && lesson.actionItems.length > 0 && (
            <Card className="p-6">
              <Heading as="h3" variant="h4" className="mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" />
                Action Items
              </Heading>
              <div className="space-y-3">
                {lesson.actionItems.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Text weight="medium" className="mb-1">{item.task}</Text>
                      {item.description && (
                        <Text size="sm" color="muted">{item.description}</Text>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <Card className="p-6">
              <Heading as="h3" variant="h4" className="mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Resources & Templates
              </Heading>
              <div className="grid gap-4">
                {lesson.resources.map((resource: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <Text weight="medium" className="mb-1">{resource.title}</Text>
                      <Text size="sm" color="muted">{resource.description}</Text>
                      {resource.value && (
                        <Badge variant="outline" className="mt-2 bg-green-100 text-green-800">
                          Worth {resource.value}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {resource.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                      {resource.downloadUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.downloadUrl} download>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Completion Section */}
          {!lesson.isCompleted && (
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500">
              <Heading as="h3" variant="h4" className="mb-4">
                Complete This Lesson
              </Heading>
              <div className="space-y-4">
                <Text color="muted">
                  Share your key insights and how you'll apply today's learning to your startup journey.
                </Text>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="What are your key takeaways from this lesson?"
                  className="w-full min-h-[100px] p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
                <Button
                  onClick={handleCompleteLesson}
                  disabled={completing}
                  className="w-full"
                >
                  {completing ? 'Completing...' : `Complete Lesson & Earn ${lesson.xpReward} XP`}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigateLesson('prev')}
              disabled={parseInt(lessonId) <= 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Lesson
            </Button>
            <div className="flex items-center gap-2">
              <Text size="sm" color="muted">
                Lesson {lesson.day} of 30
              </Text>
              <ProgressBar value={(lesson.day / 30) * 100} className="w-32" />
            </div>
            <Button
              variant="outline"
              onClick={() => navigateLesson('next')}
              disabled={parseInt(lessonId) >= 30}
              className="flex items-center gap-2"
            >
              Next Lesson
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}