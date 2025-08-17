'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/CardContent';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardTitle } from '@/components/ui/CardTitle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  Calendar,
  Plus,
  Search,
  TrendingUp,
  Heart,
  MessageCircle,
  Clock,
  Star,
  Zap,
  Target,
  BookOpen,
  Video,
  Award,
  ArrowRight,
  Building
} from 'lucide-react';
import Link from 'next/link';

interface CommunityStats {
  totalMembers: number;
  activeToday: number;
  postsThisWeek: number;
  expertSessions: number;
}

interface RecentPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    badges: string[];
  };
  type: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  tags: string[];
}

interface ExpertSession {
  id: string;
  title: string;
  expertName: string;
  scheduledAt: string;
  duration: number;
  registeredCount: number;
  maxAttendees: number;
  topic: string[];
}

export default function CommunityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CommunityStats>({
    totalMembers: 0,
    activeToday: 0,
    postsThisWeek: 0,
    expertSessions: 0,
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<ExpertSession[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would fetch from multiple endpoints
      // For now, using mock data to demonstrate the UI
      
      setStats({
        totalMembers: 1247,
        activeToday: 89,
        postsThisWeek: 156,
        expertSessions: 3,
      });

      setRecentPosts([
        {
          id: '1',
          title: 'How I validated my SaaS idea in 2 weeks',
          content: 'Just completed Day 5 of the program and wanted to share my validation process...',
          author: {
            name: 'Priya Sharma',
            avatar: '',
            badges: ['Starter', 'Researcher'],
          },
          type: 'success_story',
          likesCount: 23,
          commentsCount: 8,
          createdAt: '2 hours ago',
          tags: ['validation', 'saas', 'day-5'],
        },
        {
          id: '2',
          title: 'Need help with GST registration process',
          content: 'Can anyone guide me through the GST registration for a new startup?',
          author: {
            name: 'Rahul Kumar',
            avatar: '',
            badges: ['Starter'],
          },
          type: 'question',
          likesCount: 12,
          commentsCount: 15,
          createdAt: '4 hours ago',
          tags: ['gst', 'legal', 'help'],
        },
        {
          id: '3',
          title: 'Amazing tools for market research - Free resources',
          content: 'Compiled a list of 15 free tools that helped me with my market research...',
          author: {
            name: 'Anjali Gupta',
            avatar: '',
            badges: ['Researcher', 'Helper'],
          },
          type: 'resource_share',
          likesCount: 45,
          commentsCount: 12,
          createdAt: '6 hours ago',
          tags: ['resources', 'market-research', 'tools'],
        },
      ]);

      setUpcomingSessions([
        {
          id: '1',
          title: 'Fundraising 101: From Seed to Series A',
          expertName: 'Vikram Chandra',
          scheduledAt: '2024-01-20T15:00:00Z',
          duration: 60,
          registeredCount: 34,
          maxAttendees: 50,
          topic: ['fundraising', 'investment'],
        },
        {
          id: '2',
          title: 'Building Your MVP in 30 Days',
          expertName: 'Nisha Patel',
          scheduledAt: '2024-01-25T14:00:00Z',
          duration: 45,
          registeredCount: 28,
          maxAttendees: 40,
          topic: ['product', 'mvp'],
        },
      ]);

    } catch (error) {
      console.error('Error fetching community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Posts', icon: MessageSquare },
    { id: 'questions', name: 'Questions', icon: Target },
    { id: 'success_stories', name: 'Success Stories', icon: Trophy },
    { id: 'resources', name: 'Resources', icon: BookOpen },
  ];

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading community...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <Heading as="h1" className="mb-1">
                    Founder Community
                  </Heading>
                  <Text className="text-gray-600">
                    Connect, learn, and grow with fellow Indian entrepreneurs
                  </Text>
                </div>
              </div>
              
              <Link href="/community/new-post">
                <Button variant="primary" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              </Link>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              <Card className="border-2 hover:border-blue-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <Text className="font-heading text-2xl font-bold">
                    {stats.totalMembers.toLocaleString()}
                  </Text>
                  <Text size="sm" color="muted">Total Members</Text>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <Text className="font-heading text-2xl font-bold">
                    {stats.activeToday}
                  </Text>
                  <Text size="sm" color="muted">Active Today</Text>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-purple-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <Text className="font-heading text-2xl font-bold">
                    {stats.postsThisWeek}
                  </Text>
                  <Text size="sm" color="muted">Posts This Week</Text>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Video className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <Text className="font-heading text-2xl font-bold">
                    {stats.expertSessions}
                  </Text>
                  <Text size="sm" color="muted">Expert Sessions</Text>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search discussions..."
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(category.id)}
                            className="flex items-center gap-2"
                          >
                            <IconComponent className="w-4 h-4" />
                            {category.name}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {post.author.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Text weight="medium">{post.author.name}</Text>
                            <div className="flex gap-1">
                              {post.author.badges.map((badge, i) => (
                                <Badge key={i} variant="outline" size="sm">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                            <Text size="sm" color="muted">•</Text>
                            <Text size="sm" color="muted">{post.createdAt}</Text>
                          </div>
                          
                          <Heading as="h3" variant="h6" className="mb-2">
                            {post.title}
                          </Heading>
                          
                          <Text className="mb-3 line-clamp-2">
                            {post.content}
                          </Text>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2 flex-wrap">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" size="sm">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-gray-500">
                                <Heart className="w-4 h-4" />
                                <Text size="sm">{post.likesCount}</Text>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <MessageCircle className="w-4 h-4" />
                                <Text size="sm">{post.commentsCount}</Text>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline">
                  Load More Posts
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/community/new-post" className="block">
                    <Button variant="primary" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Share Your Story
                    </Button>
                  </Link>
                  <Link href="/community/ecosystem" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="w-4 h-4 mr-2" />
                      Explore Ecosystem
                    </Button>
                  </Link>
                  <Link href="/community/questions" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Ask a Question
                    </Button>
                  </Link>
                  <Link href="/community/resources" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Share Resources
                    </Button>
                  </Link>
                  <Link href="/community/opportunities" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="w-4 h-4 mr-2" />
                      Opportunities & Schemes
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Upcoming Expert Sessions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-orange-600" />
                      Expert Sessions
                    </CardTitle>
                    <Link href="/community/expert-sessions">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Heading as="h4" variant="h6" className="line-clamp-2">
                          {session.title}
                        </Heading>
                        <Badge variant="outline" size="sm">
                          {session.registeredCount}/{session.maxAttendees}
                        </Badge>
                      </div>
                      
                      <Text size="sm" color="muted" className="mb-2">
                        with {session.expertName}
                      </Text>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Jan 20, 3:00 PM
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.duration}m
                        </div>
                      </div>
                      
                      <Button size="sm" className="w-full">
                        Register Now
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Community Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Be respectful and supportive of fellow founders</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Share knowledge and resources generously</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Celebrate others&apos; successes and milestones</Text>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <Text size="sm">Stay on-topic and provide value in discussions</Text>
                    </div>
                  </div>
                  
                  <Link href="/community/guidelines" className="block mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Read Full Guidelines
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}