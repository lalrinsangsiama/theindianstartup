'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle, 
  Circle,
  Star,
  Award,
  TrendingUp,
  BookOpen,
  Lock,
  ChevronRight,
  BarChart3,
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent: number;
  xpEarned: number;
  lesson: {
    id: string;
    title: string;
    day: number;
    moduleId: string;
  };
}

interface ModuleProgress {
  moduleId: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  completed: boolean;
  module: {
    id: string;
    title: string;
    orderIndex: number;
  };
}

interface P8Progress {
  overall: {
    progressPercentage: number;
    completedLessons: number;
    totalLessons: number;
    completedModules: number;
    totalModules: number;
  };
  modules: ModuleProgress[];
  lessons: LessonProgress[];
  stats: {
    totalXP: number;
    totalTimeSpent: number;
    certificateEligible: boolean;
  };
  nextLesson?: {
    id: string;
    title: string;
    day: number;
  };
  achievements: {
    firstLessonComplete: boolean;
    halfwayThere: boolean;
    almostDone: boolean;
    courseComplete: boolean;
    dataRoomMaster: boolean;
    investorReady: boolean;
  };
}

export default function P8ProgressTracker() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<P8Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/products/P8/progress');
      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonAction = async (lessonId: string, action: 'start' | 'complete') => {
    try {
      const response = await fetch('/api/products/P8/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, action })
      });

      if (response.ok) {
        await fetchProgress(); // Refresh progress
        if (action === 'complete') {
          // Show success message or animation
          console.log('Lesson completed!');
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!progress) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">No progress data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your P8 Journey</span>
            <Badge className="bg-purple-600 text-white">
              {progress.overall.progressPercentage}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress 
            value={progress.overall.progressPercentage} 
            className="h-4 mb-4"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-blue-600 mr-1" />
                <span className="text-2xl font-bold">{progress.overall.completedLessons}</span>
                <span className="text-gray-600 ml-1">/ {progress.overall.totalLessons}</span>
              </div>
              <p className="text-sm text-gray-600">Lessons</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-green-600 mr-1" />
                <span className="text-2xl font-bold">{progress.overall.completedModules}</span>
                <span className="text-gray-600 ml-1">/ {progress.overall.totalModules}</span>
              </div>
              <p className="text-sm text-gray-600">Modules</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-yellow-600 mr-1" />
                <span className="text-2xl font-bold">{progress.stats.totalXP}</span>
              </div>
              <p className="text-sm text-gray-600">XP Earned</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-purple-600 mr-1" />
                <span className="text-2xl font-bold">{formatTime(progress.stats.totalTimeSpent)}</span>
              </div>
              <p className="text-sm text-gray-600">Time Invested</p>
            </div>
          </div>

          {/* Next Lesson */}
          {progress.nextLesson && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Continue Learning</p>
                  <p className="font-semibold">Day {progress.nextLesson.day}: {progress.nextLesson.title}</p>
                </div>
                <Button 
                  onClick={() => handleLessonAction(progress.nextLesson!.id, 'start')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Start Lesson
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Certificate Eligibility */}
          {progress.stats.certificateEligible && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-700 font-medium">
                  You're eligible for the P8 Certificate! Complete remaining lessons to claim it.
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Module Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Module Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.modules.map((module) => (
              <div key={module.moduleId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {module.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 mr-2" />
                    )}
                    <span className="font-medium">{module.module.title}</span>
                  </div>
                  <Badge variant={module.completed ? "default" : "outline"}>
                    {module.completedLessons}/{module.totalLessons} Lessons
                  </Badge>
                </div>
                <Progress value={module.progressPercentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(progress.achievements).map(([key, earned]) => (
              <div 
                key={key}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  earned 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <Trophy className={`w-8 h-8 mx-auto mb-2 ${
                  earned ? 'text-yellow-600' : 'text-gray-400'
                }`} />
                <p className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                {earned && (
                  <div className="flex justify-center mt-1">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Streak */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Keep the Momentum!</h3>
              <p className="text-gray-600">
                You've completed {progress.overall.completedLessons} lessons. 
                {progress.overall.totalLessons - progress.overall.completedLessons} more to go!
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}