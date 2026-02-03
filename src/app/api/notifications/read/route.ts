import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const markReadSchema = z.object({
  notificationIds: z.array(z.string()).optional(),
  markAllRead: z.boolean().optional(),
});

/**
 * POST /api/notifications/read
 * Mark notifications as read
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validation = markReadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    const { notificationIds, markAllRead } = validation.data;
    const supabase = createClient();
    const now = new Date().toISOString();

    if (markAllRead) {
      // Mark all unread notifications as read
      const { error } = await supabase
        .from('Notification')
        .update({ isRead: true, readAt: now })
        .eq('userId', user.id)
        .eq('isRead', false);

      if (error) {
        logger.error('Failed to mark all as read:', error);
        return NextResponse.json(
          { error: 'Failed to mark notifications as read' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: 'All notifications marked as read' });
    }

    if (notificationIds && notificationIds.length > 0) {
      // Mark specific notifications as read
      const { error } = await supabase
        .from('Notification')
        .update({ isRead: true, readAt: now })
        .eq('userId', user.id)
        .in('id', notificationIds);

      if (error) {
        logger.error('Failed to mark notifications as read:', error);
        return NextResponse.json(
          { error: 'Failed to mark notifications as read' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `${notificationIds.length} notification(s) marked as read`,
      });
    }

    return NextResponse.json(
      { error: 'Please provide notificationIds or set markAllRead to true' },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Mark read error:', error);
    return NextResponse.json(
      { error: 'Failed to mark notifications as read' },
      { status: 500 }
    );
  }
}
