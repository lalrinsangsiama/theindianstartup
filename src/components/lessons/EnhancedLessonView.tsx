'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Textarea } from '@/components/ui/Input';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Zap, 
  BookOpen,
  FileText,
  Loader2,
  TrendingUp,
  Target,
  Sparkles,
  ChevronRight,
  Trophy,
  Brain,
  Lightbulb,
  CircleCheck,
  Circle
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface EnhancedLessonViewProps {
  lesson: {
    id: string;
    day: number;
    title: string;
    briefContent: string;
    actionItems: any[];
    resources: any[];
    estimatedTime: number;
    xpReward: number;
    completed: boolean;
    module?: {
      title: string;
      product?: {
        code: string;
        title?: string;
      };
    };
  };
  reflection: string;
  setReflection: (value: string) => void;
  completedTasks: Set<string>;
  handleTaskToggle: (taskId: string) => void;
  handleCompleteLesson: () => void;
  saving: boolean;
  productCode: string;
  nextLessonId?: string;
  prevLessonId?: string;
}

export const EnhancedLessonView: React.FC<EnhancedLessonViewProps> = ({
  lesson,
  reflection,
  setReflection,
  completedTasks,
  handleTaskToggle,
  handleCompleteLesson,
  saving,
  productCode,
  nextLessonId,
  prevLessonId
}) => {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['actions']));
  
  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const allTasksCompleted = lesson.actionItems?.length > 0 && 
    lesson.actionItems.every((item: any) => completedTasks.has(item.id));
  
  const taskCompletionPercentage = lesson.actionItems?.length > 0
    ? (completedTasks.size / lesson.actionItems.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Header with Progress */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/products/${productCode.toLowerCase()}`)}
                className="hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
              
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  {lesson.module?.title}
                </Badge>
                <Text size="sm" color="muted">•</Text>
                <Text size="sm" color="muted">Day {lesson.day}</Text>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {lesson.completed && (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
              <Badge className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800">
                <Zap className="w-3 h-3 mr-1" />
                {lesson.xpReward} XP
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <Text size="sm" weight="medium">Lesson Progress</Text>
              <Text size="sm" color="muted">{Math.round(taskCompletionPercentage)}%</Text>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${taskCompletionPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Lesson Header Card */}
        <Card className="mb-8 border-2 border-black shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-black p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Text size="sm" className="text-gray-300">Day {lesson.day} Lesson</Text>
                    <Heading as="h1" variant="h3" className="text-white">
                      {lesson.title}
                    </Heading>
                  </div>
                </div>
                
                <Text className="text-gray-200 leading-relaxed text-lg">
                  {lesson.briefContent}
                </Text>
                
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <Text size="sm" className="text-white">
                      ~{lesson.estimatedTime} mins
                    </Text>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Target className="w-4 h-4" />
                    <Text size="sm" className="text-white">
                      {lesson.actionItems?.length || 0} tasks
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Items Section */}
        <Card className="mb-6 border-2 hover:shadow-lg transition-all duration-300">
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleSection('actions')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Action Items</CardTitle>
                  <Text size="sm" color="muted">
                    Complete these tasks to finish the lesson
                  </Text>
                </div>
              </div>
              <ChevronRight className={cn(
                "w-5 h-5 text-gray-400 transition-transform duration-200",
                expandedSections.has('actions') && "rotate-90"
              )} />
            </div>
          </CardHeader>
          
          {expandedSections.has('actions') && (
            <CardContent className="space-y-3 pt-0">
              {lesson.actionItems?.map((item: any, index: number) => (
                <div
                  key={item.id || index}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer group",
                    completedTasks.has(item.id)
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-md"
                  )}
                  onClick={() => handleTaskToggle(item.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      {completedTasks.has(item.id) ? (
                        <CircleCheck className="w-6 h-6 text-green-600 transition-all duration-300" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Text 
                        weight="medium" 
                        className={cn(
                          "transition-all duration-300",
                          completedTasks.has(item.id) && "line-through text-gray-500"
                        )}
                      >
                        {item.task}
                      </Text>
                      {item.description && (
                        <Text size="sm" color="muted" className="mt-1">
                          {item.description}
                        </Text>
                      )}
                      {item.tip && (
                        <div className="mt-2 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <Text size="sm" className="text-blue-700">
                            {item.tip}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Resources Section */}
        {lesson.resources && lesson.resources.length > 0 && (
          <Card className="mb-6 border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleSection('resources')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Resources & Templates</CardTitle>
                    <Text size="sm" color="muted">
                      Download helpful materials for this lesson
                    </Text>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-5 h-5 text-gray-400 transition-transform duration-200",
                  expandedSections.has('resources') && "rotate-90"
                )} />
              </div>
            </CardHeader>
            
            {expandedSections.has('resources') && (
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-0">
                {lesson.resources.map((resource: any, index: number) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-purple-600 mt-1 group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <Text weight="medium" className="group-hover:text-purple-600 transition-colors duration-300">
                          {resource.title}
                        </Text>
                        {resource.description && (
                          <Text size="sm" color="muted" className="mt-1">
                            {resource.description}
                          </Text>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </CardContent>
            )}
          </Card>
        )}

        {/* Reflection Section */}
        <Card className="mb-8 border-2 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Reflection & Notes</CardTitle>
                <Text size="sm" color="muted">
                  Capture your learnings and insights
                </Text>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What did you learn? What challenges did you face? What will you do differently?"
              className="min-h-[120px] resize-none border-2 focus:border-black transition-colors duration-200"
              disabled={lesson.completed}
            />
            {reflection.length > 0 && (
              <Text size="sm" color="muted" className="mt-2">
                {reflection.length} characters
              </Text>
            )}
          </CardContent>
        </Card>

        {/* Completion Section */}
        {!lesson.completed && (
          <Card className="border-2 border-black bg-gradient-to-r from-gray-900 to-black text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <Heading as="h3" variant="h4" className="text-white mb-2">
                  Ready to Complete?
                </Heading>
                <Text className="text-gray-300 mb-6">
                  Make sure you've completed all tasks and added your reflection
                </Text>
                
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCompleteLesson}
                    disabled={!allTasksCompleted || saving}
                    className={cn(
                      "min-w-[200px] bg-white text-black hover:bg-gray-100 transition-all duration-300",
                      !allTasksCompleted && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Complete Lesson (+{lesson.xpReward} XP)
                      </>
                    )}
                  </Button>
                </div>
                
                {!allTasksCompleted && (
                  <Alert variant="warning" className="mt-6 bg-yellow-50 border-yellow-200">
                    <Text size="sm" className="text-yellow-800">
                      Complete all action items to finish this lesson
                    </Text>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {lesson.completed && (
          <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <Heading as="h3" variant="h4" className="mb-2 text-green-900">
                  Lesson Completed!
                </Heading>
                <Text className="text-green-700 mb-6">
                  You earned {lesson.xpReward} XP for completing this lesson
                </Text>
                
                <div className="flex items-center justify-center gap-4">
                  {prevLessonId && (
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/products/${productCode.toLowerCase()}/lessons/${prevLessonId}`)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Lesson
                    </Button>
                  )}
                  {nextLessonId && (
                    <Button
                      variant="primary"
                      onClick={() => router.push(`/products/${productCode.toLowerCase()}/lessons/${nextLessonId}`)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Next Lesson
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  {!nextLessonId && (
                    <Button
                      variant="primary"
                      onClick={() => router.push(`/products/${productCode.toLowerCase()}`)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Back to Course
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};