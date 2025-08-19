'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TrendingUp, Calendar, Users, Target, BarChart3, PieChart, Activity, Clock, Star, ArrowUpRight } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-6 w-6 text-gray-600" />
            <Heading as="h1" variant="h2">Analytics Dashboard</Heading>
            <Badge variant="warning" size="sm">Coming Soon</Badge>
          </div>
          <Text color="muted">
            Track your startup journey progress and get insights into your performance
          </Text>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mb-8 border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
            <Heading as="h3" variant="h3" className="mb-4">
              Analytics Dashboard Coming Soon
            </Heading>
            <Text color="muted" className="max-w-2xl mx-auto mb-6">
              We&apos;re building comprehensive analytics to help you track your startup journey, 
              measure progress, and identify areas for improvement. This feature will be available 
              in the next platform update.
            </Text>
            <Button variant="outline" disabled>
              <Activity className="h-4 w-4 mr-2" />
              In Development
            </Button>
          </CardContent>
        </Card>

        {/* Preview Cards - What's Coming */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Journey Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Days Completed</span>
                  <span>7/30</span>
                </div>
                <ProgressBar value={23} className="h-2" />
                <Text size="sm" color="muted">
                  23% complete • On track for Day 30 goal
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                XP & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">1,250</span>
                  <Badge variant="success">+50 today</Badge>
                </div>
                <Text size="sm" color="muted">
                  Total XP earned • Rank #12 this week
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Time Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">14.5</span>
                  <Text size="sm">hours</Text>
                </div>
                <Text size="sm" color="muted">
                  Time invested this week
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-orange-500" />
                Portfolio Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Idea & Vision</span>
                  <span>100%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Market Research</span>
                  <span>80%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Business Model</span>
                  <span>60%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" />
                Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">23</span>
                  <Badge variant="default">+3 today</Badge>
                </div>
                <Text size="sm" color="muted">
                  Community interactions this week
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Performance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">87</span>
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                </div>
                <Text size="sm" color="muted">
                  Overall performance rating
                </Text>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <Card>
          <CardHeader>
            <CardTitle>Planned Analytics Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Text weight="medium">Progress Tracking</Text>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Daily lesson completion rates</li>
                  <li>• Weekly and monthly progress trends</li>
                  <li>• Time spent on each activity</li>
                  <li>• Streak analysis and patterns</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Performance Insights</Text>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• XP earning patterns and optimization</li>
                  <li>• Portfolio section completion analysis</li>
                  <li>• Comparison with peer cohorts</li>
                  <li>• Achievement unlock timeline</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Community Analytics</Text>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Engagement levels and trends</li>
                  <li>• Helpful contributions tracking</li>
                  <li>• Network growth visualization</li>
                  <li>• Community impact metrics</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Business Metrics</Text>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Portfolio completeness score</li>
                  <li>• Startup readiness assessment</li>
                  <li>• Goal achievement tracking</li>
                  <li>• Milestone celebration timeline</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}