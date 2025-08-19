'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Loader2,
  Users,
  ChevronRight
} from 'lucide-react';

// Import the new enhanced components
import { MorningBrief } from '@/components/journey/MorningBrief';
import { TaskChecklist, type Task } from '@/components/journey/TaskChecklist';
import { ResourcesSection, type Resource } from '@/components/journey/ResourcesSection';
import { DocumentChecklist } from '@/components/journey/DocumentChecklist';
import { StartupFolderStructure } from '@/components/journey/StartupFolderStructure';
import { EveningReflection } from '@/components/journey/EveningReflection';

interface LessonData {
  day: number;
  title: string;
  briefContent: string;
  estimatedTime: number;
  xpReward: number;
  actionItems: any[];
  resources: any[];
  focus?: string;
  successMetrics?: string[];
  expertTips?: string[];
  reflectionQuestions?: string[];
  requiresAuth?: boolean;
}

interface ProofFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt: string;
  status: 'uploading' | 'success' | 'error';
}

export default function DailyLessonPage() {
  const params = useParams();
  const router = useRouter();
  const day = parseInt(params.day as string);
  
  const [loading, setLoading] = useState(true);
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDocumentOrganize, setShowDocumentOrganize] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLessonData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch lesson data from API
      const response = await fetch(`/api/lessons/${day}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLessonData(data);

      // Convert action items to enhanced tasks format
      const enhancedTasks: Task[] = data.actionItems.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        xp: item.xp,
        category: item.category || 'core',
        completed: false,
        documentsRequired: item.documentsRequired || false,
        documents: item.documents || [],
        estimatedTime: item.estimatedTime,
      }));

      setTasks(enhancedTasks);

    } catch (error) {
      console.error('Error fetching lesson:', error);
      setError('Failed to load lesson data. Please try again.');
      
      // Set fallback lesson data to prevent total failure
      setLessonData({
        day: day,
        title: `Day ${day}: Startup Journey`,
        briefContent: `Welcome to Day ${day} of your startup journey. This lesson is currently being prepared.`,
        estimatedTime: 45,
        xpReward: 50,
        actionItems: [
          {
            id: 'fallback-1',
            title: 'Complete today\'s focus',
            description: 'Work on your startup goals for today.',
            xp: 25,
            category: 'core',
            estimatedTime: 30
          }
        ],
        resources: []
      });
      
      setTasks([
        {
          id: 'fallback-1',
          title: 'Complete today\'s focus',
          description: 'Work on your startup goals for today.',
          xp: 25,
          category: 'core',
          completed: false,
          documentsRequired: false,
          documents: [],
          estimatedTime: 30
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [day]);

  useEffect(() => {
    fetchLessonData();
  }, [day, fetchLessonData]);

  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined
            }
          : task
      )
    );
  };

  const handleDocumentToggle = (taskId: string, documentId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId && task.documents
          ? {
              ...task,
              documents: task.documents.map(doc => 
                doc.id === documentId
                  ? { ...doc, completed: !doc.completed }
                  : doc
              )
            }
          : task
      )
    );
  };

  const handleCompleteLesson = async () => {
    setIsCompleting(true);
    
    try {
      // Save progress to database
      const response = await fetch(`/api/lessons/${day}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tasks: tasks,
          completedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete lesson');
      }

      // Navigate to completion page
      router.push(`/journey/day/${day}/complete`);
    } catch (error) {
      console.error('Error completing lesson:', error);
      setError('Failed to complete lesson. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const requiredTasks = tasks.filter(t => t.category !== 'bonus');
  const completedTasks = tasks.filter(t => t.completed);
  const requiredCompleted = requiredTasks.filter(t => t.completed);
  const allRequiredComplete = requiredCompleted.length === requiredTasks.length && requiredTasks.length > 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !lessonData) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <Alert variant="error" title="Error loading lesson">
            {error || 'This lesson is not available yet.'}
          </Alert>
          <Button
            variant="outline"
            onClick={() => router.push('/journey')}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journey
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Handle authentication required
  if (lessonData.requiresAuth) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <Alert variant="warning" title="Authentication Required">
            Please log in to access lesson content. You need to be authenticated to view and complete daily lessons.
          </Alert>
          <div className="mt-6 space-x-4">
            <Button
              variant="primary"
              onClick={() => router.push('/login')}
            >
              Log In
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/journey')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journey
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProductProtectedRoute productCode="P1">
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-black text-white p-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/journey')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Journey
              </Button>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline" size="lg">
                  Day {day} of 30
                </Badge>
                {day < 30 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    disabled
                  >
                    Next Day
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            <div className="max-w-4xl">
              <Heading as="h1" className="text-white mb-3">
                {lessonData.title}
              </Heading>
              <Text className="text-xl text-gray-300 mb-6">
                Day {day} of your startup journey
              </Text>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Morning Brief */}
                <MorningBrief
                  day={day}
                  briefContent={lessonData.briefContent}
                  estimatedTime={lessonData.estimatedTime}
                  xpReward={lessonData.xpReward}
                  focus={lessonData.focus}
                  successMetrics={lessonData.successMetrics}
                />

                {/* Interactive Checklist */}
                <TaskChecklist
                  tasks={tasks}
                  onTaskToggle={handleTaskToggle}
                  onDocumentOrganize={(taskId) => setShowDocumentOrganize(taskId)}
                  showXPAnimation={true}
                />

                {/* Evening Reflection */}
                {allRequiredComplete ? (
                  <EveningReflection
                    day={day}
                    reflectionQuestions={lessonData.reflectionQuestions || []}
                    onSave={async (reflection) => {
                      // Save reflection data
                      console.log('Saving reflection:', reflection);
                    }}
                    onComplete={handleCompleteLesson}
                  />
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <Alert variant="info" className="mb-4">
                        Complete all required tasks to proceed to your evening reflection
                      </Alert>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        disabled
                      >
                        Complete Tasks First
                        <Lock className="w-5 h-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Resources */}
                <ResourcesSection
                  resources={lessonData.resources || []}
                  showCategories={true}
                  defaultExpanded={['templates', 'tools']}
                />

                {/* Startup Folder Structure */}
                <StartupFolderStructure 
                  compact={false}
                  showCloudOptions={true}
                />

                {/* Community */}
                <Card>
                  <CardHeader>
                    <CardTitle>Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <Text size="sm" color="muted" className="mb-4">
                        Join other founders working on Day {day}
                      </Text>
                      <Button variant="outline" size="sm" className="w-full">
                        View Discussions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps Preview */}
                {day < 30 && (
                  <Card className="border-2 border-gray-200">
                    <CardHeader>
                      <CardTitle>What&apos;s Next?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Text weight="bold" size="sm">{day + 1}</Text>
                          </div>
                          <div>
                            <Text size="sm" weight="medium">
                              Next Lesson
                            </Text>
                            <Text size="xs" color="muted">
                              Continue your startup journey
                            </Text>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Document Organization Modal */}
          {showDocumentOrganize && (
            <DocumentChecklist
              taskId={showDocumentOrganize}
              taskTitle={tasks.find(t => t.id === showDocumentOrganize)?.title || 'Task'}
              documents={tasks.find(t => t.id === showDocumentOrganize)?.documents || []}
              onDocumentToggle={(documentId) => handleDocumentToggle(showDocumentOrganize, documentId)}
              onClose={() => setShowDocumentOrganize(null)}
            />
          )}
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}