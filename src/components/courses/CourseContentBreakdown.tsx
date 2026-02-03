'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import {
  BookOpen,
  Clock,
  FileText,
  Layers,
  Target,
  CheckCircle,
  GraduationCap,
  Download
} from 'lucide-react';

export interface CourseContentStats {
  code: string;
  title: string;
  moduleCount: number;
  lessonCount: number;
  templateCount: number;
  toolCount: number;
  estimatedDays: number;
  estimatedHoursPerDay?: number;
  modules?: Array<{
    title: string;
    lessonCount: number;
    description?: string;
  }>;
}

interface CourseContentBreakdownProps {
  stats: CourseContentStats;
  variant?: 'full' | 'compact' | 'minimal';
  showModuleDetails?: boolean;
  className?: string;
}

// Estimated learning hours calculation
const calculateLearningHours = (lessonCount: number, estimatedDays: number): number => {
  // Assume 1-2 hours per lesson on average
  return Math.round(lessonCount * 1.5);
};

export function CourseContentBreakdown({
  stats,
  variant = 'full',
  showModuleDetails = false,
  className = ''
}: CourseContentBreakdownProps) {
  const totalHours = calculateLearningHours(stats.lessonCount, stats.estimatedDays);
  const totalResources = stats.templateCount + stats.toolCount;

  if (variant === 'minimal') {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        <Badge variant="outline" className="flex items-center gap-1">
          <Layers className="w-3 h-3" />
          {stats.moduleCount} Modules
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          {stats.lessonCount} Lessons
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <FileText className="w-3 h-3" />
          {totalResources}+ Resources
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {totalHours} Hours
        </Badge>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`p-4 bg-gray-50 rounded-lg border border-gray-200 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-blue-600" />
          <Text weight="semibold" size="sm">What's Included</Text>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            <Text size="sm">
              <span className="font-bold">{stats.moduleCount}</span> Modules
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <Text size="sm">
              <span className="font-bold">{stats.lessonCount}</span> Lessons
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-600" />
            <Text size="sm">
              <span className="font-bold">{stats.templateCount}+</span> Templates
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <Text size="sm">
              <span className="font-bold">{totalHours}</span> Hours
            </Text>
          </div>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <Card className={`border-2 border-gray-200 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-blue-600" />
          What's Included in {stats.code}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <Layers className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold text-purple-700">
              {stats.moduleCount}
            </Text>
            <Text size="sm" color="muted">Modules</Text>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold text-blue-700">
              {stats.lessonCount}
            </Text>
            <Text size="sm" color="muted">Lessons</Text>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold text-green-700">
              {stats.templateCount}+
            </Text>
            <Text size="sm" color="muted">Templates</Text>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold text-orange-700">
              {totalHours}
            </Text>
            <Text size="sm" color="muted">Hours</Text>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-gray-600" />
              <Text weight="medium">Learning Duration</Text>
            </div>
            <Text size="sm" color="muted">
              Complete in <span className="font-semibold text-gray-900">{stats.estimatedDays} days</span> with daily action plans
            </Text>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-5 h-5 text-gray-600" />
              <Text weight="medium">Downloadable Resources</Text>
            </div>
            <Text size="sm" color="muted">
              <span className="font-semibold text-gray-900">{totalResources}+</span> templates, tools, and checklists included
            </Text>
          </div>
        </div>

        {/* Module Details */}
        {showModuleDetails && stats.modules && stats.modules.length > 0 && (
          <div className="pt-4 border-t">
            <Text weight="semibold" className="mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Module Breakdown
            </Text>
            <div className="space-y-2">
              {stats.modules.map((module, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Text size="sm" weight="bold" className="text-blue-600">
                        {index + 1}
                      </Text>
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{module.title}</Text>
                      {module.description && (
                        <Text size="xs" color="muted">{module.description}</Text>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {module.lessonCount} lessons
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper component to show content stats inline
export function ContentStatsRow({
  moduleCount,
  lessonCount,
  templateCount,
  estimatedDays,
  className = ''
}: {
  moduleCount: number;
  lessonCount: number;
  templateCount: number;
  estimatedDays: number;
  className?: string;
}) {
  const totalHours = calculateLearningHours(lessonCount, estimatedDays);

  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm ${className}`}>
      <div className="flex items-center gap-1">
        <Layers className="w-4 h-4 text-purple-600" />
        <span className="font-medium">{moduleCount}</span>
        <span className="text-gray-500">modules</span>
      </div>
      <div className="flex items-center gap-1">
        <BookOpen className="w-4 h-4 text-blue-600" />
        <span className="font-medium">{lessonCount}</span>
        <span className="text-gray-500">lessons</span>
      </div>
      <div className="flex items-center gap-1">
        <FileText className="w-4 h-4 text-green-600" />
        <span className="font-medium">{templateCount}+</span>
        <span className="text-gray-500">templates</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4 text-orange-600" />
        <span className="font-medium">{totalHours}</span>
        <span className="text-gray-500">hours</span>
      </div>
    </div>
  );
}

// Course content data for all courses (based on database content)
export const COURSE_CONTENT_STATS: Record<string, CourseContentStats> = {
  P1: {
    code: 'P1',
    title: '30-Day India Launch Sprint',
    moduleCount: 4,
    lessonCount: 30,
    templateCount: 50,
    toolCount: 10,
    estimatedDays: 30,
    modules: [
      { title: 'Week 1: Idea Validation', lessonCount: 7, description: 'Validate your business idea' },
      { title: 'Week 2: Business Model', lessonCount: 7, description: 'Design your revenue model' },
      { title: 'Week 3: Incorporation', lessonCount: 8, description: 'Legal setup and compliance' },
      { title: 'Week 4: MVP & Launch', lessonCount: 8, description: 'Build and launch' }
    ]
  },
  P2: {
    code: 'P2',
    title: 'Incorporation & Compliance Kit',
    moduleCount: 10,
    lessonCount: 45,
    templateCount: 150,
    toolCount: 20,
    estimatedDays: 40
  },
  P3: {
    code: 'P3',
    title: 'Funding in India - Complete Mastery',
    moduleCount: 12,
    lessonCount: 60,
    templateCount: 200,
    toolCount: 25,
    estimatedDays: 45
  },
  P4: {
    code: 'P4',
    title: 'Finance Stack - CFO-Level Mastery',
    moduleCount: 12,
    lessonCount: 60,
    templateCount: 250,
    toolCount: 30,
    estimatedDays: 45
  },
  P5: {
    code: 'P5',
    title: 'Legal Stack - Bulletproof Framework',
    moduleCount: 12,
    lessonCount: 45,
    templateCount: 300,
    toolCount: 25,
    estimatedDays: 45
  },
  P6: {
    code: 'P6',
    title: 'Sales & GTM Master Course',
    moduleCount: 10,
    lessonCount: 60,
    templateCount: 75,
    toolCount: 20,
    estimatedDays: 60
  },
  P7: {
    code: 'P7',
    title: 'State-wise Scheme Map',
    moduleCount: 10,
    lessonCount: 30,
    templateCount: 100,
    toolCount: 15,
    estimatedDays: 30
  },
  P8: {
    code: 'P8',
    title: 'Investor-Ready Data Room',
    moduleCount: 8,
    lessonCount: 63,
    templateCount: 50,
    toolCount: 20,
    estimatedDays: 45
  },
  P9: {
    code: 'P9',
    title: 'Government Schemes & Funding',
    moduleCount: 4,
    lessonCount: 21,
    templateCount: 40,
    toolCount: 15,
    estimatedDays: 21
  },
  P10: {
    code: 'P10',
    title: 'Patent Mastery for Startups',
    moduleCount: 12,
    lessonCount: 60,
    templateCount: 100,
    toolCount: 20,
    estimatedDays: 60
  },
  P11: {
    code: 'P11',
    title: 'Branding & PR Mastery',
    moduleCount: 12,
    lessonCount: 93,
    templateCount: 300,
    toolCount: 25,
    estimatedDays: 54
  },
  P12: {
    code: 'P12',
    title: 'Marketing Mastery',
    moduleCount: 12,
    lessonCount: 60,
    templateCount: 500,
    toolCount: 30,
    estimatedDays: 60
  },
  P13: {
    code: 'P13',
    title: 'Food Processing Mastery',
    moduleCount: 10,
    lessonCount: 55,
    templateCount: 150,
    toolCount: 20,
    estimatedDays: 50
  },
  P14: {
    code: 'P14',
    title: 'Impact & CSR Mastery',
    moduleCount: 11,
    lessonCount: 55,
    templateCount: 100,
    toolCount: 15,
    estimatedDays: 55
  },
  P15: {
    code: 'P15',
    title: 'Carbon Credits & Sustainability',
    moduleCount: 12,
    lessonCount: 55,
    templateCount: 80,
    toolCount: 20,
    estimatedDays: 60
  },
  P16: {
    code: 'P16',
    title: 'HR & Team Building Mastery',
    moduleCount: 9,
    lessonCount: 45,
    templateCount: 50,
    toolCount: 15,
    estimatedDays: 45
  },
  P17: {
    code: 'P17',
    title: 'Product Development & Validation',
    moduleCount: 10,
    lessonCount: 50,
    templateCount: 40,
    toolCount: 20,
    estimatedDays: 50
  },
  P18: {
    code: 'P18',
    title: 'Operations & Supply Chain',
    moduleCount: 8,
    lessonCount: 40,
    templateCount: 35,
    toolCount: 15,
    estimatedDays: 40
  },
  P19: {
    code: 'P19',
    title: 'Technology Stack & Infrastructure',
    moduleCount: 9,
    lessonCount: 45,
    templateCount: 40,
    toolCount: 20,
    estimatedDays: 45
  },
  P20: {
    code: 'P20',
    title: 'FinTech Mastery',
    moduleCount: 11,
    lessonCount: 55,
    templateCount: 50,
    toolCount: 15,
    estimatedDays: 55
  },
  P21: {
    code: 'P21',
    title: 'HealthTech & Medical Devices',
    moduleCount: 11,
    lessonCount: 55,
    templateCount: 55,
    toolCount: 15,
    estimatedDays: 55
  },
  P22: {
    code: 'P22',
    title: 'E-commerce & D2C Mastery',
    moduleCount: 10,
    lessonCount: 50,
    templateCount: 45,
    toolCount: 15,
    estimatedDays: 50
  },
  P23: {
    code: 'P23',
    title: 'EV & Clean Mobility',
    moduleCount: 11,
    lessonCount: 55,
    templateCount: 50,
    toolCount: 15,
    estimatedDays: 55
  },
  P24: {
    code: 'P24',
    title: 'Manufacturing & Make in India',
    moduleCount: 11,
    lessonCount: 55,
    templateCount: 55,
    toolCount: 20,
    estimatedDays: 55
  },
  P25: {
    code: 'P25',
    title: 'EdTech Mastery',
    moduleCount: 9,
    lessonCount: 45,
    templateCount: 40,
    toolCount: 15,
    estimatedDays: 45
  },
  P26: {
    code: 'P26',
    title: 'AgriTech & Farm-to-Fork',
    moduleCount: 9,
    lessonCount: 45,
    templateCount: 40,
    toolCount: 15,
    estimatedDays: 45
  },
  P27: {
    code: 'P27',
    title: 'Real Estate & PropTech',
    moduleCount: 10,
    lessonCount: 50,
    templateCount: 45,
    toolCount: 15,
    estimatedDays: 50
  },
  P28: {
    code: 'P28',
    title: 'Biotech & Life Sciences',
    moduleCount: 12,
    lessonCount: 60,
    templateCount: 60,
    toolCount: 20,
    estimatedDays: 60
  },
  P29: {
    code: 'P29',
    title: 'SaaS & B2B Tech Mastery',
    moduleCount: 10,
    lessonCount: 50,
    templateCount: 45,
    toolCount: 20,
    estimatedDays: 50
  },
  P30: {
    code: 'P30',
    title: 'International Expansion',
    moduleCount: 11,
    lessonCount: 55,
    templateCount: 55,
    toolCount: 15,
    estimatedDays: 55
  }
};

// Calculate total content stats for bundle displays
export function calculateBundleStats(productCodes: string[]): {
  totalCourses: number;
  totalModules: number;
  totalLessons: number;
  totalTemplates: number;
  totalTools: number;
  totalHours: number;
} {
  let totalModules = 0;
  let totalLessons = 0;
  let totalTemplates = 0;
  let totalTools = 0;

  productCodes.forEach(code => {
    const stats = COURSE_CONTENT_STATS[code];
    if (stats) {
      totalModules += stats.moduleCount;
      totalLessons += stats.lessonCount;
      totalTemplates += stats.templateCount;
      totalTools += stats.toolCount;
    }
  });

  return {
    totalCourses: productCodes.length,
    totalModules,
    totalLessons,
    totalTemplates,
    totalTools,
    totalHours: Math.round(totalLessons * 1.5)
  };
}

export default CourseContentBreakdown;
