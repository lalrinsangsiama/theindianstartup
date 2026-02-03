'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import {
  BookOpen,
  Shield,
  CheckCircle,
  FileText,
  Award,
  Zap
} from 'lucide-react';

// Platform content metrics based on actual database content
// These are FACTUAL counts from the product catalog, not fabricated user metrics
export const PLATFORM_METRICS = {
  totalCourses: 30,
  totalModules: 296,
  totalLessons: 1500,
  totalTemplates: 450,
  totalTools: 300,
  totalToolkits: 18,
  moneyBackGuarantee: 3, // days
  accessDuration: 365 // days
};

interface SocialProofBannerProps {
  className?: string;
  variant?: 'full' | 'compact' | 'minimal';
}

export function SocialProofBanner({
  className = '',
  variant = 'full'
}: SocialProofBannerProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 text-sm ${className}`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>{PLATFORM_METRICS.totalCourses} courses</span>
        </div>
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="w-4 h-4" />
          <span>{PLATFORM_METRICS.totalTemplates}+ templates</span>
        </div>
        <div className="flex items-center gap-2 text-blue-700">
          <Shield className="w-4 h-4" />
          <span>{PLATFORM_METRICS.moneyBackGuarantee}-day guarantee</span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg ${className}`}>
        <div className="text-center">
          <Text className="text-2xl font-bold text-blue-700">{PLATFORM_METRICS.totalCourses}</Text>
          <Text size="xs" color="muted">Courses</Text>
        </div>
        <div className="text-center">
          <Text className="text-2xl font-bold text-green-700">{PLATFORM_METRICS.totalTemplates}+</Text>
          <Text size="xs" color="muted">Templates</Text>
        </div>
        <div className="text-center">
          <Text className="text-2xl font-bold text-purple-700">{PLATFORM_METRICS.totalModules}</Text>
          <Text size="xs" color="muted">Modules</Text>
        </div>
        <div className="text-center">
          <Text className="text-2xl font-bold text-orange-700">{PLATFORM_METRICS.totalLessons}+</Text>
          <Text size="xs" color="muted">Lessons</Text>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <Card className={`border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <Badge className="bg-blue-600 text-white mb-2">Platform Content</Badge>
          <Text weight="semibold" size="lg">Everything You Need to Build Your Startup</Text>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <Text className="text-xl font-bold text-blue-700">{PLATFORM_METRICS.totalCourses}</Text>
            <Text size="xs" color="muted">Courses</Text>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <Text className="text-xl font-bold text-green-700">{PLATFORM_METRICS.totalTemplates}+</Text>
            <Text size="xs" color="muted">Templates</Text>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <Text className="text-xl font-bold text-purple-700">{PLATFORM_METRICS.totalModules}</Text>
            <Text size="xs" color="muted">Modules</Text>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <Text className="text-xl font-bold text-orange-700">{PLATFORM_METRICS.totalTools}+</Text>
            <Text size="xs" color="muted">Tools</Text>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>{PLATFORM_METRICS.moneyBackGuarantee}-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>{PLATFORM_METRICS.accessDuration} days access</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface TrustBadgesProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

export function TrustBadges({ className = '', variant = 'horizontal' }: TrustBadgesProps) {
  const badges = [
    {
      icon: <Shield className="w-5 h-5 text-green-600" />,
      text: `${PLATFORM_METRICS.moneyBackGuarantee}-Day Money Back Guarantee`,
      description: 'Full refund, no questions asked'
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      text: 'Instant Access',
      description: 'Start learning immediately'
    },
    {
      icon: <Award className="w-5 h-5 text-purple-600" />,
      text: 'Certificate on Completion',
      description: 'Industry-recognized certification'
    }
  ];

  if (variant === 'vertical') {
    return (
      <div className={`space-y-3 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            {badge.icon}
            <div>
              <Text size="sm" weight="medium">{badge.text}</Text>
              <Text size="xs" color="muted">{badge.description}</Text>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          {badge.icon}
          <Text size="sm" weight="medium">{badge.text}</Text>
        </div>
      ))}
    </div>
  );
}

export default SocialProofBanner;
