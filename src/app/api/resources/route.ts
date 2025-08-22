import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productCode = searchParams.get('product');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const downloadableOnly = searchParams.get('downloadable') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get user's active purchases
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select(`
        id,
        productCode,
        status,
        expiresAt
      `)
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError) {
      logger.error('Error fetching purchases:', purchaseError);
      return NextResponse.json({
        error: 'Failed to fetch purchases'
      }, { status: 500 });
    }

    // Check if user has ALL_ACCESS bundle
    const hasAllAccess = purchases?.some(p => p.productCode === 'ALL_ACCESS') || false;
    const accessibleProducts = purchases?.map(p => p.productCode) || [];

    // Build base query for resources
    let resourceQuery = supabase
      .from('Resource')
      .select(`
        id,
        title,
        description,
        type,
        fileUrl,
        tags,
        isDownloadable,
        viewCount,
        downloadCount,
        useCount,
        rating,
        metadata,
        createdAt,
        module:Module(
          id,
          title,
          product:Product(
            id,
            code,
            title
          )
        )
      `);

    // Apply filters
    if (downloadableOnly) {
      resourceQuery = resourceQuery.eq('isDownloadable', true);
    }

    if (search) {
      resourceQuery = resourceQuery.or(
        `title.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    if (tag) {
      resourceQuery = resourceQuery.contains('tags', [tag]);
    }

    // Get all resources first, then filter by access
    const { data: allResources, error: resourceError } = await resourceQuery
      .order('downloadCount', { ascending: false })
      .limit(1000); // Get more than needed, then filter

    if (resourceError) {
      logger.error('Error fetching resources:', resourceError);
      return NextResponse.json({
        error: 'Failed to fetch resources'
      }, { status: 500 });
    }

    // Filter resources based on user access
    const accessibleResources = (allResources || []).filter(resource => {
      const resourceProductCode = resource.module?.product?.code;
      
      // Allow free templates
      if (!resourceProductCode || resourceProductCode === 'TEMPLATES') {
        return true;
      }

      // Check if user has access to this product
      return hasAllAccess || accessibleProducts.includes(resourceProductCode);
    });

    // Apply product filter after access filtering
    let filteredResources = accessibleResources;
    if (productCode) {
      filteredResources = accessibleResources.filter(resource => 
        resource.module?.product?.code === productCode
      );
    }

    // Apply category filter from metadata
    if (category) {
      filteredResources = filteredResources.filter(resource => {
        const resourceCategory = resource.metadata?.category;
        return resourceCategory === category;
      });
    }

    // Apply pagination
    const paginatedResources = filteredResources.slice(offset, offset + limit);

    // Enrich resources with access information
    const enrichedResources = paginatedResources.map(resource => ({
      ...resource,
      hasAccess: true, // All returned resources have access
      productCode: resource.module?.product?.code || 'TEMPLATES',
      productTitle: resource.module?.product?.title || 'Professional Templates',
      moduleTitle: resource.module?.title || '',
      category: resource.metadata?.category || 'General',
      difficulty: resource.metadata?.difficulty || 'intermediate',
      estimatedTime: resource.metadata?.estimatedTime || '30 minutes',
      format: resource.metadata?.format || 'Unknown'
    }));

    // Get aggregate data for filtering
    const allTags = [...new Set(accessibleResources.flatMap(r => r.tags || []))];
    const categories = [...new Set(accessibleResources.map(r => r.metadata?.category).filter(Boolean))];
    const products = [...new Set(accessibleResources.map(r => ({
      code: r.module?.product?.code || 'TEMPLATES',
      title: r.module?.product?.title || 'Professional Templates'
    })).map(p => JSON.stringify(p)))].map(p => JSON.parse(p));

    const resourcesByProduct = accessibleResources.reduce((acc, resource) => {
      const productCode = resource.module?.product?.code || 'TEMPLATES';
      if (!acc[productCode]) {
        acc[productCode] = [];
      }
      acc[productCode].push(resource);
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      resources: enrichedResources,
      resourcesByProduct,
      totalResources: filteredResources.length,
      pagination: {
        offset,
        limit,
        total: filteredResources.length,
        hasMore: filteredResources.length > offset + limit
      },
      filters: {
        categories: categories.sort(),
        tags: allTags.sort(),
        products: products.sort((a, b) => a.code.localeCompare(b.code))
      },
      userAccess: {
        hasAllAccess,
        accessibleProducts,
        totalAccessibleResources: accessibleResources.length
      }
    });

  } catch (error) {
    logger.error('Resources API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Bulk operations on resources
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const body = await request.json();
    const { action, resourceIds, metadata } = body;

    if (!action || !resourceIds || !Array.isArray(resourceIds)) {
      return NextResponse.json({
        error: 'Invalid request. Action and resourceIds are required.'
      }, { status: 400 });
    }

    // Verify user has access to all requested resources
    const { data: resources, error: resourceError } = await supabase
      .from('Resource')
      .select(`
        id,
        title,
        isDownloadable,
        module:Module(
          product:Product(
            code
          )
        )
      `)
      .in('id', resourceIds);

    if (resourceError || !resources) {
      logger.error('Error fetching resources:', resourceError);
      return NextResponse.json({
        error: 'Failed to fetch resources'
      }, { status: 500 });
    }

    // Check access for each resource
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('productCode')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    const hasAllAccess = purchases?.some(p => p.productCode === 'ALL_ACCESS') || false;
    const accessibleProducts = purchases?.map(p => p.productCode) || [];

    // Filter resources user has access to
    const accessibleResourceIds = resources.filter(resource => {
      const productCode = resource.module?.product?.code;
      return !productCode || 
             productCode === 'TEMPLATES' || 
             hasAllAccess || 
             accessibleProducts.includes(productCode);
    }).map(r => r.id);

    if (accessibleResourceIds.length === 0) {
      return NextResponse.json({
        error: 'No accessible resources found'
      }, { status: 403 });
    }

    switch (action) {
      case 'bulk_download':
        // Update download counts
        const { error: downloadError } = await supabase
          .from('Resource')
          .update({ 
            downloadCount: supabase.sql`COALESCE("downloadCount", 0) + 1`,
            lastDownloadedAt: new Date().toISOString()
          })
          .in('id', accessibleResourceIds);

        if (downloadError) {
          logger.error('Error updating download counts:', downloadError);
        }

        // Award XP for bulk download
        const xpEarned = accessibleResourceIds.length * 5;
        try {
          await supabase.rpc('increment_user_xp', {
            user_id: user.id,
            xp_amount: xpEarned
          });

          await supabase
            .from('XPEvent')
            .insert({
              userId: user.id,
              eventType: 'bulk_resource_download',
              eventId: `bulk_${Date.now()}`,
              xpEarned,
              metadata: {
                resourceCount: accessibleResourceIds.length,
                resourceIds: accessibleResourceIds
              }
            });
        } catch (xpError) {
          logger.error('XP system error:', xpError);
        }

        return NextResponse.json({
          success: true,
          processedResources: accessibleResourceIds.length,
          skippedResources: resourceIds.length - accessibleResourceIds.length,
          xpEarned
        });

      case 'add_to_favorites':
        // This would require a user favorites table - for now, just track engagement
        try {
          await supabase
            .from('XPEvent')
            .insert({
              userId: user.id,
              eventType: 'resources_favorited',
              eventId: `favorites_${Date.now()}`,
              xpEarned: 0,
              metadata: {
                resourceIds: accessibleResourceIds
              }
            });
        } catch (error) {
          logger.error('Error tracking favorites:', error);
        }

        return NextResponse.json({
          success: true,
          message: 'Resources added to favorites'
        });

      default:
        return NextResponse.json({
          error: 'Invalid action'
        }, { status: 400 });
    }

  } catch (error) {
    logger.error('Resources bulk API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}