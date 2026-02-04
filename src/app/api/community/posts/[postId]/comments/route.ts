import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { communityCommentSchema, validateRequest } from '@/lib/validation-schemas';
import { sanitizeHTML } from '@/lib/sanitize';

// Maximum items per page
const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 20;

// Type definitions for Supabase query results
interface AuthorData {
  id: string;
  name: string;
  avatar?: string;
  badges?: string[];
}

interface ReplyData {
  id: string;
  content: string;
  created_at: string;
  likes_count: number;
  author: AuthorData | AuthorData[] | null;
}

interface CommentData {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  parent_id: string | null;
  likes_count: number;
  author: AuthorData | AuthorData[] | null;
  replies: ReplyData[] | null;
}

// Helper to extract author from Supabase result (handles array or object)
function extractAuthor(author: AuthorData | AuthorData[] | null): AuthorData | null {
  if (!author) return null;
  if (Array.isArray(author)) return author[0] || null;
  return author;
}

// GET - Fetch comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = params.postId;
    const cursor = searchParams.get('cursor');
    const limit = Math.min(
      parseInt(searchParams.get('limit') || `${DEFAULT_LIMIT}`),
      MAX_LIMIT
    );

    const supabase = createClient();

    // Build query for root-level comments (no parent)
    let query = supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        updated_at,
        parent_id,
        likes_count,
        author:users!comments_author_id_fkey(
          id,
          name,
          avatar,
          badges
        ),
        replies:comments!comments_parent_id_fkey(
          id,
          content,
          created_at,
          likes_count,
          author:users!comments_author_id_fkey(
            id,
            name,
            avatar,
            badges
          )
        )
      `)
      .eq('post_id', postId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });

    // Apply cursor pagination
    if (cursor) {
      const { data: cursorComment } = await supabase
        .from('comments')
        .select('created_at, id')
        .eq('id', cursor)
        .single();

      if (cursorComment) {
        query = query.or(
          `created_at.lt.${cursorComment.created_at},and(created_at.eq.${cursorComment.created_at},id.lt.${cursorComment.id})`
        );
      }
    }

    query = query.limit(limit);

    const { data: comments, error } = await query;

    if (error) {
      logger.error('Error fetching comments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }

    // Transform comments to include nested replies
    const transformedComments = (comments as CommentData[] | null)?.map(comment => {
      const author = extractAuthor(comment.author);
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.created_at,
        updatedAt: comment.updated_at,
        likesCount: comment.likes_count || 0,
        author: {
          id: author?.id,
          name: author?.name || 'Anonymous',
          avatar: author?.avatar,
          badges: author?.badges || [],
        },
        replies: (comment.replies || []).map((reply) => {
          const replyAuthor = extractAuthor(reply.author);
          return {
            id: reply.id,
            content: reply.content,
            createdAt: reply.created_at,
            likesCount: reply.likes_count || 0,
            author: {
              id: replyAuthor?.id,
              name: replyAuthor?.name || 'Anonymous',
              avatar: replyAuthor?.avatar,
              badges: replyAuthor?.badges || [],
            },
          };
        }),
      };
    }) || [];

    const nextCursor = transformedComments.length === limit
      ? transformedComments[transformedComments.length - 1]?.id
      : null;

    return NextResponse.json({
      comments: transformedComments,
      hasMore: transformedComments.length === limit,
      nextCursor,
    });

  } catch (error) {
    logger.error('Comments API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Apply rate limiting (30 comments per hour per user)
    const rateLimit = await applyRateLimit(request, 'communityComment');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many comments. Please wait before commenting again.' },
        {
          status: 429,
          headers: rateLimit.headers,
        }
      );
    }

    const body = await request.json();
    const postId = params.postId;

    // Validate input
    const validation = validateRequest(communityCommentSchema, {
      ...body,
      postId,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.details },
        { status: 400 }
      );
    }

    const { content, parentId } = validation.data;

    // Verify post exists
    const { data: post } = await supabase
      .from('posts')
      .select('id')
      .eq('id', postId)
      .single();

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // If replying, verify parent comment exists
    if (parentId) {
      const { data: parentComment } = await supabase
        .from('comments')
        .select('id')
        .eq('id', parentId)
        .eq('post_id', postId)
        .single();

      if (!parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        );
      }
    }

    // Sanitize content
    const sanitizedContent = sanitizeHTML(content, { allowLinks: true, allowStyles: false });

    // Create comment
    const { data: comment, error: commentError } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        author_id: user.id,
        content: sanitizedContent,
        parent_id: parentId || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select(`
        id,
        content,
        created_at,
        author:users!comments_author_id_fkey(
          id,
          name,
          avatar,
          badges
        )
      `)
      .single();

    if (commentError) {
      logger.error('Error creating comment:', commentError);
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      );
    }

    // Update post comments count
    await supabase.rpc('increment_comments_count', { post_id: postId });

    // Award XP for commenting
    await supabase.rpc('award_xp', {
      user_id: user.id,
      points: 5,
      event_type: 'community_comment',
      description: 'Posted a comment'
    });

    const commentAuthor = extractAuthor(comment.author as AuthorData | AuthorData[] | null);

    return NextResponse.json({
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.created_at,
        likesCount: 0,
        author: {
          id: commentAuthor?.id,
          name: commentAuthor?.name || 'Anonymous',
          avatar: commentAuthor?.avatar,
          badges: commentAuthor?.badges || [],
        },
        replies: [],
      },
    });

  } catch (error) {
    logger.error('Create comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
