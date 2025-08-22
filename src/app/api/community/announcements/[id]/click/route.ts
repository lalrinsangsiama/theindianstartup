import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// POST - Track announcement click
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { clickType, url } = await request.json();

    // Get authenticated user (optional for anonymous tracking)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Validate click type
    const validClickTypes = ['website', 'application', 'attachment', 'sponsor', 'external'];
    if (!validClickTypes.includes(clickType)) {
      return NextResponse.json(
        { error: 'Invalid click type' },
        { status: 400 }
      );
    }

    // Check if announcement exists
    const { data: announcement, error: announcementError } = await supabase
      .from('announcements')
      .select('id, clicks_count')
      .eq('id', id)
      .eq('status', 'approved')
      .single();

    if (announcementError || !announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    // Get request headers for analytics
    const userAgent = request.headers.get('user-agent');
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Record the click
    const { error: clickError } = await supabase
      .from('announcement_clicks')
      .insert({
        announcement_id: id,
        user_id: user?.id || null,
        click_type: clickType,
        ip_address: ipAddress,
        user_agent: userAgent,
        created_at: new Date().toISOString(),
      });

    if (clickError) {
      logger.error('Error recording click:', clickError);
      // Don't fail the request if click tracking fails
    }

    // Update clicks count in announcement
    const newClicksCount = (announcement.clicks_count || 0) + 1;
    const { error: updateError } = await supabase
      .from('announcements')
      .update({ clicks_count: newClicksCount })
      .eq('id', id);

    if (updateError) {
      logger.error('Error updating clicks count:', updateError);
      // Don't fail the request if count update fails
    }

    // Award XP for clicking on external links (engagement)
    if (user && (clickType === 'website' || clickType === 'application')) {
      await supabase.rpc('award_xp', {
        user_id: user.id,
        points: 2,
        event_type: 'announcement_engagement',
        description: `Clicked on ${clickType} link from announcement`
      });
    }

    return NextResponse.json({
      success: true,
      clicksCount: newClicksCount,
      message: 'Click tracked successfully',
    });

  } catch (error) {
    logger.error('Track click error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}