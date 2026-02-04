'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Send,
  Loader2,
  CornerDownRight,
  Clock,
  User,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Author {
  id: string;
  name: string;
  avatar?: string;
  badges: string[];
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likesCount: number;
  author: Author;
  replies: Comment[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  author: Author;
  isLiked: boolean;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const postId = params.postId as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(false);
  const [commentsCursor, setCommentsCursor] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      // Fetch the single post
      const response = await fetch(`/api/community/posts?postId=${postId}`);
      if (!response.ok) {
        throw new Error('Post not found');
      }
      const data = await response.json();

      // The posts API returns an array, find our post
      const foundPost = data.posts?.find((p: Post) => p.id === postId);
      if (foundPost) {
        setPost(foundPost);
      } else {
        // Post might be accessed directly, try to fetch all and find
        const allResponse = await fetch('/api/community/posts?limit=100');
        if (allResponse.ok) {
          const allData = await allResponse.json();
          const post = allData.posts?.find((p: Post) => p.id === postId);
          if (post) {
            setPost(post);
          }
        }
      }
    } catch (error) {
      logger.error('Error fetching post:', error);
    }
  }, [postId]);

  const fetchComments = useCallback(async (cursor?: string) => {
    try {
      setCommentsLoading(true);
      const url = cursor
        ? `/api/community/posts/${postId}/comments?cursor=${cursor}`
        : `/api/community/posts/${postId}/comments`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (cursor) {
          setComments(prev => [...prev, ...data.comments]);
        } else {
          setComments(data.comments || []);
        }
        setHasMoreComments(data.hasMore);
        setCommentsCursor(data.nextCursor);
      }
    } catch (error) {
      logger.error('Error fetching comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPost(), fetchComments()]);
      setLoading(false);
    };
    loadData();
  }, [fetchPost, fetchComments]);

  const handleLike = async () => {
    if (!user || likeLoading) return;

    try {
      setLikeLoading(true);
      const response = await fetch(`/api/community/posts/${postId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        setPost(prev => prev ? {
          ...prev,
          isLiked: !prev.isLiked,
          likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1,
        } : null);
      }
    } catch (error) {
      logger.error('Error liking post:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;

    try {
      setSubmitting(true);
      const response = await fetch(`/api/community/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments(prev => [data.comment, ...prev]);
        setCommentText('');
        setPost(prev => prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null);
      }
    } catch (error) {
      logger.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyText.trim() || submitting) return;

    try {
      setSubmitting(true);
      const response = await fetch(`/api/community/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyText, parentId }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments(prev => prev.map(comment =>
          comment.id === parentId
            ? { ...comment, replies: [...comment.replies, data.comment] }
            : comment
        ));
        setReplyText('');
        setReplyingTo(null);
        setPost(prev => prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null);
      }
    } catch (error) {
      logger.error('Error submitting reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-gray-400" />
              <Text>Loading post...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!post) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="max-w-4xl mx-auto p-8">
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <Heading as="h2" variant="h5" className="mb-2">
                  Post not found
                </Heading>
                <Text color="muted" className="mb-6">
                  This post may have been deleted or does not exist.
                </Text>
                <Link href="/community">
                  <Button variant="primary">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Community
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/community">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Community
              </Button>
            </Link>
          </div>

          {/* Post Content */}
          <Card className="mb-6">
            <CardContent className="p-6 lg:p-8">
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author.avatar ? (
                    <Image src={post.author.avatar} alt={post.author.name} width={48} height={48} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    post.author.name.charAt(0)
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Text weight="medium">{post.author.name}</Text>
                    {post.author.badges.map((badge, i) => (
                      <Badge key={i} variant="outline" size="sm">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <Text size="sm" color="muted">{post.createdAt}</Text>
                  </div>
                </div>
              </div>

              {/* Post Title */}
              <Heading as="h1" variant="h3" className="mb-4">
                {post.title}
              </Heading>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Post Content */}
              <div className="prose prose-gray max-w-none mb-6">
                <Text className="whitespace-pre-wrap">{post.content}</Text>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    disabled={likeLoading || !user}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      post.isLiked
                        ? 'bg-red-50 text-red-600'
                        : 'hover:bg-gray-100 text-gray-600'
                    } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.commentsCount} comments</span>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comment Form */}
          {user ? (
            <Card className="mb-6">
              <CardContent className="p-6">
                <form onSubmit={handleSubmitComment}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {user.user_metadata?.name?.charAt(0) || <User className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        maxLength={2000}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <Text size="sm" color="muted">
                          {commentText.length}/2000
                        </Text>
                        <Button
                          type="submit"
                          variant="primary"
                          size="sm"
                          disabled={!commentText.trim() || submitting}
                        >
                          {submitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Post Comment
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6">
              <CardContent className="p-6 text-center">
                <Text color="muted">
                  <Link href="/auth/signin" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                  {' '}to join the discussion
                </Text>
              </CardContent>
            </Card>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            <Heading as="h2" variant="h5" className="mb-4">
              Comments ({post.commentsCount})
            </Heading>

            {comments.length === 0 && !commentsLoading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <Text color="muted">No comments yet. Be the first to comment!</Text>
                </CardContent>
              </Card>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    {/* Comment */}
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {comment.author.avatar ? (
                          <Image src={comment.author.avatar} alt={comment.author.name} width={40} height={40} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          comment.author.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Text weight="medium" size="sm">{comment.author.name}</Text>
                          <Text size="xs" color="muted">
                            {new Date(comment.createdAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Text>
                        </div>
                        <Text className="mb-2">{comment.content}</Text>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 text-sm">
                            <Heart className="w-4 h-4" />
                            {comment.likesCount}
                          </button>
                          {user && (
                            <button
                              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                              className="text-sm text-gray-500 hover:text-blue-600"
                            >
                              Reply
                            </button>
                          )}
                        </div>

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="mt-3 flex gap-2">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              className="flex-1 p-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              rows={2}
                              maxLength={2000}
                            />
                            <div className="flex flex-col gap-1">
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleSubmitReply(comment.id)}
                                disabled={!replyText.trim() || submitting}
                              >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => { setReplyingTo(null); setReplyText(''); }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-2">
                                <CornerDownRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                  {reply.author.avatar ? (
                                    <Image src={reply.author.avatar} alt={reply.author.name} width={32} height={32} className="w-full h-full rounded-full object-cover" />
                                  ) : (
                                    reply.author.name.charAt(0)
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Text weight="medium" size="sm">{reply.author.name}</Text>
                                    <Text size="xs" color="muted">
                                      {new Date(reply.createdAt).toLocaleDateString('en-IN', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      })}
                                    </Text>
                                  </div>
                                  <Text size="sm">{reply.content}</Text>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Load More Comments */}
            {hasMoreComments && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => fetchComments(commentsCursor || undefined)}
                  disabled={commentsLoading}
                >
                  {commentsLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Load More Comments
                </Button>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
