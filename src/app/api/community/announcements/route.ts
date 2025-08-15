import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Fetch announcements with filtering and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type') || 'all';
    const category = searchParams.get('category') || 'all';
    const priority = searchParams.get('priority') || 'all';
    const search = searchParams.get('search') || '';
    const showExpired = searchParams.get('showExpired') === 'true';
    const sortBy = searchParams.get('sortBy') || 'priority'; // priority, recent, views
    
    const offset = (page - 1) * limit;
    const supabase = createClient();

    // Get current user for saved status
    const { data: { user } } = await supabase.auth.getUser();

    // Build base query
    let query = supabase
      .from('announcements')
      .select(`
        id,
        title,
        content,
        excerpt,
        type,
        category,
        priority,
        target_audience,
        industries,
        image_url,
        external_links,
        application_deadline,
        event_date,
        valid_until,
        is_sponsored,
        sponsor_name,
        sponsor_logo,
        sponsor_website,
        sponsorship_type,
        views_count,
        clicks_count,
        saves_count,
        status,
        is_admin_post,
        is_pinned,
        is_featured,
        tags,
        created_at,
        published_at,
        author:author_id (
          name
        )
      `)
      .eq('status', 'approved')
      .range(offset, offset + limit - 1);

    // Apply filters
    if (type !== 'all') {
      query = query.eq('type', type);
    }

    if (category !== 'all') {
      query = query.eq('category', category);
    }

    if (priority !== 'all') {
      query = query.eq('priority', priority);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%, content.ilike.%${search}%, tags.cs.{${search}}`);
    }

    // Filter expired items unless explicitly requested
    if (!showExpired) {
      const now = new Date().toISOString();
      query = query.or(`valid_until.is.null, valid_until.gt.${now}, application_deadline.is.null, application_deadline.gt.${now}`);
    }

    // Apply sorting
    let orderBy: string;
    let ascending = false;

    switch (sortBy) {
      case 'priority':
        // Custom ordering: pinned -> urgent -> high -> normal -> low
        query = query.order('is_pinned', { ascending: false });
        query = query.order('priority', { ascending: false }); // Will need custom priority ordering
        query = query.order('published_at', { ascending: false });
        break;
      case 'recent':
        query = query.order('published_at', { ascending: false });
        break;
      case 'views':
        query = query.order('views_count', { ascending: false });
        break;
      default:
        query = query.order('is_pinned', { ascending: false });
        query = query.order('published_at', { ascending: false });
    }

    const { data: announcements, error } = await query;

    if (error) {
      console.error('Error fetching announcements:', error);
      return NextResponse.json(
        { error: 'Failed to fetch announcements' },
        { status: 500 }
      );
    }

    // If user is logged in, get their saved announcements
    let savedAnnouncements = [];
    if (user) {
      const { data: saves } = await supabase
        .from('announcement_saves')
        .select('announcement_id')
        .eq('user_id', user.id);
      
      savedAnnouncements = saves?.map(save => save.announcement_id) || [];
    }

    // Transform data to match frontend expectations
    const transformedAnnouncements = announcements?.map(announcement => ({
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
      externalLinks: announcement.external_links,
      applicationDeadline: announcement.application_deadline,
      eventDate: announcement.event_date,
      validUntil: announcement.valid_until,
      isSponsored: announcement.is_sponsored,
      sponsorName: announcement.sponsor_name,
      sponsorLogo: announcement.sponsor_logo,
      sponsorWebsite: announcement.sponsor_website,
      sponsorshipType: announcement.sponsorship_type,
      viewsCount: announcement.views_count || 0,
      clicksCount: announcement.clicks_count || 0,
      savesCount: announcement.saves_count || 0,
      isAdminPost: announcement.is_admin_post,
      isPinned: announcement.is_pinned,
      isFeatured: announcement.is_featured,
      tags: announcement.tags || [],
      publishedAt: announcement.published_at || announcement.created_at,
      author: announcement.author,
      isSaved: savedAnnouncements.includes(announcement.id),
    })) || [];

    return NextResponse.json({
      announcements: transformedAnnouncements,
      hasMore: announcements?.length === limit,
      page,
      total: transformedAnnouncements.length,
    });

  } catch (error) {
    console.error('Announcements API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new announcement
export async function POST(request: NextRequest) {
  try {
    const announcementData = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin for official posts
    const isAdmin = ['admin@theindianstartup.in', 'support@theindianstartup.in'].includes(user.email || '');

    // Validate required fields
    const { title, content, type, category } = announcementData;
    
    if (!title || !content || !type || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, type, category' },
        { status: 400 }
      );
    }

    // Generate SEO slug
    const seoSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);

    // Create announcement
    const { data: announcement, error: announcementError } = await supabase
      .from('announcements')
      .insert({
        author_id: user.id,
        title,
        content,
        excerpt: announcementData.excerpt || content.substring(0, 200) + '...',
        type,
        category,
        priority: announcementData.priority || 'normal',
        target_audience: announcementData.targetAudience || ['all'],
        industries: announcementData.industries || ['all'],
        image_url: announcementData.imageUrl,
        external_links: announcementData.externalLinks,
        application_deadline: announcementData.applicationDeadline,
        event_date: announcementData.eventDate,
        valid_until: announcementData.validUntil,
        is_sponsored: announcementData.isSponsored || false,
        sponsor_name: announcementData.sponsorName,
        sponsor_logo: announcementData.sponsorLogo,
        sponsor_website: announcementData.sponsorWebsite,
        sponsorship_type: announcementData.sponsorshipType,
        status: isAdmin ? 'approved' : 'pending', // Admin posts auto-approved
        is_admin_post: isAdmin,
        is_pinned: announcementData.isPinned && isAdmin, // Only admins can pin
        is_featured: announcementData.isFeatured && isAdmin,
        tags: announcementData.tags || [],
        seo_slug: seoSlug,
        published_at: isAdmin ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (announcementError) {
      console.error('Error creating announcement:', announcementError);
      return NextResponse.json(
        { error: 'Failed to create announcement' },
        { status: 500 }
      );
    }

    // Award XP for contributing
    await supabase.rpc('award_xp', {
      user_id: user.id,
      points: isAdmin ? 25 : 40, // Less XP for admin posts
      event_type: 'announcement_contribution',
      description: `${isAdmin ? 'Posted official announcement' : 'Submitted community announcement'}: ${title}`
    });

    const message = isAdmin 
      ? 'Announcement published successfully!'
      : 'Announcement submitted for review. It will be published after approval.';

    return NextResponse.json({
      success: true,
      announcement,
      message,
    });

  } catch (error) {
    console.error('Create announcement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}