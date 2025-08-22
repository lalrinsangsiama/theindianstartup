'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import P2LessonInterface from '@/components/P2LessonInterface';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Lock } from 'lucide-react';

interface LessonData {
  id: string;
  day: number;
  title: string;
  moduleId: string;
  isUnlocked: boolean;
}

export default function P2LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessonData();
  }, [params.lessonId]);

  const fetchLessonData = async () => {
    try {
      const response = await fetch(`/api/products/P2/lessons/${params.lessonId}`);
      const data = await response.json();
      setLesson(data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = async (lessonId: string) => {
    try {
      await fetch('/api/products/P2/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lessonId,
          action: 'complete'
        })
      });
      
      // Navigate back to course overview
      router.push('/incorporation-compliance');
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-lg text-gray-600 mb-4">Lesson not found</p>
              <Button onClick={() => router.push('/incorporation-compliance')}>
                Back to Course
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <ProductProtectedRoute productCode="P2">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/incorporation-compliance')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course Overview
            </Button>
          </div>

          {/* Lesson Content */}
          <P2LessonInterface
            lessonId={lesson.id}
            day={lesson.day}
            isUnlocked={lesson.isUnlocked}
            onComplete={handleLessonComplete}
          />
        </div>
      </div>
    </ProductProtectedRoute>
  );
}