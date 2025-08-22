'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProgressBar as Progress } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

interface MobileLearningViewProps {
  lesson: {
    day: number;
    title: string;
    briefContent: string;
    actionItems: any[];
    resources: any[];
    estimatedTime: number;
    xpReward: number;
  };
  progress: {
    completed: boolean;
    tasksCompleted: any;
    reflection?: string;
  };
  onComplete: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const MobileLearningView: React.FC<MobileLearningViewProps> = ({
  lesson,
  progress,
  onComplete,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    tasks: true,
    resources: false
  });
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(
    new Set(progress.tasksCompleted || [])
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleTask = (taskIndex: number) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskIndex)) {
        newSet.delete(taskIndex);
      } else {
        newSet.add(taskIndex);
      }
      return newSet;
    });
  };

  const taskCompletionRate = lesson.actionItems.length > 0 
    ? (completedTasks.size / lesson.actionItems.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="text-center">
              <Text size="xs" color="muted">Day {lesson.day}</Text>
              <Text weight="medium" size="sm" className="line-clamp-1">
                {lesson.title}
              </Text>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              disabled={!hasNext}
              className="p-2"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          <Progress value={taskCompletionRate} className="h-1" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-4 pb-6 space-y-4">
        {/* Lesson Overview */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <Heading as="h2" variant="h6">Today's Lesson</Heading>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" size="sm">
                <Clock className="w-3 h-3 mr-1" />
                {lesson.estimatedTime}m
              </Badge>
              <Badge variant="default" size="sm">
                +{lesson.xpReward} XP
              </Badge>
            </div>
          </div>
          
          <Text size="sm" color="muted" className="mb-4">
            {lesson.briefContent}
          </Text>

          {/* Audio Player Mock */}
          <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
            <div className="flex-1">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-1 bg-blue-500 rounded-full w-1/3" />
              </div>
            </div>
            <Text size="xs" color="muted">5:23</Text>
          </div>
        </Card>

        {/* Action Items */}
        <Card className="overflow-hidden">
          <button
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            onClick={() => toggleSection('tasks')}
          >
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              <Text weight="medium">
                Action Items ({completedTasks.size}/{lesson.actionItems.length})
              </Text>
            </div>
            {expandedSections.tasks ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.tasks && (
            <div className="px-4 pb-4 space-y-2">
              {lesson.actionItems.map((item, index) => (
                <label
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                    completedTasks.has(index) 
                      ? "bg-green-50" 
                      : "bg-gray-50 hover:bg-gray-100"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={completedTasks.has(index)}
                    onChange={() => toggleTask(index)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Text 
                      size="sm" 
                      className={cn(
                        completedTasks.has(index) && "line-through text-gray-500"
                      )}
                    >
                      {item.task}
                    </Text>
                    {item.description && (
                      <Text size="xs" color="muted" className="mt-1">
                        {item.description}
                      </Text>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </Card>

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <Card className="overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
              onClick={() => toggleSection('resources')}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500" />
                <Text weight="medium">
                  Resources ({lesson.resources.length})
                </Text>
              </div>
              {expandedSections.resources ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.resources && (
              <div className="px-4 pb-4 space-y-2">
                {lesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <Text size="sm" weight="medium" className="text-blue-600">
                      {resource.title}
                    </Text>
                    {resource.description && (
                      <Text size="xs" color="muted">
                        {resource.description}
                      </Text>
                    )}
                  </a>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button
          className="w-full"
          variant={progress.completed ? "secondary" : "primary"}
          size="lg"
          onClick={onComplete}
          disabled={completedTasks.size < lesson.actionItems.length && !progress.completed}
        >
          {progress.completed ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Completed
            </>
          ) : completedTasks.size < lesson.actionItems.length ? (
            `Complete ${lesson.actionItems.length - completedTasks.size} more tasks`
          ) : (
            <>
              Complete Lesson
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
        
        {progress.completed && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2"
            onClick={() => {
              setCompletedTasks(new Set());
              // Reset progress
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Progress
          </Button>
        )}
      </div>
    </div>
  );
};