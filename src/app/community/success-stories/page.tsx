'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  Clock,
  Star,
  Play,
  Heart,
  Eye,
  Calendar,
  Building,
  DollarSign,
  Plus,
  BookOpen,
  FileText,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { PLATFORM_METRICS } from '@/components/social-proof/PlatformMetrics';

// IMPORTANT: Per the NO FAKE DATA policy in CLAUDE.md, success stories should ONLY
// be displayed when there is actual verified user data. This page fetches real
// stories from the database. The mockStories array has been removed.

interface SuccessStory {
  id: string;
  title: string;
  story: string;
  companyName: string;
  industry: string;
  revenue?: string;
  timeline: string;
  keyLearnings: string[];
  images: string[];
  videoUrl?: string;
  likesCount: number;
  viewsCount: number;
  isFeatured: boolean;
  createdAt: string;
  author: {
    name: string;
    avatar?: string;
    badges: string[];
  };
}

export default function SuccessStoriesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [filter, setFilter] = useState('all'); // all, featured, recent

  const fetchSuccessStories = useCallback(async () => {
    try {
      setLoading(true);

      // TODO: Fetch real success stories from database when available
      // For now, stories array remains empty per NO FAKE DATA policy
      // Real stories should be fetched from: /api/community/success-stories
      // When implemented, use filter state to filter by: all, featured, recent

      setStories([]);
    } catch (error) {
      logger.error('Error fetching success stories:', error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSuccessStories();
  }, [fetchSuccessStories]);

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading success stories...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/community')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Community
                </Button>
              </div>

              <Link href="/community/new-post">
                <Button variant="primary" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Share Your Story
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Success Stories
                </Heading>
                <Text className="text-gray-600">
                  Get inspired by fellow founders who&apos;ve built successful startups
                </Text>
              </div>
            </div>

            {/* Platform Content Metrics - Only factual content counts */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <Text size="sm" weight="medium" className="text-center mb-3 text-blue-700">
                Platform Resources Available
              </Text>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <Text className="text-2xl font-bold text-blue-700">{PLATFORM_METRICS.totalCourses}</Text>
                  <Text size="sm" color="muted">Courses</Text>
                </div>
                <div>
                  <Layers className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <Text className="text-2xl font-bold text-purple-700">{PLATFORM_METRICS.totalModules}</Text>
                  <Text size="sm" color="muted">Modules</Text>
                </div>
                <div>
                  <FileText className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <Text className="text-2xl font-bold text-green-700">{PLATFORM_METRICS.totalTemplates}+</Text>
                  <Text size="sm" color="muted">Templates</Text>
                </div>
                <div>
                  <TrendingUp className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <Text className="text-2xl font-bold text-orange-700">{PLATFORM_METRICS.totalLessons}+</Text>
                  <Text size="sm" color="muted">Lessons</Text>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-200 mb-6">
              {[
                { id: 'all', name: 'All Stories', icon: Trophy },
                { id: 'featured', name: 'Featured', icon: Star },
                { id: 'recent', name: 'Recent', icon: Clock },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 border-b-2 transition-colors
                      ${filter === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stories Grid - Only real stories from database */}
          {stories.length > 0 ? (
            <div className="grid lg:grid-cols-1 gap-8">
              {stories.map((story) => (
                <Card key={story.id} className={`
                  hover:shadow-lg transition-shadow
                  ${story.isFeatured ? 'ring-2 ring-yellow-200 bg-yellow-50' : ''}
                `}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {story.author.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <Text weight="medium">{story.author.name}</Text>
                            <div className="flex gap-1">
                              {story.author.badges.map((badge, i) => (
                                <Badge key={i} variant="outline" size="sm">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Text size="sm" color="muted">{story.companyName} • {story.industry}</Text>
                        </div>
                      </div>

                      {story.isFeatured && (
                        <Badge variant="warning" className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className="mb-6">
                      <Heading as="h2" variant="h4" className="mb-4">
                        {story.title}
                      </Heading>

                      <Text className="mb-6 leading-relaxed">
                        {story.story}
                      </Text>

                      {/* Key Metrics */}
                      <div className="grid sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        {story.revenue && (
                          <div className="text-center">
                            <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                            <Text weight="medium" className="text-green-600">
                              {story.revenue}
                            </Text>
                            <Text size="sm" color="muted">Revenue</Text>
                          </div>
                        )}
                        <div className="text-center">
                          <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                          <Text weight="medium" className="text-blue-600">
                            {story.timeline}
                          </Text>
                          <Text size="sm" color="muted">Timeline</Text>
                        </div>
                        <div className="text-center">
                          <Building className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                          <Text weight="medium" className="text-purple-600">
                            {story.industry}
                          </Text>
                          <Text size="sm" color="muted">Industry</Text>
                        </div>
                      </div>

                      {/* Key Learnings */}
                      <div className="mb-6">
                        <Heading as="h4" variant="h6" className="mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          Key Learnings
                        </Heading>
                        <ul className="space-y-2">
                          {story.keyLearnings.map((learning, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
                              <Text>{learning}</Text>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Video */}
                      {story.videoUrl && (
                        <div className="mb-6">
                          <Button variant="outline" className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Watch Full Story
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Heart className="w-4 h-4" />
                          <Text size="sm">{story.likesCount} likes</Text>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Eye className="w-4 h-4" />
                          <Text size="sm">{story.viewsCount.toLocaleString()} views</Text>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <Text size="sm">{new Date(story.createdAt).toLocaleDateString()}</Text>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4 mr-2" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm">
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State - Shown when no real stories exist yet */
            <Card className="text-center py-12">
              <CardContent>
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <Heading as="h3" variant="h5" className="mb-2">
                  No Success Stories Yet
                </Heading>
                <Text color="muted" className="mb-6 max-w-md mx-auto">
                  Be the first to share your startup success story with the community!
                  Your journey could inspire fellow founders.
                </Text>
                <Link href="/community/new-post">
                  <Button variant="primary">
                    Share Your Story
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-8 text-center">
              <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <Heading as="h3" variant="h4" className="mb-2">
                Share Your Success Story
              </Heading>
              <Text className="mb-6 max-w-2xl mx-auto">
                Inspire fellow founders by sharing your journey, challenges, and victories.
                Your story could be the motivation someone needs to take their next big step.
              </Text>
              <Link href="/community/new-post">
                <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                  <Plus className="w-5 h-5" />
                  Share Your Story
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
