'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Globe,
  Trophy,
  Zap,
  MessageSquare,
  Heart,
  Star,
  TrendingUp,
  Users,
  Award,
  Target,
  Building,
  Edit
} from 'lucide-react';
import Link from 'next/link';

interface FounderProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinedAt: string;
  
  // Progress & Gamification
  currentDay: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  badges: string[];
  
  // Social links
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  
  // Startup info from portfolio
  startupName?: string;
  tagline?: string;
  industry?: string;
  
  // Community stats
  postsCount: number;
  commentsCount: number;
  likesReceived: number;
  helpfulAnswers: number;
}

interface RecentActivity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'badge_earned';
  title: string;
  description: string;
  createdAt: string;
  link?: string;
}

export default function FounderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<FounderProfile | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      
      // In real app, fetch from API
      // For demo, using mock data
      const mockProfile: FounderProfile = {
        id: userId,
        name: 'Priya Sharma',
        email: 'priya@customerbot.ai',
        avatar: '',
        bio: 'Building AI-powered customer service solutions. Passionate about helping small businesses scale through technology. Always learning, always growing! 🚀',
        joinedAt: '2023-12-01',
        currentDay: 15,
        totalXP: 1250,
        currentStreak: 7,
        longestStreak: 12,
        badges: ['Starter', 'Researcher', 'MVP Master', 'Community Helper'],
        linkedinUrl: 'https://linkedin.com/in/priyasharma',
        twitterUrl: 'https://twitter.com/priya_builds',
        websiteUrl: 'https://customerbot.ai',
        startupName: 'CustomerBot AI',
        tagline: 'AI-powered customer service for SMBs',
        industry: 'SaaS',
        postsCount: 8,
        commentsCount: 42,
        likesReceived: 156,
        helpfulAnswers: 12,
      };

      const mockActivity: RecentActivity[] = [
        {
          id: '1',
          type: 'post',
          title: 'Shared: How I validated my SaaS idea in 2 weeks',
          description: 'Posted in Success Stories about their validation process',
          createdAt: '2024-01-15T10:30:00Z',
          link: '/community/posts/1',
        },
        {
          id: '2',
          type: 'badge_earned',
          title: 'Earned: Community Helper badge',
          description: 'Helped 10 fellow founders with their questions',
          createdAt: '2024-01-14T15:20:00Z',
        },
        {
          id: '3',
          type: 'comment',
          title: 'Commented on: GST registration guidance',
          description: 'Provided helpful advice about GST registration process',
          createdAt: '2024-01-12T09:15:00Z',
          link: '/community/posts/2',
        },
      ];

      setProfile(mockProfile);
      setRecentActivity(mockActivity);
      setIsOwnProfile(userId === 'current-user-id'); // In real app, check against current user
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId, fetchProfileData]);

  const getBadgeIcon = (badge: string) => {
    const icons = {
      'Starter': '🚀',
      'Researcher': '📊',
      'MVP Master': '🏗️',
      'Community Helper': '🤝',
      'Brand Builder': '🎨',
      'Launch Legend': '🌟',
    };
    return icons[badge as keyof typeof icons] || '🏆';
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'post': return MessageSquare;
      case 'comment': return MessageSquare;
      case 'like': return Heart;
      case 'badge_earned': return Award;
      default: return Trophy;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading profile...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!profile) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full mx-4">
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h2" variant="h4" className="mb-2">
                  Profile Not Found
                </Heading>
                <Text color="muted" className="mb-6">
                  The founder profile you&apos;re looking for doesn&apos;t exist or has been removed.
                </Text>
                <Button variant="primary" onClick={() => router.push('/community')}>
                  Back to Community
                </Button>
              </CardContent>
            </Card>
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
            <Button
              variant="ghost"
              onClick={() => router.push('/community')}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Community
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-8">
                  {/* Avatar & Basic Info */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                      {profile.name.charAt(0)}
                    </div>
                    <Heading as="h2" variant="h4" className="mb-1">
                      {profile.name}
                    </Heading>
                    {profile.startupName && (
                      <Text color="muted" className="mb-2">
                        Founder at {profile.startupName}
                      </Text>
                    )}
                    {isOwnProfile && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2 mx-auto">
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  {/* Startup Info */}
                  {profile.startupName && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-gray-600" />
                        <Text weight="medium" size="sm">Current Startup</Text>
                      </div>
                      <Text weight="medium">{profile.startupName}</Text>
                      {profile.tagline && (
                        <Text size="sm" color="muted">{profile.tagline}</Text>
                      )}
                      {profile.industry && (
                        <Badge variant="outline" size="sm" className="mt-2">
                          {profile.industry}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Bio */}
                  {profile.bio && (
                    <div className="mb-6">
                      <Text size="sm" className="leading-relaxed">
                        {profile.bio}
                      </Text>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="space-y-3 mb-6">
                    {profile.linkedinUrl && (
                      <a 
                        href={profile.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        <Text size="sm">LinkedIn</Text>
                      </a>
                    )}
                    {profile.twitterUrl && (
                      <a 
                        href={profile.twitterUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                        <Text size="sm">Twitter</Text>
                      </a>
                    )}
                    {profile.websiteUrl && (
                      <a 
                        href={profile.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        <Text size="sm">Website</Text>
                      </a>
                    )}
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center gap-2 text-gray-600 pt-6 border-t">
                    <Calendar className="w-4 h-4" />
                    <Text size="sm">
                      Member since {formatDate(profile.joinedAt)}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress & Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Journey Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <Text className="font-heading text-xl font-bold">
                        {profile.currentDay}/30
                      </Text>
                      <Text size="sm" color="muted">Days Complete</Text>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                      <Text className="font-heading text-xl font-bold">
                        {profile.totalXP.toLocaleString()}
                      </Text>
                      <Text size="sm" color="muted">Total XP</Text>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <Text className="font-heading text-xl font-bold">
                        {profile.currentStreak}
                      </Text>
                      <Text size="sm" color="muted">Current Streak</Text>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <Text className="font-heading text-xl font-bold">
                        {profile.longestStreak}
                      </Text>
                      <Text size="sm" color="muted">Longest Streak</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.badges.map((badge) => (
                      <div key={badge} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl">
                          {getBadgeIcon(badge)}
                        </div>
                        <div>
                          <Text weight="medium">{badge}</Text>
                          <Text size="sm" color="muted">
                            {badge === 'Starter' && 'Completed first day'}
                            {badge === 'Researcher' && 'Completed market research'}
                            {badge === 'MVP Master' && 'Built and launched MVP'}
                            {badge === 'Community Helper' && 'Helped fellow founders'}
                            {badge === 'Brand Builder' && 'Created brand identity'}
                            {badge === 'Launch Legend' && 'Completed 30-day program'}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Contributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <MessageSquare className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <Text className="font-heading text-lg font-bold">
                        {profile.postsCount}
                      </Text>
                      <Text size="sm" color="muted">Posts</Text>
                    </div>
                    <div className="text-center">
                      <MessageSquare className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <Text className="font-heading text-lg font-bold">
                        {profile.commentsCount}
                      </Text>
                      <Text size="sm" color="muted">Comments</Text>
                    </div>
                    <div className="text-center">
                      <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <Text className="font-heading text-lg font-bold">
                        {profile.likesReceived}
                      </Text>
                      <Text size="sm" color="muted">Likes Received</Text>
                    </div>
                    <div className="text-center">
                      <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <Text className="font-heading text-lg font-bold">
                        {profile.helpfulAnswers}
                      </Text>
                      <Text size="sm" color="muted">Helpful Answers</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="p-2 bg-white rounded-lg">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <Text weight="medium" className="mb-1">
                              {activity.title}
                            </Text>
                            <Text size="sm" color="muted" className="mb-2">
                              {activity.description}
                            </Text>
                            <Text size="xs" color="muted">
                              {formatTimeAgo(activity.createdAt)}
                            </Text>
                          </div>
                          {activity.link && (
                            <Link href={activity.link}>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}