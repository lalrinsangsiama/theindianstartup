'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import {
  Users,
  TrendingUp,
  Award,
  Star,
  CheckCircle,
  Target,
  Banknote,
  GraduationCap,
  Shield,
  Zap
} from 'lucide-react';

// Platform metrics data
export const PLATFORM_METRICS = {
  foundersEnrolled: 2000,
  foundersEnrolledDisplay: '2,000+',
  coursesCompleted: 5000,
  coursesCompletedDisplay: '5,000+',
  fundingRaised: 5000000000, // ₹50Cr
  fundingRaisedDisplay: '₹50Cr+',
  subsidiesAccessed: 2500000000, // ₹25Cr
  subsidiesAccessedDisplay: '₹25Cr+',
  avgRating: 4.8,
  satisfactionRate: 95,
  completionRate: 78,
  avgROI: 5,
  totalCourses: 30,
  totalToolkits: 18,
  totalTemplates: 450,
  avgTimeToResult: '45 days',
  supportResponseTime: '< 2 hours',
  lifetimeAccess: true
};

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtext?: string;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'yellow';
}

function MetricCard({ icon, value, label, subtext, color = 'green' }: MetricCardProps) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600'
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]} text-center`}>
      <div className="flex justify-center mb-2">{icon}</div>
      <Text className="text-2xl font-bold">{value}</Text>
      <Text size="sm" color="muted">{label}</Text>
      {subtext && <Text size="xs" color="muted" className="mt-1">{subtext}</Text>}
    </div>
  );
}

// Trust badges strip - horizontal display
interface TrustBadgesProps {
  variant?: 'full' | 'compact' | 'minimal';
  className?: string;
}

export function TrustBadges({ variant = 'full', className = '' }: TrustBadgesProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        <Badge className="bg-green-100 text-green-800 px-3 py-1">
          <Users className="w-4 h-4 mr-1" />
          {PLATFORM_METRICS.foundersEnrolledDisplay} Founders
        </Badge>
        <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1">
          <Star className="w-4 h-4 mr-1" />
          {PLATFORM_METRICS.avgRating}/5 Rating
        </Badge>
        <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
          <CheckCircle className="w-4 h-4 mr-1" />
          {PLATFORM_METRICS.satisfactionRate}% Satisfaction
        </Badge>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-6 py-4 ${className}`}>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          <div>
            <Text weight="bold" className="text-green-700">{PLATFORM_METRICS.foundersEnrolledDisplay}</Text>
            <Text size="xs" color="muted">Founders</Text>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <div>
            <Text weight="bold" className="text-blue-700">{PLATFORM_METRICS.fundingRaisedDisplay}</Text>
            <Text size="xs" color="muted">Raised</Text>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-600" />
          <div>
            <Text weight="bold" className="text-yellow-700">{PLATFORM_METRICS.avgRating}/5</Text>
            <Text size="xs" color="muted">Rating</Text>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-purple-600" />
          <div>
            <Text weight="bold" className="text-purple-700">{PLATFORM_METRICS.satisfactionRate}%</Text>
            <Text size="xs" color="muted">Satisfaction</Text>
          </div>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <Card className={`border-2 border-green-200 bg-gradient-to-r from-green-50 via-white to-blue-50 ${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <Text weight="semibold" className="text-green-700">Trusted by Indian Founders</Text>
          </div>
          <Text size="sm" color="muted">
            Join the growing community of successful startup founders
          </Text>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            value={PLATFORM_METRICS.foundersEnrolledDisplay}
            label="Founders Enrolled"
            color="green"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            value={PLATFORM_METRICS.fundingRaisedDisplay}
            label="Funding Raised"
            subtext="by alumni"
            color="blue"
          />
          <MetricCard
            icon={<Banknote className="w-6 h-6" />}
            value={PLATFORM_METRICS.subsidiesAccessedDisplay}
            label="Subsidies Accessed"
            subtext="in govt schemes"
            color="purple"
          />
          <MetricCard
            icon={<Star className="w-6 h-6" />}
            value={`${PLATFORM_METRICS.avgRating}/5`}
            label="Average Rating"
            subtext={`${PLATFORM_METRICS.satisfactionRate}% satisfaction`}
            color="yellow"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge className="bg-green-100 text-green-800 px-3 py-1.5">
            <GraduationCap className="w-4 h-4 mr-1" />
            {PLATFORM_METRICS.totalCourses} Courses
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1.5">
            <Target className="w-4 h-4 mr-1" />
            {PLATFORM_METRICS.totalToolkits} Toolkits
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 px-3 py-1.5">
            <Zap className="w-4 h-4 mr-1" />
            {PLATFORM_METRICS.totalTemplates}+ Templates
          </Badge>
          <Badge className="bg-orange-100 text-orange-800 px-3 py-1.5">
            <Award className="w-4 h-4 mr-1" />
            {PLATFORM_METRICS.avgROI}x Avg ROI
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Social proof banner for checkout/pricing pages
interface SocialProofBannerProps {
  className?: string;
}

export function SocialProofBanner({ className = '' }: SocialProofBannerProps) {
  return (
    <div className={`bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <strong>{PLATFORM_METRICS.foundersEnrolledDisplay}</strong> founders enrolled
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <strong>{PLATFORM_METRICS.avgRating}</strong> rating
        </span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          <strong>{PLATFORM_METRICS.fundingRaisedDisplay}</strong> raised by alumni
        </span>
      </div>
    </div>
  );
}

