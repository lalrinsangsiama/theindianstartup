import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';




export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('p2_templates')
      .select('*')
      .eq('is_active', true)
      .order('download_count', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (subcategory) {
      query = query.eq('subcategory', subcategory);
    }

    if (tag) {
      query = query.contains('tags', [tag]);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: templates, error } = await query;

    if (error) {
      throw error;
    }

    // Get template categories for filtering
    const { data: categories } = await supabase
      .from('p2_templates')
      .select('category, subcategory')
      .order('category');

    const uniqueCategories = Array.from(
      new Set(categories?.map(c => c.category))
    ).map(category => ({
      name: category,
      subcategories: Array.from(
        new Set(
          categories
            ?.filter(c => c.category === category)
            .map(c => c.subcategory)
            .filter(Boolean)
        )
      )
    }));

    // Get popular tags
    const { data: allTemplates } = await supabase
      .from('p2_templates')
      .select('tags');

    const allTags = allTemplates?.flatMap(t => t.tags || []) || [];
    const tagCounts = allTags.reduce((acc: Record<string, number>, tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const popularTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 20)
      .map(([tag]) => tag);

    return NextResponse.json({
      templates: templates || [],
      categories: uniqueCategories,
      popularTags,
      pagination: {
        offset,
        limit,
        total: templates?.length || 0
      }
    });

  } catch (error) {
    logger.error('Error fetching P2 templates:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { action, templateId, data } = body;

    switch (action) {
      case 'download':
        // Increment download count
        const { error: downloadError } = await supabase
          .from('p2_templates')
          .update({ 
            download_count: 'download_count + 1',
            updated_at: new Date().toISOString()
          })
          .eq('id', templateId);

        if (downloadError) throw downloadError;

        // Track download event
        const { error: xpError } = await supabase
          .from('p2_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'template_download',
            event_id: templateId,
            xp_earned: 5 // Small XP reward for downloading templates
          });

        if (xpError) throw xpError;

        // Get template info for response
        const { data: template } = await supabase
          .from('p2_templates')
          .select('name, download_url')
          .eq('id', templateId)
          .single();

        return NextResponse.json({ 
          success: true, 
          downloadUrl: template?.download_url,
          templateName: template?.name,
          xpEarned: 5
        });

      case 'favorite':
        // Add template to user favorites (implement user_favorites table if needed)
        // For now, just track the event
        const { error: favoriteError } = await supabase
          .from('p2_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'template_favorite',
            event_id: templateId,
            xp_earned: 0
          });

        if (favoriteError) throw favoriteError;
        return NextResponse.json({ success: true });

      case 'bulk_download':
        // Handle bulk download of templates
        const templateIds = data.templateIds || [];
        
        // Update download counts for all templates
        const { error: bulkError } = await supabase
          .from('p2_templates')
          .update({ 
            download_count: 'download_count + 1',
            updated_at: new Date().toISOString()
          })
          .in('id', templateIds);

        if (bulkError) throw bulkError;

        // Award XP for bulk download
        const { error: bulkXpError } = await supabase
          .from('p2_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'bulk_template_download',
            event_id: `bulk_${Date.now()}`,
            xp_earned: templateIds.length * 5
          });

        if (bulkXpError) throw bulkXpError;

        return NextResponse.json({ 
          success: true,
          xpEarned: templateIds.length * 5,
          templatesDownloaded: templateIds.length
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error processing P2 template request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle specific template requests
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { templateId, rating, feedback } = body;

    // Save user feedback on template (implement if needed)
    // For now, just track the engagement
    const { error } = await supabase
      .from('p2_xp_events')
      .insert({
        user_id: user.id,
        event_type: 'template_feedback',
        event_id: templateId,
        xp_earned: 10 // Reward for providing feedback
      });

    if (error) throw error;

    return NextResponse.json({ success: true, xpEarned: 10 });

  } catch (error) {
    logger.error('Error processing template feedback:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}