import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

// GET - Fetch posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    
    const offset = (page - 1) * limit;

    const supabase = createClient();

    // Build query
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
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category !== 'all') {
      if (category === 'questions') {
        query = query.eq('type', 'question');
      } else if (category === 'success_stories') {
        query = query.eq('type', 'success_story');
      } else if (category === 'resources') {
        query = query.eq('type', 'resource_share');
      }
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%, content.ilike.%${search}%`);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
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
      author: {
        name: post.author?.name || 'Anonymous',
        avatar: post.author?.avatar,
        badges: post.author?.badges || [],
      },
    })) || [];

    return NextResponse.json({
      posts: transformedPosts,
      hasMore: posts?.length === limit,
      page,
      total: transformedPosts.length,
    });

  } catch (error) {
    console.error('Posts API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new post
export async function POST(request: NextRequest) {
  try {
    const { title, content, type, tags, threadId } = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        author_id: user.id,
        title,
        content,
        type: type || 'general',
        tags: tags || [],
        thread_id: threadId || null,
        is_approved: true, // Auto-approve for now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (postError) {
      console.error('Error creating post:', postError);
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
    console.error('Create post error:', error);
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