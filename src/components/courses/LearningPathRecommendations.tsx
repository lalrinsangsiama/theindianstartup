'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import Link from 'next/link';
import {
  Lightbulb,
  Rocket,
  TrendingUp,
  Globe,
  ChevronRight,
  CheckCircle,
  Lock,
  Star,
  ArrowRight,
  MapPin,
  Target,
  Layers,
  BookOpen
} from 'lucide-react';
import { COURSE_CONTENT_STATS } from './CourseContentBreakdown';

// Learning path stages
export type FounderStage = 'idea' | 'launch' | 'growth' | 'scale' | 'global';

interface LearningPath {
  id: FounderStage;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  courses: string[];
  prerequisites?: string[];
}

// Define learning paths for different founder stages
export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'idea',
    title: 'Idea Stage',
    description: 'Validate your idea and build foundations',
    icon: <Lightbulb className="w-5 h-5" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    courses: ['P1', 'P17', 'P2']
  },
  {
    id: 'launch',
    title: 'Launch Stage',
    description: 'Incorporate, fund, and go to market',
    icon: <Rocket className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    courses: ['P2', 'P3', 'P4', 'P5', 'P6'],
    prerequisites: ['P1']
  },
  {
    id: 'growth',
    title: 'Growth Stage',
    description: 'Scale operations and build systems',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    courses: ['P8', 'P9', 'P11', 'P12', 'P16', 'P18', 'P19'],
    prerequisites: ['P1', 'P2', 'P3']
  },
  {
    id: 'scale',
    title: 'Scale Stage',
    description: 'Dominate your sector with specialized mastery',
    icon: <Target className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    courses: ['P7', 'P10', 'P13', 'P14', 'P15', 'P20', 'P21', 'P22', 'P23', 'P24', 'P25', 'P26', 'P27', 'P28', 'P29'],
    prerequisites: ['P1', 'P2']
  },
  {
    id: 'global',
    title: 'Global Stage',
    description: 'Expand internationally and go global',
    icon: <Globe className="w-5 h-5" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    courses: ['P30'],
    prerequisites: ['P1', 'P2', 'P3', 'P5']
  }
];

// Course prerequisites mapping
export const COURSE_PREREQUISITES: Record<string, string[]> = {
  P1: [], // No prerequisites - start here!
  P2: ['P1'],
  P3: ['P1', 'P2'],
  P4: ['P2'],
  P5: ['P2'],
  P6: ['P1'],
  P7: [],
  P8: ['P3'],
  P9: [],
  P10: ['P5'],
  P11: ['P1'],
  P12: ['P1', 'P11'],
  P13: [],
  P14: [],
  P15: [],
  P16: ['P2'],
  P17: ['P1'],
  P18: ['P1'],
  P19: [],
  P20: ['P2', 'P4'],
  P21: ['P2'],
  P22: ['P1', 'P6'],
  P23: ['P2'],
  P24: ['P2'],
  P25: ['P1'],
  P26: [],
  P27: ['P2'],
  P28: ['P2', 'P5'],
  P29: ['P1', 'P19'],
  P30: ['P2', 'P5']
};

// Recommended starting courses based on different criteria
export const RECOMMENDED_STARTS: Record<string, { courses: string[]; reason: string }> = {
  'first-time': {
    courses: ['P1'],
    reason: 'Perfect for validating your idea and getting started'
  },
  'existing-business': {
    courses: ['P2', 'P4'],
    reason: 'Formalize and optimize your existing operations'
  },
  'funding-focused': {
    courses: ['P3', 'P9'],
    reason: 'Access funding opportunities right away'
  },
  'sector-specific': {
    courses: ['P13', 'P20', 'P21'],
    reason: 'Deep dive into your industry'
  }
};

interface LearningPathRecommendationsProps {
  ownedCourses?: string[];
  currentStage?: FounderStage;
  className?: string;
  variant?: 'full' | 'compact' | 'horizontal';
}

