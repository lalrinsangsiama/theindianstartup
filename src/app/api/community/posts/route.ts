import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { communityPostSchema, validateRequest } from '@/lib/validation-schemas';
import { escapeLikePattern, sanitizeText, sanitizeHTML } from '@/lib/sanitize';

// Maximum items per page (prevents abuse)
const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 10;

// GET - Fetch posts with cursor-based pagination (scales to millions of rows)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Cursor-based pagination params
    const cursor = searchParams.get('cursor'); // ID of last item from previous page
    const limit = Math.min(
      parseInt(searchParams.get('limit') || `${DEFAULT_LIMIT}`),
      MAX_LIMIT
    );
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';

    // Legacy support: also accept page param for backwards compatibility
    const page = searchParams.get('page');
    const useLegacyPagination = page && !cursor;

    const supabase = createClient();

    // Build base query
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:users!posts_author_id_fkey(
          id,
          name,
          avatar,
          badges
        ),
        _count:comments(count)
      `)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .order('id', { ascending: false }); // Secondary sort for stable pagination

    // Apply category filter
    if (category !== 'all') {
      if (category === 'questions') {
        query = query.eq('type', 'question');
      } else if (category === 'success_stories') {
        query = query.eq('type', 'success_story');
      } else if (category === 'resources') {
        query = query.eq('type', 'resource_share');
      }
    }

    // Apply search filter (escape special characters to prevent SQL injection)
    if (search) {
      const escapedSearch = escapeLikePattern(search);
      query = query.or(`title.ilike.%${escapedSearch}%,content.ilike.%${escapedSearch}%`);
    }

    // Apply pagination
    if (useLegacyPagination) {
      // Legacy offset-based pagination (for backwards compatibility)
      // WARNING: This is slow for large offsets
      const pageNum = Math.max(1, parseInt(page!));
      const offset = (pageNum - 1) * limit;
      query = query.range(offset, offset + limit - 1);
    } else if (cursor) {
      // Cursor-based pagination (O(log n) with proper index)
      // Fetch the cursor post to get its created_at timestamp
      const { data: cursorPost } = await supabase
        .from('posts')
        .select('created_at, id')
        .eq('id', cursor)
        .single();

      if (cursorPost) {
        // Get posts older than cursor OR same time but lower ID
        query = query.or(
          `created_at.lt.${cursorPost.created_at},and(created_at.eq.${cursorPost.created_at},id.lt.${cursorPost.id})`
        );
      }
      query = query.limit(limit);
    } else {
      // First page - no cursor
      query = query.limit(limit);
    }

    const { data: posts, error } = await query;

    if (error) {
      logger.error('Error fetching posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    // Transform data to match frontend expectations
    const transformedPosts = posts?.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      type: post.type,
      tags: post.tags || [],
      likesCount: post.likes_count || 0,
      commentsCount: post.comments_count || 0,
      createdAt: formatTimeAgo(new Date(post.created_at)),
      rawCreatedAt: post.created_at, // Include raw timestamp for cursor
      author: {
        name: post.author?.name || 'Anonymous',
        avatar: post.author?.avatar,
        badges: post.author?.badges || [],
      },
    })) || [];

    // Determine next cursor (last item's ID)
    const nextCursor = transformedPosts.length === limit
      ? transformedPosts[transformedPosts.length - 1]?.id
      : null;

    // Build response with cursor pagination info
    const response: {
      posts: typeof transformedPosts;
      hasMore: boolean;
      nextCursor: string | null;
      page?: number;
      total?: number;
    } = {
      posts: transformedPosts,
      hasMore: transformedPosts.length === limit,
      nextCursor,
    };

    // Include legacy fields for backwards compatibility
    if (useLegacyPagination) {
      response.page = parseInt(page!);
      response.total = transformedPosts.length;
    }

    return NextResponse.json(response);

  } catch (error) {
    logger.error('Posts API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new post
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user first
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Apply rate limiting (10 posts per hour per user)
    const rateLimit = await applyRateLimit(request, 'communityPost');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many posts. Please wait before posting again.' },
        {
          status: 429,
          headers: rateLimit.headers,
        }
      );
    }

    const body = await request.json();

    // Validate input with Zod schema
    const validation = validateRequest(communityPostSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.details },
        { status: 400 }
      );
    }

    const { title, content, category, tags } = validation.data;
    const { threadId } = body;

    // Sanitize text inputs
    const sanitizedTitle = sanitizeText(title);
    const sanitizedContent = sanitizeHTML(content, { allowLinks: true, allowStyles: false });
    const sanitizedTags = tags?.map(tag => sanitizeText(tag).substring(0, 30)) || [];

    // Create post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        author_id: user.id,
        title: sanitizedTitle,
        content: sanitizedContent,
        type: category,
        tags: sanitizedTags,
        thread_id: threadId || null,
        is_approved: true, // Auto-approve for now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (postError) {
      logger.error('Error creating post:', postError);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }

    // Award XP for posting
    await supabase.rpc('award_xp', {
      user_id: user.id,
      points: 15,
      event_type: 'community_post',
      description: 'Created a community post'
    });

    return NextResponse.json({
      success: true,
      post,
    });

  } catch (error) {
    logger.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}