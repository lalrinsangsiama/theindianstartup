import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await requireAuth();
    const supabase = createClient();
    const postId = params.postId;

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      // Unlike
      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (deleteError) {
        logger.error('Error unliking post:', deleteError);
        return NextResponse.json(
          { error: 'Failed to unlike post' },
          { status: 500 }
        );
      }

      // Update likes count
      const { error: updateError } = await supabase.rpc('decrement_likes', {
        post_id: postId
      });

      if (updateError) {
        logger.error('Error updating likes count:', updateError);
      }

      return NextResponse.json({
        liked: false,
        message: 'Post unliked'
      });

    } else {
      // Like
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert({
          post_id: postId,
          user_id: user.id
        });

      if (insertError) {
        logger.error('Error liking post:', insertError);
        return NextResponse.json(
          { error: 'Failed to like post' },
          { status: 500 }
        );
      }

      // Update likes count
      const { error: updateError } = await supabase.rpc('increment_likes', {
        post_id: postId
      });

      if (updateError) {
        logger.error('Error updating likes count:', updateError);
      }

      return NextResponse.json({
        liked: true,
        message: 'Post liked'
      });
    }

  } catch (error) {
    logger.error('Like API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}