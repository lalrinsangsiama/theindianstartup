'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Zap, 
  Star, 
  Archive, 
  ChevronDown,
  ChevronRight,
  PlayCircle,
  Award,
  Target,
  FolderOpen,
  BookOpen,
  Lightbulb,
  ExternalLink,
  FileText,
  Video,
  Wrench,
  Link
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
  documentsRequired?: boolean;
  documents?: {
    id: string;
    title: string;
    description: string;
    fileName?: string;
    fileType?: 'document' | 'spreadsheet' | 'presentation' | 'image' | 'pdf';
    folderSuggestion?: string;
    completed?: boolean;
  }[];
  // Enhanced content for detailed guides
  detailedContent?: {
    objective: string;
    guide: string[];
    tips: string[];
    examples?: string[];
    resources?: {
      title: string;
      url: string;
      type: 'article' | 'template' | 'tool' | 'video';
    }[];
    deliverable: string;
  };
}

interface TaskChecklistProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onDocumentOrganize?: (taskId: string) => void;
  className?: string;
  showXPAnimation?: boolean;
}

export function TaskChecklist({
  tasks,
  onTaskToggle,
  onDocumentOrganize,
  className = '',
  showXPAnimation = true
}: TaskChecklistProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['core']) // Core section expanded by default
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const groupedTasks = {
    'pre-work': tasks.filter(t => t.category === 'pre-work'),
    'core': tasks.filter(t => t.category === 'core'),
    'bonus': tasks.filter(t => t.category === 'bonus'),
  };

  const getSectionInfo = (category: string) => {
    const categoryTasks = groupedTasks[category as keyof typeof groupedTasks];
    const completed = categoryTasks.filter(t => t.completed).length;
    const total = categoryTasks.length;
    const totalXP = categoryTasks.reduce((sum, t) => sum + (t.completed ? t.xp : 0), 0);

    return { completed, total, totalXP, tasks: categoryTasks };
  };

  const getSectionConfig = (category: string) => {
    switch (category) {
      case 'pre-work':
        return {
          title: 'Pre-Work',
          subtitle: 'Quick setup tasks',
          icon: PlayCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'core':
        return {
          title: 'Core Tasks',
          subtitle: 'Main activities for today',
          icon: Target,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'bonus':
        return {
          title: 'Bonus Tasks',
          subtitle: 'Extra credit activities',
          icon: Award,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
      default:
        return {
          title: category,
          subtitle: '',
          icon: Circle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
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
        
        {/* Overall Progress */}
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
        {Object.entries(groupedTasks).map(([category, categoryTasks]) => {
          if (categoryTasks.length === 0) return null;

          const sectionInfo = getSectionInfo(category);
          const config = getSectionConfig(category);
          const isExpanded = expandedSections.has(category);
          const Icon = config.icon;

          return (
            <div key={category} className={`border rounded-lg ${config.borderColor}`}>
              <button
                onClick={() => toggleSection(category)}
                className={`w-full p-4 flex items-center justify-between hover:${config.bgColor} transition-colors rounded-lg`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <Text weight="medium">{config.title}</Text>
                      <Badge variant="outline" size="sm">
                        {sectionInfo.completed}/{sectionInfo.total}
                      </Badge>
                    </div>
                    <Text size="sm" color="muted">
                      {config.subtitle} • +{sectionInfo.totalXP} XP earned
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {sectionInfo.completed === sectionInfo.total && sectionInfo.total > 0 && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {categoryTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={onTaskToggle}
                      onDocumentOrganize={onDocumentOrganize}
                      showXPAnimation={showXPAnimation}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDocumentOrganize?: (taskId: string) => void;
  showXPAnimation: boolean;
}

function TaskItem({ task, onToggle, onDocumentOrganize, showXPAnimation }: TaskItemProps) {
  const [showXP, setShowXP] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (!task.completed && showXPAnimation) {
      setShowXP(true);
      setTimeout(() => setShowXP(false), 2000);
    }
    onToggle(task.id);
  };

  const handleTaskClick = () => {
    if (task.detailedContent) {
      setIsExpanded(!isExpanded);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'template': return FileText;
      case 'tool': return Wrench;
      case 'video': return Video;
      default: return Link;
    }
  };

  return (
    <div className={`relative rounded-lg border transition-all ${
      task.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="p-3">
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
              <div 
                className={`flex-1 ${task.detailedContent ? 'cursor-pointer' : ''}`}
                onClick={handleTaskClick}
              >
                <div className="flex items-center gap-2">
                  <Text 
                    weight="medium" 
                    className={task.completed ? 'line-through text-gray-500' : ''}
                  >
                    {task.title}
                  </Text>
                  {task.detailedContent && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                <Text 
                  size="sm" 
                  color="muted" 
                  className={`mt-1 ${task.completed ? 'line-through' : ''}`}
                >
                  {task.description}
                </Text>
                {task.detailedContent && !isExpanded && (
                  <Text size="xs" color="muted" className="mt-1 italic">
                    Click to view detailed guide and instructions
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

          {/* Document Organization */}
          {task.documentsRequired && (
            <div className="mt-2 flex items-center gap-2">
              {task.documents?.every(doc => doc.completed) && task.documents.length > 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <Text size="sm">All documents organized ({task.documents.length} files)</Text>
                </div>
              ) : task.completed ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDocumentOrganize?.(task.id)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <FolderOpen className="w-4 h-4 mr-1" />
                  Organize Documents
                </Button>
              ) : (
                <Text size="sm" color="muted" className="flex items-center gap-1">
                  <Archive className="w-4 h-4" />
                  Documents to organize
                </Text>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Detailed Content Expansion */}
      {isExpanded && task.detailedContent && (
        <div className="border-t bg-gray-50 p-4 space-y-4">
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
                <Star className="w-4 h-4 text-purple-600" />
                <Text weight="medium">Examples</Text>
              </div>
              <div className="pl-6 space-y-2">
                {task.detailedContent.examples.map((example, index) => (
                  <div key={index} className="bg-white p-3 rounded border-l-4 border-purple-200">
                    <Text size="sm" className="text-gray-700 italic">
                      &quot;{example}&quot;
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {task.detailedContent.resources && task.detailedContent.resources.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <Text weight="medium">Helpful Resources</Text>
              </div>
              <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                {task.detailedContent.resources.map((resource, index) => {
                  const Icon = getResourceIcon(resource.type);
                  return (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white rounded border hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <Text size="sm" className="text-blue-700 hover:text-blue-800">
                        {resource.title}
                      </Text>
                      <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                    </a>
                  );
                })}
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
  );
}