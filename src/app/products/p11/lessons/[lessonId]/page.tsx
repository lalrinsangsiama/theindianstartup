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
import { ArrowLeft, ArrowRight, CheckCircle, Target, Trophy } from 'lucide-react';

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent: string;
  actionItems: string[];
  resources: { templates?: string[]; tools?: string[] };
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

export default function P11LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  const lessonId = params.lessonId as string;
  const totalDays = 54;
  const productCode = 'P11';

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/products/p11/lessons/${lessonId}`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setLesson(data.lesson);
          setProgress(data.progress);
        }
      } catch (error) {
        logger.error('Error fetching P11 lesson:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user && lessonId) fetchLesson();
  }, [user, lessonId]);

  const completeLesson = async () => {
    if (!lesson || completing) return;
    setCompleting(true);
    try {
      const response = await fetch(`/api/products/p11/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ tasksCompleted: lesson.actionItems, reflection: '', xpEarned: lesson.xpReward })
      });
      if (response.ok) {
        setProgress(prev => ({ ...prev!, completed: true, xpEarned: lesson.xpReward }));
        const nextDay = lesson.day + 1;
        router.push(nextDay <= totalDays ? `/products/p11/lessons/${nextDay}` : '/products/p11');
      }
    } catch (error) {
      logger.error('Error completing lesson:', error);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <ProductProtectedRoute productCode={productCode}>
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
      <ProductProtectedRoute productCode={productCode}>
        <DashboardLayout>
          <div className="max-w-4xl mx-auto">
            <Alert variant="error"><Text>Lesson not found or you do not have access.</Text></Alert>
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  return (
    <ProductProtectedRoute productCode={productCode}>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => router.push('/products/p11')} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Course
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="default">Day {lesson.day}</Badge>
              <Badge variant="outline">{lesson.estimatedTime} mins</Badge>
              <Badge variant="default">+{lesson.xpReward} XP</Badge>
              {progress?.completed && <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</Badge>}
            </div>
          </div>

          <Card className="mb-6">
            <div className="p-8">
              <Heading as="h1" className="mb-4">{lesson.title}</Heading>
              <div className="prose prose-lg max-w-none mb-8">
                <Text size="lg" className="leading-relaxed whitespace-pre-line">{lesson.briefContent}</Text>
              </div>
              <Card className="mb-6">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-pink-600" />
                    <Heading as="h3" variant="h5">Action Items</Heading>
                  </div>
                  <div className="space-y-3">
                    {lesson.actionItems?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Text size="sm" weight="medium" className="text-pink-700">{index + 1}</Text>
                        </div>
                        <Text>{item}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              <ActivityCapture activityTypeId={`p11_day_${lesson.day}_activity`} activityName={`Day ${lesson.day} Branding Activity`} lessonId={lesson.id} courseCode={productCode} moduleId={`p11_mod_${Math.ceil(lesson.day / 5)}`} />
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => lesson.day > 1 && router.push(`/products/p11/lessons/${lesson.day - 1}`)} disabled={lesson.day <= 1} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Previous Day
            </Button>
            <div className="flex items-center gap-3">
              {!progress?.completed ? (
                <Button onClick={completeLesson} disabled={completing} className="flex items-center gap-2">
                  {completing ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Completing...</> : <><Trophy className="w-4 h-4" /> Complete Day {lesson.day}</>}
                </Button>
              ) : (
                <Badge variant="success" className="flex items-center gap-2 px-4 py-2"><CheckCircle className="w-4 h-4" /> Completed (+{lesson.xpReward} XP)</Badge>
              )}
              <Button onClick={() => lesson.day < totalDays && router.push(`/products/p11/lessons/${lesson.day + 1}`)} disabled={lesson.day >= totalDays} className="flex items-center gap-2">
                Next Day <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}
