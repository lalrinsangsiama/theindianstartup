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
import { BadgeUnlockNotification } from '@/components/gamification/BadgeUnlockNotification';
import { BadgeId } from '@/lib/badges';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  BookOpen,
  Download,
  ExternalLink,
  Target,
  Trophy,
  Loader2
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
  } | string[];
  estimatedTime: number;
  xpReward: number;
  completed: boolean;
  module?: {
    id: string;
    title: string;
  };
}

interface LessonProgress {
  completed: boolean;
  tasksCompleted: string[];
  reflection: string;
  xpEarned: number;
}

interface GenericLessonPageProps {
  /**
   * Optional: Override the product code from URL params
   */
  productCodeOverride?: string;
  /**
   * Optional: Override total lessons count (default fetched from API)
   */
  totalLessonsOverride?: number;
}

export function GenericLessonPage({
  productCodeOverride,
  totalLessonsOverride
}: GenericLessonPageProps = {}) {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [totalLessons, setTotalLessons] = useState(totalLessonsOverride || 0);

  // Badge notification state
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [unlockedBadgeId, setUnlockedBadgeId] = useState<BadgeId | null>(null);
  const [pendingBadges, setPendingBadges] = useState<BadgeId[]>([]);

  // Get product code and lesson ID from URL params or props
  const productCode = productCodeOverride || (params.productCode as string);
  const lessonId = params.lessonId as string;

  // Normalize product code to uppercase for API calls
  const normalizedProductCode = productCode?.toUpperCase() || '';

  useEffect(() => {
    const fetchLesson = async () => {
      if (!productCode || !lessonId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/products/${productCode}/lessons/${lessonId}`, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setLesson(data.lesson);
          setProgress({
            completed: data.lesson?.completed || false,
            tasksCompleted: data.lesson?.tasksCompleted || [],
            reflection: data.lesson?.reflection || '',
            xpEarned: data.lesson?.xpEarned || 0
          });
          if (data.totalLessons) {
            setTotalLessons(data.totalLessons);
          }
        } else {
          logger.error('Failed to fetch lesson:', await response.text());
        }
      } catch (error) {
        logger.error(`Error fetching lesson for ${productCode}:`, error);
      } finally {
        setLoading(false);
      }
    };

    if (user && lessonId) {
      fetchLesson();
    } else if (!user) {
      setLoading(false);
    }
  }, [user, productCode, lessonId]);

  const completeLesson = async () => {
    if (!lesson || completing) return;

    setCompleting(true);
    try {
      const response = await fetch(`/api/products/${productCode}/lessons/${lessonId}/complete`, {
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
        const data = await response.json();

        setProgress(prev => ({
          ...prev!,
          completed: true,
          xpEarned: lesson.xpReward
        }));

        // Check for new badge unlocks
        if (data.newBadges && data.newBadges.length > 0) {
          // Store all unlocked badges and show the first one
          setPendingBadges(data.newBadges.slice(1));
          setUnlockedBadgeId(data.newBadges[0]);
          setShowBadgeNotification(true);
        } else {
          // Navigate immediately if no badges
          navigateToNextLesson();
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

  const navigateToNextLesson = () => {
    const nextDay = lesson?.day ? lesson.day + 1 : 1;
    if (nextDay <= totalLessons && totalLessons > 0) {
      router.push(`/products/${productCode.toLowerCase()}/lessons/${nextDay}`);
    } else {
      router.push(`/products/${productCode.toLowerCase()}`);
    }
  };

  const handleBadgeNotificationClose = () => {
    setShowBadgeNotification(false);

    // Check if there are more badges to show
    if (pendingBadges.length > 0) {
      const nextBadge = pendingBadges[0];
      setPendingBadges(prev => prev.slice(1));
      setUnlockedBadgeId(nextBadge);
      setShowBadgeNotification(true);
    } else {
      // All badges shown, navigate to next lesson
      navigateToNextLesson();
    }
  };

  const handleBadgeNotificationComplete = () => {
    handleBadgeNotificationClose();
  };

  const navigateToDay = (day: number) => {
    router.push(`/products/${productCode.toLowerCase()}/lessons/${day}`);
  };

  // Parse resources to handle both object and array formats
  const parseResources = (resources: Lesson['resources']) => {
    if (Array.isArray(resources)) {
      return { items: resources, templates: [], tools: [], readings: [] };
    }
    return {
      items: [],
      templates: resources?.templates || [],
      tools: resources?.tools || [],
      readings: resources?.readings || [],
      masterclass: resources?.masterclass
    };
  };

  if (loading) {
    return (
      <ProductProtectedRoute productCode={normalizedProductCode}>
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  if (!lesson) {
    return (
      <ProductProtectedRoute productCode={normalizedProductCode}>
        <DashboardLayout>
          <div className="max-w-4xl mx-auto">
            <Alert variant="error">
              <Text>Lesson not found or you do not have access to this content.</Text>
            </Alert>
            <Button
              variant="outline"
              onClick={() => router.push(`/products/${productCode.toLowerCase()}`)}
              className="mt-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  const resources = parseResources(lesson.resources);

  return (
    <ProductProtectedRoute productCode={normalizedProductCode}>
      <DashboardLayout>
        {/* Badge Unlock Notification */}
        <BadgeUnlockNotification
          show={showBadgeNotification}
          badgeId={unlockedBadgeId}
          onClose={handleBadgeNotificationClose}
          onComplete={handleBadgeNotificationComplete}
        />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/products/${productCode.toLowerCase()}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course
            </Button>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="default">Day {lesson.day}</Badge>
              {lesson.estimatedTime && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.estimatedTime} mins
                </Badge>
              )}
              <Badge variant="default" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                +{lesson.xpReward} XP
              </Badge>
              {progress?.completed && (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Completed
                </Badge>
              )}
            </div>
          </div>

          {/* Module Context */}
          {lesson.module && (
            <div className="mb-4">
              <Text size="sm" color="muted">
                Module: {lesson.module.title}
              </Text>
            </div>
          )}

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
              {lesson.actionItems && lesson.actionItems.length > 0 && (
                <Card className="mb-6">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-green-600" />
                      <Heading as="h3" variant="h5">Action Items</Heading>
                    </div>
                    <div className="space-y-3">
                      {lesson.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Text size="sm" weight="medium" className="text-green-700">
                              {index + 1}
                            </Text>
                          </div>
                          <Text>{item}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Resources Section */}
              {(resources.templates?.length > 0 || resources.tools?.length > 0 || resources.items?.length > 0) && (
                <Card className="mb-6">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Download className="w-5 h-5 text-purple-600" />
                      <Heading as="h3" variant="h5">Resources & Templates</Heading>
                    </div>

                    {/* General resources (array format) */}
                    {resources.items && resources.items.length > 0 && (
                      <div className="mb-4">
                        <Text weight="medium" className="mb-2">Resources</Text>
                        <div className="space-y-2">
                          {resources.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <BookOpen className="w-4 h-4 text-gray-600" />
                              <Text size="sm">{item}</Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Templates */}
                    {resources.templates && resources.templates.length > 0 && (
                      <div className="mb-4">
                        <Text weight="medium" className="mb-2">Templates</Text>
                        <div className="space-y-2">
                          {resources.templates.map((template, index) => (
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

                    {/* Tools */}
                    {resources.tools && resources.tools.length > 0 && (
                      <div>
                        <Text weight="medium" className="mb-2">Interactive Tools</Text>
                        <div className="space-y-2">
                          {resources.tools.map((tool, index) => (
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

              {/* Portfolio Integration - for courses that support it */}
              {lesson.day <= 30 && (
                <ActivityCapture
                  activityTypeId={`${productCode.toLowerCase()}_day_${lesson.day}_activity`}
                  activityName={`Day ${lesson.day} Activity`}
                  lessonId={lesson.id}
                  courseCode={normalizedProductCode}
                  moduleId={lesson.module?.id || `${productCode.toLowerCase()}_mod_${Math.ceil(lesson.day / 5)}`}
                />
              )}
            </div>
          </Card>

          {/* Navigation & Completion */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() => lesson.day > 1 && navigateToDay(lesson.day - 1)}
              disabled={lesson.day <= 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Day
            </Button>

            <div className="flex items-center gap-3 flex-wrap">
              {!progress?.completed ? (
                <Button
                  onClick={completeLesson}
                  disabled={completing}
                  className="flex items-center gap-2"
                >
                  {completing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
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
                onClick={() => totalLessons > 0 && lesson.day < totalLessons && navigateToDay(lesson.day + 1)}
                disabled={totalLessons === 0 || lesson.day >= totalLessons}
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

export default GenericLessonPage;
