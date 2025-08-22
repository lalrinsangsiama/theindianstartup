import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  try {
    const { data: post, error } = await supabase
      .from('BlogPost')
      .select('*')
      .eq('id', params.postId)
      .single();

    if (error) throw error;

    return NextResponse.json(post);
  } catch (error) {
    logger.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  let adminUser;
  try {
    adminUser = await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const updates = await request.json();

  try {
    // Calculate reading time and word count if content updated
    if (updates.content) {
      const content = updates.content || '';
      const wordCount = content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.round(wordCount / 200));
      updates.wordCount = wordCount;
      updates.readingTime = readingTime;
    }

    // Handle slug updates
    if (updates.slug) {
      // Ensure unique slug (excluding current post)
      let finalSlug = updates.slug;
      let counter = 0;
      while (true) {
        const { data: existing } = await supabase
          .from('BlogPost')
          .select('id')
          .eq('slug', finalSlug)
          .neq('id', params.postId)
          .single();

        if (!existing) break;
        
        counter++;
        finalSlug = `${updates.slug}-${counter}`;
      }
      updates.slug = finalSlug;
    }

    // Set published date if status changed to published
    if (updates.status === 'published') {
      const { data: currentPost } = await supabase
        .from('BlogPost')
        .select('status, publishedAt')
        .eq('id', params.postId)
        .single();

      if (currentPost?.status !== 'published' && !currentPost?.publishedAt) {
        updates.publishedAt = new Date().toISOString();
      }
    }

    updates.updatedBy = adminUser.id;
    updates.updatedAt = new Date().toISOString();

    const { data: post, error } = await supabase
      .from('BlogPost')
      .update(updates)
      .eq('id', params.postId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(post);
  } catch (error) {
    logger.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('BlogPost')
      .delete()
      .eq('id', params.postId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}