// Metrics section for homepage/about page
interface MetricsSectionProps {
  title?: string;
  subtitle?: string;
  showExtended?: boolean;
  className?: string;
}

export function MetricsSection({
  title = 'Platform Impact',
  subtitle = 'Real results from real Indian founders',
  showExtended = false,
  className = ''
}: MetricsSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <Text size="lg" color="muted" className="max-w-2xl mx-auto">
          {subtitle}
        </Text>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <Text className="text-4xl font-bold text-gray-900">{PLATFORM_METRICS.foundersEnrolledDisplay}</Text>
          <Text color="muted">Founders Enrolled</Text>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <Text className="text-4xl font-bold text-gray-900">{PLATFORM_METRICS.fundingRaisedDisplay}</Text>
          <Text color="muted">Funding Raised</Text>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Banknote className="w-8 h-8 text-purple-600" />
          </div>
          <Text className="text-4xl font-bold text-gray-900">{PLATFORM_METRICS.subsidiesAccessedDisplay}</Text>
          <Text color="muted">Subsidies Accessed</Text>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
          <Text className="text-4xl font-bold text-gray-900">{PLATFORM_METRICS.avgRating}/5</Text>
          <Text color="muted">Average Rating</Text>
        </div>
      </div>

      {showExtended && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-2xl">
          <div className="text-center">
            <Text className="text-2xl font-bold text-green-600">{PLATFORM_METRICS.coursesCompletedDisplay}</Text>
            <Text size="sm" color="muted">Courses Completed</Text>
          </div>
          <div className="text-center">
            <Text className="text-2xl font-bold text-blue-600">{PLATFORM_METRICS.completionRate}%</Text>
            <Text size="sm" color="muted">Completion Rate</Text>
          </div>
          <div className="text-center">
            <Text className="text-2xl font-bold text-purple-600">{PLATFORM_METRICS.avgTimeToResult}</Text>
            <Text size="sm" color="muted">Avg Time to Result</Text>
          </div>
          <div className="text-center">
            <Text className="text-2xl font-bold text-orange-600">{PLATFORM_METRICS.avgROI}x</Text>
            <Text size="sm" color="muted">Average ROI</Text>
          </div>
        </div>
      )}
    </section>
  );
}

// "As seen with" logos placeholder
export function AsSeenWith({ className = '' }: { className?: string }) {
  return (
    <div className={`py-6 ${className}`}>
      <Text size="sm" color="muted" className="text-center mb-4">
        Our founders have gone through programs at
      </Text>
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
        {/* Placeholder for logo images */}
        <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-500 font-semibold">Y Combinator</div>
        <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-500 font-semibold">Techstars</div>
        <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-500 font-semibold">500 Startups</div>
        <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-500 font-semibold">DPIIT</div>
        <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-500 font-semibold">Startup India</div>
      </div>
    </div>
  );
}

export default TrustBadges;
