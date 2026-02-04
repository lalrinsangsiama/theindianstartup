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

    // Check user access to P5
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P5', 'ALL_ACCESS'])
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
    const legalArea = searchParams.get('legal_area');
    const jurisdiction = searchParams.get('jurisdiction');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('p5_templates')
      .select('*')
      .eq('is_active', true)
      .order('download_count', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (subcategory) {
      query = query.eq('subcategory', subcategory);
    }

    if (legalArea) {
      query = query.eq('legal_area', legalArea);
    }

    if (jurisdiction) {
      query = query.eq('jurisdiction', jurisdiction);
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

    // Get template categories and metadata for filtering
    const { data: categories } = await supabase
      .from('p5_templates')
      .select('category, subcategory, legal_area, jurisdiction')
      .eq('is_active', true)
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

    // Get legal areas and jurisdictions
    const legalAreas = Array.from(
      new Set(categories?.map(c => c.legal_area).filter(Boolean))
    );

    const jurisdictions = Array.from(
      new Set(categories?.map(c => c.jurisdiction).filter(Boolean))
    );

    // Get popular tags
    const { data: allTemplates } = await supabase
      .from('p5_templates')
      .select('tags')
      .eq('is_active', true);

    const allTags = allTemplates?.flatMap(t => t.tags || []) || [];
    const tagCounts = allTags.reduce((acc: Record<string, number>, tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const popularTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 20)
      .map(([tag]) => tag);

    // Get template stats
    const templateStats = await supabase
      .from('p5_templates')
      .select('category, legal_area, is_premium')
      .eq('is_active', true);

    const statsByCategory = templateStats.data?.reduce((acc: any, template) => {
      if (!acc[template.category]) {
        acc[template.category] = { total: 0, premium: 0, legalAreas: {} };
      }
      acc[template.category].total += 1;
      if (template.is_premium) {
        acc[template.category].premium += 1;
      }
      if (template.legal_area) {
        acc[template.category].legalAreas[template.legal_area] = 
          (acc[template.category].legalAreas[template.legal_area] || 0) + 1;
      }
      return acc;
    }, {});

    return NextResponse.json({
      templates: templates || [],
      categories: uniqueCategories,
      legalAreas,
      jurisdictions,
      popularTags,
      stats: statsByCategory,
      pagination: {
        offset,
        limit,
        total: templates?.length || 0
      }
    });

  } catch (error) {
    logger.error('Error fetching P5 templates:', error);
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

    // Check user access to P5
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P5', 'ALL_ACCESS'])
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
          .from('p5_templates')
          .update({ 
            download_count: 'download_count + 1',
            updated_at: new Date().toISOString()
          })
          .eq('id', templateId);

        if (downloadError) throw downloadError;

        // Track download event
        const { error: xpError } = await supabase
          .from('p5_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'template_download',
            event_id: templateId,
            xp_earned: 15 // Higher XP for legal templates
          });

        if (xpError) throw xpError;

        // Get template info for response
        const { data: template } = await supabase
          .from('p5_templates')
          .select('name, download_url, legal_area')
          .eq('id', templateId)
          .single();

        return NextResponse.json({ 
          success: true, 
          downloadUrl: template?.download_url,
          templateName: template?.name,
          legalArea: template?.legal_area,
          xpEarned: 15
        });

      case 'favorite':
        // Track favorite event
        const { error: favoriteError } = await supabase
          .from('p5_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'template_favorite',
            event_id: templateId,
            xp_earned: 5
          });

        if (favoriteError) throw favoriteError;
        return NextResponse.json({ success: true, xpEarned: 5 });

      case 'bulk_download':
        // Handle bulk download by category or legal area
        const templateIds = data.templateIds || [];
        
        if (templateIds.length > 0) {
          // Update download counts
          const { error: bulkError } = await supabase
            .from('p5_templates')
            .update({ 
              download_count: 'download_count + 1',
              updated_at: new Date().toISOString()
            })
            .in('id', templateIds);

          if (bulkError) throw bulkError;

          // Award XP for bulk download
          const { error: bulkXpError } = await supabase
            .from('p5_xp_events')
            .insert({
              user_id: user.id,
              event_type: 'bulk_template_download',
              event_id: `bulk_${Date.now()}`,
              xp_earned: templateIds.length * 15
            });

          if (bulkXpError) throw bulkXpError;

          return NextResponse.json({ 
            success: true,
            xpEarned: templateIds.length * 15,
            templatesDownloaded: templateIds.length
          });
        }

        return NextResponse.json({ error: 'No templates specified' }, { status: 400 });

      case 'rate':
        // Handle template rating
        const rating = data.rating;
        if (rating >= 1 && rating <= 5) {
          // For now, just track the rating event
          const { error: ratingError } = await supabase
            .from('p5_xp_events')
            .insert({
              user_id: user.id,
              event_type: 'template_rated',
              event_id: `${templateId}_${rating}`,
              xp_earned: 5
            });

          if (ratingError) throw ratingError;
          return NextResponse.json({ success: true, xpEarned: 5 });
        }

        return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error processing P5 template request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}