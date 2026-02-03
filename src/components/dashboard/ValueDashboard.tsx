'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import {
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Percent,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export interface ValueMetrics {
  totalInvested: number;
  totalValueReceived: number;
  savingsAmount: number;
  savingsPercentage: number;
  roiMultiplier: number;
  founderReadinessScore: number;
  percentileRanking: number;
  bundleSavingsAvailable?: number;
  hasAllAccess?: boolean;
}

interface ValueDashboardProps {
  metrics: ValueMetrics;
  className?: string;
}

export function ValueDashboard({ metrics, className = '' }: ValueDashboardProps) {
  const {
    totalInvested,
    totalValueReceived,
    savingsAmount,
    savingsPercentage,
    roiMultiplier,
    founderReadinessScore,
    percentileRanking,
    bundleSavingsAvailable,
    hasAllAccess
  } = metrics;

  // Determine founder readiness level
  const getReadinessLevel = (score: number) => {
    if (score >= 90) return { label: 'Expert Founder', color: 'bg-purple-500' };
    if (score >= 70) return { label: 'Advanced Founder', color: 'bg-blue-500' };
    if (score >= 50) return { label: 'Growing Founder', color: 'bg-green-500' };
    if (score >= 25) return { label: 'Emerging Founder', color: 'bg-yellow-500' };
    return { label: 'Starting Out', color: 'bg-gray-500' };
  };

  const readinessLevel = getReadinessLevel(founderReadinessScore);

  // Don't show if no investment yet
  if (totalInvested === 0) {
    return null;
  }

  return (
    <Card className={`border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-green-600" />
            Your Entrepreneurial Investment
          </CardTitle>
          <Badge className="bg-green-600 text-white">
            {roiMultiplier}x ROI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Value Display */}
        <div className="grid grid-cols-2 gap-6">
          {/* Total Value Received */}
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <Text size="sm" color="muted">Total Value Received</Text>
            </div>
            <Text className="text-3xl font-bold text-green-700">
              {totalValueReceived >= 100000
                ? `₹${(totalValueReceived / 100000).toFixed(1)}L`
                : `₹${totalValueReceived.toLocaleString('en-IN')}`
              }
            </Text>
          </div>

          {/* Your Investment */}
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <Text size="sm" color="muted">Your Investment</Text>
            </div>
            <Text className="text-3xl font-bold text-gray-900">
              {totalInvested >= 100000
                ? `₹${(totalInvested / 100000).toFixed(1)}L`
                : `₹${totalInvested.toLocaleString('en-IN')}`
              }
            </Text>
          </div>
        </div>

        {/* Savings Row */}
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-4 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Percent className="w-5 h-5 text-emerald-600" />
              <Text size="sm" color="muted">You Saved</Text>
            </div>
            <Text className="text-2xl font-bold text-emerald-700">
              {savingsAmount >= 100000
                ? `₹${(savingsAmount / 100000).toFixed(1)}L`
                : `₹${savingsAmount.toLocaleString('en-IN')}`
              }
            </Text>
            <Badge className="mt-1 bg-emerald-600 text-white text-xs">
              {savingsPercentage}% OFF
            </Badge>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <Text size="sm" color="muted">ROI Multiplier</Text>
            </div>
            <Text className="text-2xl font-bold text-blue-700">
              {roiMultiplier}x Value
            </Text>
            <Text size="xs" color="muted" className="mt-1">
              For every ₹1 invested
            </Text>
          </div>
        </div>

        {/* Founder Readiness Score */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <Text weight="medium">Founder Readiness Score</Text>
            </div>
            <Badge className={`${readinessLevel.color} text-white`}>
              {readinessLevel.label}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${founderReadinessScore}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <Text size="xs" color="muted">0</Text>
              <Text size="sm" weight="bold" className="text-purple-700">
                {founderReadinessScore}/100
              </Text>
              <Text size="xs" color="muted">100</Text>
            </div>
          </div>

          {/* Percentile Ranking */}
          {percentileRanking > 0 && (
            <div className="mt-3 flex items-center justify-center gap-2 p-2 bg-purple-50 rounded-lg">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <Text size="sm" className="text-purple-700">
                You're in the <span className="font-bold">top {100 - percentileRanking}%</span> of founders
              </Text>
            </div>
          )}
        </div>

        {/* Bundle Upgrade CTA */}
        {!hasAllAccess && bundleSavingsAvailable && bundleSavingsAvailable > 0 && (
          <div className="p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <Text weight="medium" className="text-orange-800">
                  Unlock More Value with All-Access
                </Text>
                <Text size="sm" className="text-orange-600">
                  Save an additional ₹{bundleSavingsAvailable.toLocaleString('en-IN')} by upgrading
                </Text>
              </div>
              <Link href="/pricing">
                <Button variant="primary" size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Upgrade <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Potential Value Card for new users (no purchases)
interface PotentialValueCardProps {
  className?: string;
}

export function PotentialValueCard({ className = '' }: PotentialValueCardProps) {
  // Value calculations based on product pricing and market comparisons
  const starterCourse = {
    code: 'P1',
    title: '30-Day India Launch Sprint',
    price: 4999,
    templateValue: 15000,
    consultantCost: 50000,
    outcomes: ['Incorporated company', 'MVP ready', 'First customers']
  };

  const allAccessBundle = {
    price: 149999,
    totalValue: 290952,
    savings: 140953,
    coursesCount: 30,
    toolkitsCount: 18,
    templatesCount: 450,
    consultantCost: 2000000 // 20L for equivalent consulting
  };

  return (
    <Card className={`border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Your Potential Value
          </CardTitle>
          <Badge className="bg-blue-600 text-white">
            Get Started
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Start with P1 Value Proposition */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <Text weight="semibold">Start with P1: {starterCourse.title}</Text>
              <Text size="sm" color="muted">The perfect foundation for your startup journey</Text>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Text size="xs" color="muted">Your Investment</Text>
              <Text className="text-lg font-bold text-blue-700">
                ₹{starterCourse.price.toLocaleString('en-IN')}
              </Text>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Text size="xs" color="muted">Template Value</Text>
              <Text className="text-lg font-bold text-green-700">
                ₹{starterCourse.templateValue.toLocaleString('en-IN')}+
              </Text>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Text size="xs" color="muted">ROI</Text>
              <Text className="text-lg font-bold text-purple-700">
                {Math.round(starterCourse.templateValue / starterCourse.price)}x
              </Text>
            </div>
          </div>

          <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <Text size="sm" className="text-green-700">
                <span className="font-semibold">Save ₹{(starterCourse.consultantCost - starterCourse.price).toLocaleString('en-IN')}</span> vs hiring a consultant
              </Text>
            </div>
          </div>

          <Link href="/products/p1" className="block mt-4">
            <Button variant="primary" className="w-full bg-blue-600 hover:bg-blue-700">
              Start Your Journey - ₹{starterCourse.price.toLocaleString('en-IN')}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* All-Access Value Proposition */}
        <div className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text weight="semibold" className="text-purple-800">
                Or Get Everything with All-Access
              </Text>
              <Text size="sm" className="text-purple-600">
                Best value for serious founders
              </Text>
            </div>
            <Badge className="bg-purple-600 text-white">48% OFF</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-white/50 rounded-lg">
              <Text size="xs" color="muted">Total Value</Text>
              <Text className="text-xl font-bold text-purple-700">
                ₹{(allAccessBundle.totalValue / 100000).toFixed(1)}L
              </Text>
            </div>
            <div className="p-3 bg-white/50 rounded-lg">
              <Text size="xs" color="muted">Your Price</Text>
              <Text className="text-xl font-bold text-green-700">
                ₹{(allAccessBundle.price / 100000).toFixed(1)}L
              </Text>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-white text-purple-700">{allAccessBundle.coursesCount} Courses</Badge>
            <Badge className="bg-white text-purple-700">{allAccessBundle.toolkitsCount} Toolkits</Badge>
            <Badge className="bg-white text-purple-700">{allAccessBundle.templatesCount}+ Templates</Badge>
          </div>

          <div className="p-3 bg-white/50 rounded-lg mb-4">
            <Text size="sm" className="text-purple-700">
              <span className="font-semibold">Compare:</span> Equivalent consulting would cost{' '}
              <span className="font-bold">₹{(allAccessBundle.consultantCost / 100000)}L+</span>
            </Text>
          </div>

          <Link href="/pricing">
            <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
              View All-Access Bundle
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Market Comparison */}
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <Text weight="medium" className="mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            Why The Indian Startup?
          </Text>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <Text color="muted">Startup Consultant (monthly)</Text>
              <Text className="line-through text-gray-400">₹50,000 - ₹2,00,000</Text>
            </div>
            <div className="flex items-center justify-between text-sm">
              <Text color="muted">Business Courses (MBA programs)</Text>
              <Text className="line-through text-gray-400">₹2,00,000 - ₹25,00,000</Text>
            </div>
            <div className="flex items-center justify-between text-sm">
              <Text color="muted">Legal Templates (from lawyers)</Text>
              <Text className="line-through text-gray-400">₹25,000 - ₹1,00,000</Text>
            </div>
            <div className="flex items-center justify-between text-sm font-medium border-t pt-2 mt-2">
              <Text className="text-green-700">The Indian Startup (lifetime)</Text>
              <Text className="text-green-700">₹4,999 - ₹1,49,999</Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ValueDashboard;
