import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Fetch individual announcement with full details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const supabase = createClient();

    // Get current user for saved status
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch announcement details
    const { data: announcement, error } = await supabase
      .from('announcements')
      .select(`
        *,
        author:author_id (
          id,
          name,
          avatar
        )
      `)
      .eq('id', id)
      .eq('status', 'approved')
      .single();

    if (error || !announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    // Check if user has saved this announcement
    let isSaved = false;
    if (user) {
      const { data: saveData } = await supabase
        .from('announcement_saves')
        .select('id')
        .eq('user_id', user.id)
        .eq('announcement_id', id)
        .single();
      
      isSaved = !!saveData;
    }

    // Increment view count (only once per user session)
    if (user) {
      // Check if user has already viewed this announcement recently
      const { data: recentView } = await supabase
        .from('announcement_clicks')
        .select('id')
        .eq('announcement_id', id)
        .eq('user_id', user.id)
        .eq('click_type', 'view')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
        .single();

      if (!recentView) {
        // Record view and increment counter
        await Promise.all([
          supabase
            .from('announcement_clicks')
            .insert({
              announcement_id: id,
              user_id: user.id,
              click_type: 'view',
              created_at: new Date().toISOString(),
            }),
          supabase
            .from('announcements')
            .update({ views_count: (announcement.views_count || 0) + 1 })
            .eq('id', id)
        ]);
      }
    }

    // Transform data to match frontend expectations
    const transformedAnnouncement = {
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      excerpt: announcement.excerpt,
      type: announcement.type,
      category: announcement.category,
      priority: announcement.priority,
      targetAudience: announcement.target_audience || [],
      industries: announcement.industries || [],
      imageUrl: announcement.image_url,
      attachments: announcement.attachments || [],
      externalLinks: announcement.external_links,
      applicationDeadline: announcement.application_deadline,
      eventDate: announcement.event_date,
      validUntil: announcement.valid_until,
      isSponsored: announcement.is_sponsored,
      sponsorName: announcement.sponsor_name,
      sponsorLogo: announcement.sponsor_logo,
      sponsorWebsite: announcement.sponsor_website,
      sponsorshipType: announcement.sponsorship_type,
      viewsCount: (announcement.views_count || 0) + (user ? 1 : 0),
      clicksCount: announcement.clicks_count || 0,
      savesCount: announcement.saves_count || 0,
      isAdminPost: announcement.is_admin_post,
      isPinned: announcement.is_pinned,
      isFeatured: announcement.is_featured,
      tags: announcement.tags || [],
      publishedAt: announcement.published_at || announcement.created_at,
      author: announcement.author,
      isSaved,
    };

    return NextResponse.json({ announcement: transformedAnnouncement });

  } catch (error) {
    console.error('Get announcement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update announcement (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin or author
    const isAdmin = ['admin@theindianstartup.in', 'support@theindianstartup.in'].includes(user.email || '');
    
    // Get current announcement to check ownership
    const { data: currentAnnouncement } = await supabase
      .from('announcements')
      .select('author_id, is_admin_post')
      .eq('id', id)
      .single();

    if (!currentAnnouncement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    const isAuthor = currentAnnouncement.author_id === user.id;

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Prepare update object (only allow certain fields for non-admins)
    const allowedUserFields = ['title', 'content', 'excerpt', 'tags', 'external_links'];
    const allowedAdminFields = [...allowedUserFields, 'priority', 'is_pinned', 'is_featured', 'status'];
    
    const allowedFields = isAdmin ? allowedAdminFields : allowedUserFields;
    const updateObject: any = {
      updated_at: new Date().toISOString(),
    };

    // Only update allowed fields
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        updateObject[dbField] = updateData[key];
      }
    });

    // Update announcement
    const { data: announcement, error: updateError } = await supabase
      .from('announcements')
      .update(updateObject)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating announcement:', updateError);
      return NextResponse.json(
        { error: 'Failed to update announcement' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      announcement,
      message: 'Announcement updated successfully',
    });

  } catch (error) {
    console.error('Update announcement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete announcement (admin or author only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin or author
    const isAdmin = ['admin@theindianstartup.in', 'support@theindianstartup.in'].includes(user.email || '');
    
    // Get current announcement to check ownership
    const { data: currentAnnouncement } = await supabase
      .from('announcements')
      .select('author_id')
      .eq('id', id)
      .single();

    if (!currentAnnouncement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    const isAuthor = currentAnnouncement.author_id === user.id;

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Delete announcement (this will cascade to related records)
    const { error: deleteError } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting announcement:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete announcement' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Announcement deleted successfully',
    });

  } catch (error) {
    console.error('Delete announcement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}