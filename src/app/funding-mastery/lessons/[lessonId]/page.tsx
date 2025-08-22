'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { SafeHTML } from '@/lib/sanitize';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Textarea } from '@/components/ui/Input';
import { ActivityCapture } from '@/components/portfolio/ActivityCapture';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Zap, 
  BookOpen,
  FileText,
  Loader2,
  TrendingUp
} from 'lucide-react';

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  actionItems: any[];
  resources: any[];
  estimatedTime: number;
  xpReward: number;
  completed: boolean;
  tasksCompleted: string[];
  reflection: string;
  xpEarned: number;
  module: {
    id: string;
    title: string;
    product: {
      code: string;
    };
  };
}

interface LessonPageProps {
  params: {
    lessonId: string;
  };
}

export default function FundingLessonPage({ params }: LessonPageProps) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [reflection, setReflection] = useState('');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(`/api/products/P3/lessons/${params.lessonId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch lesson');
        }

        setLesson(data.lesson);
        setReflection(data.lesson.reflection || '');
        setCompletedTasks(new Set(data.lesson.tasksCompleted || []));
      } catch (err) {
        logger.error('Error fetching lesson:', err);
        setError(err instanceof Error ? err.message : 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    if (params.lessonId) {
      fetchLesson();
    }
  }, [params.lessonId]);

  const handleTaskToggle = (taskId: string) => {
    const newCompletedTasks = new Set(completedTasks);
    if (newCompletedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const handleCompleteLesson = async () => {
    if (!lesson) return;

    try {
      setSaving(true);
      setError('');

      const response = await fetch(`/api/products/P3/lessons/${params.lessonId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tasksCompleted: Array.from(completedTasks),
          reflection: reflection.trim(),
          xpEarned: lesson.xpReward
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete lesson');
      }

      // Update lesson state
      setLesson(prev => prev ? {
        ...prev,
        completed: true,
        xpEarned: lesson.xpReward
      } : null);

      // Show success and redirect after a moment
      setTimeout(() => {
        router.push('/funding-mastery');
      }, 2000);

    } catch (err) {
      logger.error('Error completing lesson:', err);
      setError(err instanceof Error ? err.message : 'Failed to complete lesson');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProductProtectedRoute productCode="P3">
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            <Text className="ml-2">Loading lesson...</Text>
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  if (error || !lesson) {
    return (
      <ProductProtectedRoute productCode="P3">
        <DashboardLayout>
          <div className="max-w-4xl mx-auto p-6">
            <Alert variant="warning" className="mb-6">
              {error || 'Lesson not found'}
            </Alert>
            <Button
              variant="outline"
              onClick={() => router.push('/funding-mastery')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  const allTasksCompleted = lesson.actionItems ? 
    lesson.actionItems.every((_, index) => completedTasks.has(index.toString())) : 
    true;

  return (
    <ProductProtectedRoute productCode="P3">
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => router.push('/funding-mastery')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
            <div className="flex items-center gap-2">
              {lesson.completed && (
                <Badge variant="success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                {lesson.module.title}
              </Badge>
            </div>
          </div>

          {/* Lesson Header */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Heading as="h1" className="mb-2">
                  {lesson.title}
                </Heading>
                <Text color="muted" className="mb-4">
                  Module: {lesson.module.title}
                </Text>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span>{lesson.xpReward} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brief Content */}
            <div className="prose max-w-none">
              <SafeHTML 
                html={lesson.briefContent || 'This lesson will help you master key funding concepts and strategies.'}
                options={{
                  allowImages: true,
                  allowLinks: true,
                  allowStyles: true,
                  allowTables: true
                }}
              />
            </div>
          </Card>

          {/* Action Items */}
          {lesson.actionItems && lesson.actionItems.length > 0 && (
            <Card className="p-6">
              <Heading as="h2" variant="h5" className="mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Action Items
              </Heading>
              <div className="space-y-3">
                {lesson.actionItems.map((item, index) => (
                  <label key={index} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completedTasks.has(index.toString())}
                      onChange={() => handleTaskToggle(index.toString())}
                      className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <Text className={`flex-1 ${
                      completedTasks.has(index.toString()) ? 'line-through text-gray-500' : ''
                    }`}>
                      {typeof item === 'string' ? item : item.title || 'Task ' + (index + 1)}
                    </Text>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <ProgressBar 
                  value={lesson.actionItems.length > 0 ? 
                    (completedTasks.size / lesson.actionItems.length) * 100 : 
                    100
                  } 
                />
                <Text size="sm" color="muted" className="mt-1">
                  {completedTasks.size} of {lesson.actionItems.length} tasks completed
                </Text>
              </div>
            </Card>
          )}

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <Card className="p-6">
              <Heading as="h2" variant="h5" className="mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Funding Resources & Tools
              </Heading>
              <div className="grid gap-3">
                {lesson.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <Text weight="medium">
                        {typeof resource === 'string' ? resource : resource.title || `Resource ${index + 1}`}
                      </Text>
                      {typeof resource === 'object' && resource.description && (
                        <Text size="sm" color="muted">
                          {resource.description}
                        </Text>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Portfolio Activity Integration */}
          {lesson.day <= 5 && (
            <ActivityCapture
              activityTypeId="funding_strategy_plan"
              activityName="Funding Strategy Development"
              lessonId={lesson.id}
              courseCode="P3"
              moduleId={lesson.module.id}
              className="mb-6"
            />
          )}

          {lesson.day > 5 && lesson.day <= 15 && (
            <ActivityCapture
              activityTypeId="investor_pipeline"
              activityName="Investor Pipeline Management"
              lessonId={lesson.id}
              courseCode="P3"
              moduleId={lesson.module.id}
              className="mb-6"
            />
          )}

          {lesson.day > 15 && lesson.day <= 25 && (
            <ActivityCapture
              activityTypeId="funding_documents"
              activityName="Funding Documentation"
              lessonId={lesson.id}
              courseCode="P3"
              moduleId={lesson.module.id}
              className="mb-6"
            />
          )}

          {lesson.day > 25 && (
            <ActivityCapture
              activityTypeId="government_grants"
              activityName="Government Grant Applications"
              lessonId={lesson.id}
              courseCode="P3"
              moduleId={lesson.module.id}
              className="mb-6"
            />
          )}

          {/* Reflection */}
          <Card className="p-6">
            <Heading as="h2" variant="h5" className="mb-4">
              Learning Reflection
            </Heading>
            <Text size="sm" color="muted" className="mb-3">
              Reflect on what you learned about funding strategies, key insights, and how you'll apply this to your startup.
            </Text>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What funding strategies stood out to you? How will you apply these insights to your startup? Any specific next steps you'll take?"
              rows={4}
              className="mb-4"
            />
          </Card>

          {/* Complete Lesson */}
          {!lesson.completed && (
            <Card className="p-6 text-center bg-gradient-to-r from-green-50 to-blue-50">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <Heading as="h3" variant="h5" className="mb-2">
                Ready to Complete This Lesson?
              </Heading>
              <Text color="muted" className="mb-4">
                Mark this lesson as complete to earn {lesson.xpReward} XP and continue building your funding expertise.
              </Text>
              <Button
                variant="primary"
                size="lg"
                onClick={handleCompleteLesson}
                disabled={saving || !allTasksCompleted}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    Complete Lesson
                    <Zap className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              {!allTasksCompleted && (
                <Text size="sm" color="muted" className="mt-2">
                  Complete all action items to finish this lesson
                </Text>
              )}
            </Card>
          )}

          {lesson.completed && (
            <Alert variant="success" className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <Text weight="medium">Lesson Completed!</Text>
              </div>
              <Text size="sm">
                You earned {lesson.xpEarned} XP for mastering this funding lesson.
              </Text>
            </Alert>
          )}
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}