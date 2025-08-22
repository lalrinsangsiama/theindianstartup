import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    let query = supabase
      .from('BlogPost')
      .select('*')
      .order('updatedAt', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data: posts, error } = await query
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Get total count
    let countQuery = supabase
      .from('BlogPost')
      .select('*', { count: 'exact', head: true });
    
    if (status && status !== 'all') {
      countQuery = countQuery.eq('status', status);
    }
    if (category && category !== 'all') {
      countQuery = countQuery.eq('category', category);
    }

    const { count } = await countQuery;

    return NextResponse.json({
      posts: posts || [],
      total: count || 0
    });
  } catch (error) {
    logger.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let adminUser;
  try {
    adminUser = await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const postData = await request.json();

  try {
    // Calculate reading time and word count
    const content = postData.content || '';
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200)); // 200 words per minute

    // Generate slug if not provided
    let slug = postData.slug;
    if (!slug && postData.title) {
      slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Ensure unique slug
    let finalSlug = slug;
    let counter = 0;
    while (true) {
      const { data: existing } = await supabase
        .from('BlogPost')
        .select('id')
        .eq('slug', finalSlug)
        .single();

      if (!existing) break;
      
      counter++;
      finalSlug = `${slug}-${counter}`;
    }

    const newPost = {
      title: postData.title,
      slug: finalSlug,
      excerpt: postData.excerpt,
      content: postData.content,
      featuredImage: postData.featuredImage,
      author: postData.author || 'The Indian Startup Team',
      authorBio: postData.authorBio,
      status: postData.status || 'draft',
      publishedAt: postData.status === 'published' ? new Date().toISOString() : null,
      scheduledFor: postData.scheduledFor || null,
      category: postData.category,
      tags: postData.tags || [],
      readingTime,
      wordCount,
      metaTitle: postData.metaTitle,
      metaDescription: postData.metaDescription,
      metaKeywords: postData.metaKeywords || [],
      createdBy: adminUser.id,
      viewCount: 0,
      likeCount: 0,
      shareCount: 0,
      commentCount: 0
    };

    const { data: post, error } = await supabase
      .from('BlogPost')
      .insert([newPost])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(post);
  } catch (error) {
    logger.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}