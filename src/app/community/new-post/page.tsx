'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft,
  Plus,
  X,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Trophy,
  BookOpen,
  Target,
  Hash
} from 'lucide-react';

const postTypes = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'Share thoughts, ideas, or general startup topics',
    icon: MessageSquare,
    color: 'blue',
  },
  {
    id: 'question',
    name: 'Ask a Question',
    description: 'Get help from the community on specific challenges',
    icon: Target,
    color: 'purple',
  },
  {
    id: 'success_story',
    name: 'Success Story',
    description: 'Share your wins, milestones, and achievements',
    icon: Trophy,
    color: 'green',
  },
  {
    id: 'resource_share',
    name: 'Share Resources',
    description: 'Share useful tools, articles, or learning materials',
    icon: BookOpen,
    color: 'orange',
  },
];

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [selectedType, setSelectedType] = useState('general');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          type: selectedType,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      setSuccess(true);
      
      // Redirect after a delay
      setTimeout(() => {
        router.push('/community');
      }, 2000);

    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  if (success) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full mx-4">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <Heading as="h2" variant="h4" className="mb-2">
                  Post Created Successfully!
                </Heading>
                <Text color="muted" className="mb-4">
                  Your post has been shared with the community. Redirecting you back...
                </Text>
                <div className="animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                </div>
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
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => router.push('/community')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Community
              </Button>
            </div>

            <Heading as="h1" className="mb-2">
              Share with the Community
            </Heading>
            <Text className="text-gray-600">
              Connect with fellow founders by sharing your thoughts, questions, or experiences
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Post Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>What would you like to share?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {postTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`
                          border-2 rounded-lg p-4 cursor-pointer transition-all
                          ${selectedType === type.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`
                            p-2 rounded-lg
                            ${type.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                            ${type.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                            ${type.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                            ${type.color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
                          `}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <Text weight="medium" className="mb-1">
                              {type.name}
                            </Text>
                            <Text size="sm" color="muted">
                              {type.description}
                            </Text>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>Title</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your post a clear, engaging title..."
                  maxLength={200}
                  className="text-lg"
                />
                <div className="flex justify-between items-center mt-2">
                  <Text size="sm" color="muted">
                    Make it descriptive and engaging
                  </Text>
                  <Text size="sm" color="muted">
                    {title.length}/200
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    selectedType === 'question' 
                      ? "Describe your challenge in detail. The more context you provide, the better the community can help you..."
                      : selectedType === 'success_story'
                      ? "Share your journey, what worked, what didn't, and any advice for fellow founders..."
                      : selectedType === 'resource_share'
                      ? "Describe the resource, why it's useful, and how others can benefit from it..."
                      : "Share your thoughts, insights, or start a discussion..."
                  }
                  className="w-full min-h-[300px] p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={12}
                  maxLength={5000}
                />
                <div className="flex justify-between items-center mt-2">
                  <Text size="sm" color="muted">
                    Use markdown for formatting (bold, italics, links, etc.)
                  </Text>
                  <Text size="sm" color="muted">
                    {content.length}/5000
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        placeholder="Add a tag (e.g., marketing, funding, mvp)"
                        className="pl-10"
                        maxLength={20}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      disabled={!currentTag.trim() || tags.length >= 5}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1">
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Text size="sm" color="muted">
                    Tags help others discover your post. Maximum 5 tags.
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <Text className="text-red-700">{error}</Text>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/community')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading || !title.trim() || !content.trim()}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {loading ? 'Publishing...' : 'Publish Post'}
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}