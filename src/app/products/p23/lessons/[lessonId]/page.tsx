'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ActivityCapture } from '@/components/portfolio/ActivityCapture';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Download,
  ExternalLink,
  Target,
  Trophy
} from 'lucide-react';

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  actionItems: string[];
  resources: {
    masterclass?: string;
    templates?: string[];
    tools?: string[];
    readings?: string[];
  };
  estimatedTime: number;
  xpReward: number;
  completed: boolean;
}

interface LessonProgress {
  completed: boolean;
  tasksCompleted: string[];
  reflection: string;
  xpEarned: number;
}

export default function P23LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  const lessonId = params.lessonId as string;
  const totalDays = 55;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/products/p23/lessons/${lessonId}`, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setLesson(data.lesson);
          setProgress(data.progress);
        } else {
          logger.error('Failed to fetch lesson:', await response.text());
        }
      } catch (error) {
        logger.error('Error fetching P23 lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && lessonId) {
      fetchLesson();
    }
  }, [user, lessonId]);

  const completeLesson = async () => {
    if (!lesson || completing) return;

    setCompleting(true);
    try {
      const response = await fetch(`/api/products/p23/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          tasksCompleted: lesson.actionItems,
          reflection: '',
          xpEarned: lesson.xpReward
        })
      });

      if (response.ok) {
        setProgress(prev => ({
          ...prev!,
          completed: true,
          xpEarned: lesson.xpReward
        }));

        const nextDay = lesson.day + 1;
        if (nextDay <= totalDays) {
          router.push(`/products/p23/lessons/${nextDay}`);
        } else {
          router.push('/products/p23');
        }
      } else {
        logger.error('Failed to complete lesson');
      }
    } catch (error) {
      logger.error('Error completing lesson:', error);
    } finally {
      setCompleting(false);
    }
  };

  const navigateToDay = (day: number) => {
    router.push(`/products/p23/lessons/${day}`);
  };

  if (loading) {
    return (
      <ProductProtectedRoute productCode="P23">
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  if (!lesson) {
    return (
      <ProductProtectedRoute productCode="P23">
        <DashboardLayout>
          <div className="max-w-4xl mx-auto">
            <Alert variant="error">
              <Text>Lesson not found or you do not have access to this content.</Text>
            </Alert>
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  return (
    <ProductProtectedRoute productCode="P23">
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => router.push('/products/p23')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Button>

            <div className="flex items-center gap-2">
              <Badge variant="default">Day {lesson.day}</Badge>
              <Badge variant="outline">{lesson.estimatedTime} mins</Badge>
              <Badge variant="default">+{lesson.xpReward} XP</Badge>
              {progress?.completed && (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Completed
                </Badge>
              )}
            </div>
          </div>

          {/* Lesson Content */}
          <Card className="mb-6">
            <div className="p-8">
              <Heading as="h1" className="mb-4">{lesson.title}</Heading>

              <div className="prose prose-lg max-w-none mb-8">
                <Text size="lg" className="leading-relaxed whitespace-pre-line">
                  {lesson.briefContent}
                </Text>
              </div>

              {/* Action Items */}
              <Card className="mb-6">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-lime-600" />
                    <Heading as="h3" variant="h5">Action Items</Heading>
                  </div>
                  <div className="space-y-3">
                    {lesson.actionItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Text size="sm" weight="medium" className="text-lime-700">
                            {index + 1}
                          </Text>
                        </div>
                        <Text>{item}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Resources Section */}
              {(lesson.resources.templates?.length || lesson.resources.tools?.length) && (
                <Card className="mb-6">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Download className="w-5 h-5 text-purple-600" />
                      <Heading as="h3" variant="h5">Resources & Templates</Heading>
                    </div>

                    {lesson.resources.templates && (
                      <div className="mb-4">
                        <Text weight="medium" className="mb-2">Templates</Text>
                        <div className="space-y-2">
                          {lesson.resources.templates.map((template, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                              <Download className="w-4 h-4 text-purple-600" />
                              <Text size="sm">{template}</Text>
                              <Button size="sm" variant="outline" className="ml-auto">
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lesson.resources.tools && (
                      <div>
                        <Text weight="medium" className="mb-2">Interactive Tools</Text>
                        <div className="space-y-2">
                          {lesson.resources.tools.map((tool, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                              <ExternalLink className="w-4 h-4 text-blue-600" />
                              <Text size="sm">{tool}</Text>
                              <Button size="sm" variant="outline" className="ml-auto">
                                Use Tool
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Portfolio Integration */}
              {lesson.day <= 25 && (
                <ActivityCapture
                  activityTypeId={`p23_day_${lesson.day}_activity`}
                  activityName={`Day ${lesson.day} Activity`}
                  lessonId={lesson.id}
                  courseCode="P23"
                  moduleId={`p23_mod_${Math.ceil(lesson.day / 5)}`}
                />
              )}
            </div>
          </Card>

          {/* Navigation & Completion */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => lesson.day > 1 && navigateToDay(lesson.day - 1)}
              disabled={lesson.day <= 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Day
            </Button>

            <div className="flex items-center gap-3">
              {!progress?.completed ? (
                <Button
                  onClick={completeLesson}
                  disabled={completing}
                  className="flex items-center gap-2"
                >
                  {completing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Completing...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4" />
                      Complete Day {lesson.day}
                    </>
                  )}
                </Button>
              ) : (
                <Badge variant="success" className="flex items-center gap-2 px-4 py-2">
                  <CheckCircle className="w-4 h-4" />
                  Completed (+{lesson.xpReward} XP)
                </Badge>
              )}

              <Button
                onClick={() => lesson.day < totalDays && navigateToDay(lesson.day + 1)}
                disabled={lesson.day >= totalDays}
                className="flex items-center gap-2"
              >
                Next Day
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}
