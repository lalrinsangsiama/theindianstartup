'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Text, Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Zap, 
  ChevronDown,
  ChevronRight,
  BookOpen,
  Target,
  Lightbulb,
  ExternalLink,
  FileText
} from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: 'pre-work' | 'core' | 'bonus';
  completed?: boolean;
  completedAt?: string;
  estimatedTime?: number;
  detailedContent?: {
    objective: string;
    guide: string[];
    tips: string[];
    examples?: string[];
    deliverable: string;
  };
}

interface TaskChecklistProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  className?: string;
  showXPAnimation?: boolean;
}

export function TaskChecklistV2({
  tasks,
  onTaskToggle,
  className = '',
  showXPAnimation = true
}: TaskChecklistProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalXP = tasks.reduce((sum, t) => sum + (t.completed ? t.xp : 0), 0);
  const maxXP = tasks.reduce((sum, t) => sum + t.xp, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Interactive Checklist
          </CardTitle>
          <Badge variant="outline">
            {completedTasks}/{totalTasks} Tasks
          </Badge>
        </div>
        
        <div className="space-y-2">
          <ProgressBar 
            value={(completedTasks / totalTasks) * 100} 
            className="h-2"
            showLabel={false}
          />
          <div className="flex items-center justify-between text-sm">
            <Text color="muted">
              Progress: {Math.round((completedTasks / totalTasks) * 100)}%
            </Text>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <Text color="muted">
                {totalXP}/{maxXP} XP
              </Text>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <TaskItemV2
            key={task.id}
            task={task}
            onToggle={onTaskToggle}
            isExpanded={expandedTasks.has(task.id)}
            onExpand={() => toggleTask(task.id)}
            showXPAnimation={showXPAnimation}
          />
        ))}
      </CardContent>
    </Card>
  );
}

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  isExpanded: boolean;
  onExpand: () => void;
  showXPAnimation: boolean;
}

function TaskItemV2({ task, onToggle, isExpanded, onExpand, showXPAnimation }: TaskItemProps) {
  const [showXP, setShowXP] = useState(false);

  const handleToggle = () => {
    if (!task.completed && showXPAnimation) {
      setShowXP(true);
      setTimeout(() => setShowXP(false), 2000);
    }
    onToggle(task.id);
  };

  return (
    <div className={`relative rounded-lg border transition-all ${
      task.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggle}
            className="flex-shrink-0 mt-0.5 hover:scale-110 transition-transform"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Text 
                    weight="medium" 
                    className={task.completed ? 'line-through text-gray-500' : ''}
                  >
                    {task.title}
                  </Text>
                  {task.detailedContent && (
                    <button
                      onClick={onExpand}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <BookOpen className="w-4 h-4" />
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                <Text 
                  size="sm" 
                  color="muted" 
                  className={task.completed ? 'line-through' : ''}
                >
                  {task.description}
                </Text>
                {task.detailedContent && !isExpanded && (
                  <Text size="xs" color="muted" className="mt-1 italic">
                    Click the book icon for detailed guide and instructions
                  </Text>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {task.estimatedTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <Text size="xs" color="muted">
                      {task.estimatedTime}m
                    </Text>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <Text size="xs" weight="medium">
                    {task.xp}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Content Expansion */}
        {isExpanded && task.detailedContent && (
          <div className="mt-4 pt-4 border-t bg-gray-50 -mx-4 px-4 pb-4 space-y-4">
            {/* Objective */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-600" />
                <Text weight="medium">Objective</Text>
              </div>
              <Text size="sm" className="text-gray-700 pl-6">
                {task.detailedContent.objective}
              </Text>
            </div>

            {/* Step-by-Step Guide */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-green-600" />
                <Text weight="medium">Step-by-Step Guide</Text>
              </div>
              <div className="pl-6 space-y-2">
                {task.detailedContent.guide.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <Text size="sm" className="text-gray-700 flex-1">
                      {step}
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {task.detailedContent.tips.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  <Text weight="medium">Pro Tips</Text>
                </div>
                <div className="pl-6 space-y-2">
                  {task.detailedContent.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <Text size="sm" className="text-gray-700">
                        {tip}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            {task.detailedContent.examples && task.detailedContent.examples.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <Text weight="medium">Examples</Text>
                </div>
                <div className="pl-6 space-y-2">
                  {task.detailedContent.examples.map((example, index) => (
                    <div key={index} className="bg-white p-3 rounded border-l-4 border-purple-200">
                      <Text size="sm" className="text-gray-700 italic">
                        "{example}"
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverable */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <Text weight="medium" className="text-blue-800">
                  Expected Deliverable
                </Text>
              </div>
              <Text size="sm" className="text-blue-700 pl-6">
                {task.detailedContent.deliverable}
              </Text>
            </div>
          </div>
        )}

        {/* XP Animation */}
        {showXP && (
          <div className="absolute -top-2 right-4 animate-bounce">
            <div className="bg-yellow-100 border border-yellow-300 rounded-full px-2 py-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-600" />
              <Text size="xs" weight="bold" className="text-yellow-700">
                +{task.xp} XP
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}