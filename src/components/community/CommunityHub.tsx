'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Tag,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
  Eye,
  Plus,
  Sparkles,
  Award,
  UserCheck
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  category: string;
  tags: string[];
  views: number;
  likes: number;
  replies: number;
  isLiked: boolean;
  createdAt: string;
  lastActivity: string;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  postCount: number;
  icon: React.ReactNode;
  color: string;
}

const categories: ForumCategory[] = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Chat about anything startup-related',
    postCount: 0,
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'blue'
  },
  {
    id: 'launch',
    name: 'Launch Stories',
    description: 'Share your startup launch experiences',
    postCount: 0,
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'green'
  },
  {
    id: 'funding',
    name: 'Funding & Investment',
    description: 'Discuss funding strategies and experiences',
    postCount: 0,
    icon: <Award className="w-5 h-5" />,
    color: 'purple'
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    description: 'Get help with legal and compliance questions',
    postCount: 0,
    icon: <UserCheck className="w-5 h-5" />,
    color: 'orange'
  },
  {
    id: 'tech',
    name: 'Tech & Product',
    description: 'Technical discussions and product development',
    postCount: 0,
    icon: <Sparkles className="w-5 h-5" />,
    color: 'indigo'
  }
];

export function CommunityHub() {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sortBy]);

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        sort: sortBy,
        ...(searchQuery && { search: searchQuery })
      });

      const response = await fetch(`/api/community/posts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      logger.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: 'POST'
      });
      
      if (response.ok) {
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
            : post
        ));
      }
    } catch (error) {
      logger.error('Failed to like post:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (searchQuery) {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Community Stats - Will show real data when available */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <Badge size="sm" variant="outline">Active</Badge>
            </div>
            <Text className="text-2xl font-bold">-</Text>
            <Text size="sm" color="muted">Community Members</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <Text className="text-2xl font-bold">-</Text>
            <Text size="sm" color="muted">Total Discussions</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <Text className="text-2xl font-bold">-</Text>
            <Text size="sm" color="muted">This Week</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <Text className="text-2xl font-bold">-</Text>
            <Text size="sm" color="muted">Online Now</Text>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Forum Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  p-4 border-2 rounded-lg text-left transition-all
                  ${selectedCategory === category.id 
                    ? 'border-black shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    bg-${category.color}-100 text-${category.color}-600
                  `}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <Text weight="medium">{category.name}</Text>
                    <Text size="sm" color="muted">{category.description}</Text>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'recent' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('recent')}
          >
            Recent
          </Button>
          <Button
            variant={sortBy === 'popular' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('popular')}
          >
            Popular
          </Button>
          <Button
            variant={sortBy === 'trending' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('trending')}
          >
            Trending
          </Button>
        </div>

        <Link href="/community/new-post">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            New Discussion
          </Button>
        </Link>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-full mb-4"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/community/posts/${post.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Heading as="h3" variant="h6" className="mb-1">
                        {post.title}
                      </Heading>
                      <Text size="sm" color="muted" className="line-clamp-2">
                        {post.content}
                      </Text>
                    </div>
                    {post.author.isVerified && (
                      <Badge className="bg-blue-100 text-blue-700">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLike(post.id);
                        }}
                        className={`flex items-center gap-1 ${post.isLiked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600 transition-colors`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Text size="xs" color="muted">
                        by {post.author.name}
                      </Text>
                      <Text size="xs" color="muted">
                        • {new Date(post.lastActivity).toLocaleDateString()}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <Text color="muted">No discussions found. Start a new conversation!</Text>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Community Guidelines */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <Heading as="h3" variant="h5" className="mb-4">
            Community Guidelines
          </Heading>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <Text weight="medium" className="mb-2">🤝 Be Helpful</Text>
              <Text size="sm" color="muted">
                Share your knowledge and experiences to help fellow founders
              </Text>
            </div>
            <div>
              <Text weight="medium" className="mb-2">💡 Stay Relevant</Text>
              <Text size="sm" color="muted">
                Keep discussions focused on startup and business topics
              </Text>
            </div>
            <div>
              <Text weight="medium" className="mb-2">🚀 Build Together</Text>
              <Text size="sm" color="muted">
                Collaborate, network, and grow with the community
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}