export function LearningPathRecommendations({
  ownedCourses = [],
  currentStage,
  className = '',
  variant = 'full'
}: LearningPathRecommendationsProps) {
  const [selectedStage, setSelectedStage] = useState<FounderStage>(currentStage || 'idea');

  // Calculate progress for each stage
  const getStageProgress = (path: LearningPath): { completed: number; total: number } => {
    const completed = path.courses.filter(c => ownedCourses.includes(c)).length;
    return { completed, total: path.courses.length };
  };

  // Check if prerequisites are met for a course
  const hasPrerequisites = (courseCode: string): boolean => {
    const prerequisites = COURSE_PREREQUISITES[courseCode] || [];
    return prerequisites.every(prereq => ownedCourses.includes(prereq));
  };

  // Get recommended next course
  const getNextRecommendedCourse = (): string | null => {
    // Priority: complete current stage courses first
    for (const path of LEARNING_PATHS) {
      for (const courseCode of path.courses) {
        if (!ownedCourses.includes(courseCode) && hasPrerequisites(courseCode)) {
          return courseCode;
        }
      }
    }
    return null;
  };

  const nextCourse = getNextRecommendedCourse();
  const selectedPath = LEARNING_PATHS.find(p => p.id === selectedStage);

  if (variant === 'horizontal') {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex gap-4 min-w-max pb-4">
          {LEARNING_PATHS.map((path) => {
            const progress = getStageProgress(path);
            const isActive = path.id === selectedStage;

            return (
              <button
                key={path.id}
                onClick={() => setSelectedStage(path.id)}
                className={`
                  flex-shrink-0 p-4 rounded-xl border-2 transition-all text-left
                  ${isActive
                    ? `${path.borderColor} ${path.bgColor}`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
                style={{ minWidth: '200px' }}
              >
                <div className={`${path.color} mb-2`}>{path.icon}</div>
                <Text weight="semibold" size="sm">{path.title}</Text>
                <Text size="xs" color="muted" className="mt-1">{path.description}</Text>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${path.bgColor.replace('bg-', 'bg-').replace('-50', '-500')} rounded-full`}
                      style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                    />
                  </div>
                  <Text size="xs" color="muted">{progress.completed}/{progress.total}</Text>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={`border-2 border-blue-200 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <Text weight="semibold">Your Learning Path</Text>
              <Text size="sm" color="muted">
                {ownedCourses.length === 0 ? 'Start your journey' : 'Continue your progress'}
              </Text>
            </div>
          </div>

          {nextCourse && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-green-600" />
                <Text size="sm" weight="medium" className="text-green-800">
                  Recommended Next
                </Text>
              </div>
              <Text size="sm" className="text-green-700 mb-2">
                {COURSE_CONTENT_STATS[nextCourse]?.title || nextCourse}
              </Text>
              <Link href={`/products/${nextCourse.toLowerCase()}`}>
                <Button size="sm" variant="primary" className="w-full bg-green-600 hover:bg-green-700">
                  Start {nextCourse}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Text color="muted">
              {ownedCourses.length}/30 courses completed
            </Text>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(ownedCourses.length / 30) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full variant
  return (
    <Card className={`border-2 border-gray-200 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Learning Path Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stage Selector */}
        <div className="flex flex-wrap gap-2">
          {LEARNING_PATHS.map((path) => {
            const progress = getStageProgress(path);
            const isActive = path.id === selectedStage;

            return (
              <button
                key={path.id}
                onClick={() => setSelectedStage(path.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
                  ${isActive
                    ? `${path.borderColor} ${path.bgColor} ${path.color}`
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                  }
                `}
              >
                {path.icon}
                <span className="font-medium text-sm">{path.title}</span>
                {progress.completed > 0 && (
                  <Badge className="bg-white text-gray-700 text-xs ml-1">
                    {progress.completed}/{progress.total}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Details */}
        {selectedPath && (
          <div className={`p-6 rounded-xl ${selectedPath.bgColor} border ${selectedPath.borderColor}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={selectedPath.color}>{selectedPath.icon}</div>
                  <Text size="lg" weight="bold">{selectedPath.title}</Text>
                </div>
                <Text color="muted">{selectedPath.description}</Text>
              </div>
              {getStageProgress(selectedPath).completed === selectedPath.courses.length && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Complete
                </Badge>
              )}
            </div>

            {/* Prerequisites */}
            {selectedPath.prerequisites && selectedPath.prerequisites.length > 0 && (
              <div className="mb-4 p-3 bg-white/50 rounded-lg">
                <Text size="sm" weight="medium" className="mb-2">
                  Recommended Prerequisites:
                </Text>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.prerequisites.map(prereq => (
                    <Badge
                      key={prereq}
                      className={
                        ownedCourses.includes(prereq)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }
                    >
                      {ownedCourses.includes(prereq) && (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      )}
                      {prereq}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Courses in this stage */}
            <div className="space-y-3">
              <Text weight="medium" size="sm">Courses in this stage:</Text>
              <div className="grid gap-2">
                {selectedPath.courses.map(courseCode => {
                  const stats = COURSE_CONTENT_STATS[courseCode];
                  const isOwned = ownedCourses.includes(courseCode);
                  const canAccess = hasPrerequisites(courseCode);

                  return (
                    <div
                      key={courseCode}
                      className={`
                        flex items-center justify-between p-3 rounded-lg bg-white border
                        ${isOwned ? 'border-green-200' : canAccess ? 'border-gray-200' : 'border-gray-100 opacity-60'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${isOwned ? 'bg-green-100' : canAccess ? 'bg-blue-100' : 'bg-gray-100'}
                        `}>
                          {isOwned ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : canAccess ? (
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <Text size="sm" weight="medium">
                            {courseCode}: {stats?.title || 'Course'}
                          </Text>
                          {stats && (
                            <Text size="xs" color="muted">
                              {stats.moduleCount} modules • {stats.lessonCount} lessons
                            </Text>
                          )}
                        </div>
                      </div>

                      {isOwned ? (
                        <Link href={`/products/${courseCode.toLowerCase()}`}>
                          <Button size="sm" variant="outline">
                            Continue
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      ) : canAccess ? (
                        <Link href={`/products/${courseCode.toLowerCase()}`}>
                          <Button size="sm" variant="primary">
                            Get Access
                          </Button>
                        </Link>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          <Lock className="w-3 h-3 mr-1" />
                          Prerequisites needed
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Quick Start Options */}
        {ownedCourses.length === 0 && (
          <div className="pt-4 border-t">
            <Text weight="medium" className="mb-3">Quick Start Based on Your Goals:</Text>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(RECOMMENDED_STARTS).map(([key, value]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Text size="sm" weight="medium" className="mb-1 capitalize">
                    {key.replace('-', ' ')}
                  </Text>
                  <Text size="xs" color="muted" className="mb-2">{value.reason}</Text>
                  <div className="flex gap-2">
                    {value.courses.slice(0, 2).map(code => (
                      <Link key={code} href={`/products/${code.toLowerCase()}`}>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer">
                          {code}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default LearningPathRecommendations;
