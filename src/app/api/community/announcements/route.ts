import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { announcementSchema, validateRequest } from '@/lib/validation-schemas';
import { escapeLikePattern, sanitizeText, sanitizeHTML } from '@/lib/sanitize';
import { checkAdminStatus } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// BEH3 FIX: Constants for pagination bounds
const MIN_PAGE = 1;
const MAX_PAGE = 1000;
const MIN_LIMIT = 1;
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;

// GET - Fetch announcements with filtering and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // BEH3 FIX: Validate and bound pagination parameters to prevent DoS
    const rawPage = parseInt(searchParams.get('page') || '1');
    const rawLimit = parseInt(searchParams.get('limit') || String(DEFAULT_LIMIT));

    // Validate page is a valid number within bounds
    const page = isNaN(rawPage) ? MIN_PAGE : Math.max(MIN_PAGE, Math.min(MAX_PAGE, rawPage));
    // Validate limit is a valid number within bounds
    const limit = isNaN(rawLimit) ? DEFAULT_LIMIT : Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, rawLimit));

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
      const escapedSearch = escapeLikePattern(search);
      query = query.or(`title.ilike.%${escapedSearch}%,content.ilike.%${escapedSearch}%`);
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
      logger.error('Error fetching announcements:', error);
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
    logger.error('Announcements API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new announcement
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Apply rate limiting (5 announcements per day per user)
    const rateLimit = await applyRateLimit(request, 'createAnnouncement');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many announcements. Please wait before submitting another.' },
        { status: 429, headers: rateLimit.headers }
      );
    }

    const announcementData = await request.json();

    // Validate input with Zod schema
    const validation = validateRequest(announcementSchema, announcementData);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.details },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Check if user is admin for official posts using proper role-based check
    const { isAdmin } = await checkAdminStatus(user.id);

    // Sanitize text inputs
    const sanitizedTitle = sanitizeText(validatedData.title);
    const sanitizedContent = sanitizeHTML(validatedData.content, { allowLinks: true, allowImages: true });
    const sanitizedExcerpt = validatedData.excerpt ? sanitizeText(validatedData.excerpt) : sanitizedContent.substring(0, 200) + '...';
    const sanitizedTags = validatedData.tags?.map(tag => sanitizeText(tag).substring(0, 30)) || [];

    // Generate SEO slug
    const seoSlug = sanitizedTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);

    // Create announcement
    const { data: announcement, error: announcementError } = await supabase
      .from('announcements')
      .insert({
        author_id: user.id,
        title: sanitizedTitle,
        content: sanitizedContent,
        excerpt: sanitizedExcerpt,
        type: validatedData.type,
        category: validatedData.category,
        priority: validatedData.priority,
        target_audience: validatedData.targetAudience || ['all'],
        industries: validatedData.industries || ['all'],
        image_url: validatedData.imageUrl,
        external_links: validatedData.externalLinks,
        application_deadline: validatedData.applicationDeadline,
        event_date: validatedData.eventDate,
        valid_until: validatedData.validUntil,
        is_sponsored: validatedData.isSponsored || false,
        sponsor_name: validatedData.sponsorName ? sanitizeText(validatedData.sponsorName) : null,
        sponsor_logo: validatedData.sponsorLogo,
        sponsor_website: validatedData.sponsorWebsite,
        sponsorship_type: validatedData.sponsorshipType,
        status: isAdmin ? 'approved' : 'pending', // Admin posts auto-approved
        is_admin_post: isAdmin,
        is_pinned: validatedData.isPinned && isAdmin, // Only admins can pin
        is_featured: validatedData.isFeatured && isAdmin,
        tags: sanitizedTags,
        seo_slug: seoSlug,
        published_at: isAdmin ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (announcementError) {
      logger.error('Error creating announcement:', announcementError);
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
      description: `${isAdmin ? 'Posted official announcement' : 'Submitted community announcement'}: ${sanitizedTitle}`
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
    logger.error('Create announcement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}