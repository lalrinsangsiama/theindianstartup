'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  FileText, 
  Wrench, 
  Video, 
  BookOpen, 
  Download,
  ExternalLink,
  Clock,
  Target,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Users,
  MessageSquare
} from 'lucide-react';

interface PremiumLessonContentProps {
  lesson: {
    day: number;
    title: string;
    briefContent: string;
    actionItems: any[];
    resources: any;
    metadata?: any;
    estimatedTime: number;
    xpReward: number;
  };
  onComplete: () => void;
  isCompleted: boolean;
}

export function PremiumLessonContent({ lesson, onComplete, isCompleted }: PremiumLessonContentProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const taskCompletion = lesson.actionItems ? 
    (completedTasks.size / lesson.actionItems.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <Card className="border-2 border-gray-900 bg-gradient-to-r from-gray-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="font-mono">Day {lesson.day}</Badge>
                <Badge className="bg-gray-900 text-white">
                  <Trophy className="w-3 h-3 mr-1" />
                  {lesson.xpReward} XP
                </Badge>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  {lesson.estimatedTime} min
                </Badge>
              </div>
              <h1 className="text-2xl font-bold font-mono mb-2">{lesson.title}</h1>
              <p className="text-gray-600">{lesson.briefContent}</p>
            </div>
            {isCompleted && (
              <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Completed
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Task Progress</span>
              <span>{Math.round(taskCompletion)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${taskCompletion}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="expert">Expert Insights</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {lesson.metadata?.deliverables && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Today's Deliverables
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lesson.metadata.deliverables.map((deliverable: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>{deliverable}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.metadata?.milestone && (
            <Card className="border-2 border-yellow-500 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h3 className="font-bold text-lg">{lesson.metadata.milestone}</h3>
                    {lesson.metadata.badge && (
                      <Badge className="mt-2 bg-yellow-600 text-white">
                        Unlock: {lesson.metadata.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lesson.actionItems?.map((item: any, index: number) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      completedTasks.has(`task-${index}`) 
                        ? 'bg-green-50 border-green-500' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleTask(`task-${index}`)}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 
                        className={`w-5 h-5 mt-0.5 ${
                          completedTasks.has(`task-${index}`) 
                            ? 'text-green-600' 
                            : 'text-gray-400'
                        }`}
                      />
                      <div className="flex-1">
                        <p className={completedTasks.has(`task-${index}`) ? 'line-through' : ''}>
                          {item.task}
                        </p>
                        {item.priority && (
                          <Badge 
                            variant="outline" 
                            className={`mt-1 text-xs ${
                              item.priority === 'high' ? 'border-red-500 text-red-600' :
                              item.priority === 'medium' ? 'border-yellow-500 text-yellow-600' :
                              'border-gray-500'
                            }`}
                          >
                            {item.priority} priority
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          {lesson.resources?.templates && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Templates & Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lesson.resources.templates.map((template: any, index: number) => (
                    <a
                      key={index}
                      href={template.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        {template.name}
                      </span>
                      <Download className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.resources?.tools && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Interactive Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lesson.resources.tools.map((tool: any, index: number) => (
                    <a
                      key={index}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-blue-600" />
                        {tool.name}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.resources?.videos && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Video Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lesson.resources.videos.map((video: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-gray-500">{video.duration}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Watch <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {lesson.resources?.readings && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Recommended Reading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lesson.resources.readings.map((reading: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-600" />
                        {reading.title}
                      </span>
                      <Badge variant="outline">{reading.time}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Expert Insights Tab */}
        <TabsContent value="expert" className="space-y-4">
          {lesson.metadata?.expertInsight && (
            <Card className="border-2 border-blue-500 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Expert Insight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg italic">"{lesson.metadata.expertInsight}"</p>
              </CardContent>
            </Card>
          )}

          {lesson.metadata?.caseStudy && (
            <Card>
              <CardHeader>
                <CardTitle>Case Study</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{lesson.metadata.caseStudy}</p>
              </CardContent>
            </Card>
          )}

          {lesson.metadata?.proTip && (
            <Card className="bg-yellow-50 border-yellow-500">
              <CardHeader>
                <CardTitle className="text-yellow-800">💡 Pro Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{lesson.metadata.proTip}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community Discussion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Today's Discussion Topic:</p>
                  <p className="text-gray-600 mb-4">Share your progress on {lesson.title}</p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Join Discussion
                  </Button>
                </div>
                
                <div className="text-center text-sm text-gray-500">
                  <p>235 founders completed this lesson</p>
                  <p>89% success rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {lesson.metadata?.communityEvent && (
            <Card className="bg-purple-50 border-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-medium">Community Event</p>
                    <p className="text-sm text-gray-600">{lesson.metadata.communityEvent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Complete Lesson Button */}
      {!isCompleted && taskCompletion === 100 && (
        <Card className="bg-green-50 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">All tasks completed!</h3>
                <p className="text-gray-600">Mark this lesson as complete to earn {lesson.xpReward} XP</p>
              </div>
              <Button 
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Complete Lesson
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}