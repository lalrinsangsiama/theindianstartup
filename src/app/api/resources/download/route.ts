import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

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
    const { resourceId, action = 'download' } = body;

    if (!resourceId) {
      return NextResponse.json({
        error: 'Resource ID is required'
      }, { status: 400 });
    }

    // Get resource details
    const { data: resource, error: resourceError } = await supabase
      .from('Resource')
      .select(`
        id,
        title,
        description,
        fileUrl,
        isDownloadable,
        downloadCount,
        moduleId,
        module:Module(
          id,
          title,
          productId,
          product:Product(
            code,
            title
          )
        )
      `)
      .eq('id', resourceId)
      .single();

    if (resourceError || !resource) {
      logger.error('Resource not found:', resourceError);
      return NextResponse.json({
        error: 'Resource not found'
      }, { status: 404 });
    }

    // Check if resource is downloadable
    if (!resource.isDownloadable) {
      return NextResponse.json({
        error: 'Resource is not downloadable'
      }, { status: 403 });
    }

    // Check user access to the product
    const productCode = resource.module?.product?.code;
    
    if (productCode && productCode !== 'TEMPLATES') {
      const { data: purchase } = await supabase
        .from('Purchase')
        .select('*')
        .eq('userId', user.id)
        .or(`productCode.eq.${productCode},productCode.eq.ALL_ACCESS`)
        .eq('status', 'completed')
        .gte('expiresAt', new Date().toISOString())
        .maybeSingle();

      if (!purchase) {
        return NextResponse.json({
          error: 'Access denied. Purchase required.'
        }, { status: 403 });
      }
    }

    // Handle different actions
    switch (action) {
      case 'download':
        // Increment download count
        const { error: updateError } = await supabase
          .from('Resource')
          .update({ 
            downloadCount: (resource.downloadCount || 0) + 1,
            lastDownloadedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          .eq('id', resourceId);

        if (updateError) {
          logger.error('Error updating download count:', updateError);
        }

        // Award XP for resource download
        try {
          const { error: xpError } = await supabase.rpc('increment_user_xp', {
            user_id: user.id,
            xp_amount: 5
          });

          if (xpError) {
            logger.error('Error awarding XP:', xpError);
          }

          // Log XP event
          const { error: eventError } = await supabase
            .from('XPEvent')
            .insert({
              userId: user.id,
              eventType: 'resource_download',
              eventId: resourceId,
              xpEarned: 5,
              metadata: {
                resourceTitle: resource.title,
                productCode: productCode || 'TEMPLATES'
              }
            });

          if (eventError) {
            logger.error('Error logging XP event:', eventError);
          }
        } catch (xpError) {
          // XP is not critical, so we just log and continue
          logger.error('XP system error:', xpError);
        }

        return NextResponse.json({
          success: true,
          resource: {
            id: resource.id,
            title: resource.title,
            description: resource.description,
            fileUrl: resource.fileUrl,
            downloadCount: (resource.downloadCount || 0) + 1
          },
          downloadUrl: resource.fileUrl,
          xpEarned: 5
        });

      case 'view':
        // Increment view count
        const { error: viewError } = await supabase
          .from('Resource')
          .update({ 
            viewCount: supabase.sql`COALESCE("viewCount", 0) + 1`,
            lastAccessedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          .eq('id', resourceId);

        if (viewError) {
          logger.error('Error updating view count:', viewError);
        }

        return NextResponse.json({
          success: true,
          resource: {
            id: resource.id,
            title: resource.title,
            description: resource.description,
            fileUrl: resource.fileUrl
          }
        });

      case 'use':
        // Track resource usage
        const { error: useError } = await supabase
          .from('Resource')
          .update({ 
            useCount: supabase.sql`COALESCE("useCount", 0) + 1`,
            lastAccessedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          .eq('id', resourceId);

        if (useError) {
          logger.error('Error updating use count:', useError);
        }

        return NextResponse.json({
          success: true,
          resource: {
            id: resource.id,
            title: resource.title,
            description: resource.description,
            fileUrl: resource.fileUrl
          }
        });

      default:
        return NextResponse.json({
          error: 'Invalid action'
        }, { status: 400 });
    }

  } catch (error) {
    logger.error('Resource download API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Get resource details and access info
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
    const resourceId = searchParams.get('id');

    if (!resourceId) {
      return NextResponse.json({
        error: 'Resource ID is required'
      }, { status: 400 });
    }

    // Get resource with product info
    const { data: resource, error: resourceError } = await supabase
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
          description,
          product:Product(
            id,
            code,
            title,
            description
          )
        )
      `)
      .eq('id', resourceId)
      .single();

    if (resourceError || !resource) {
      logger.error('Resource not found:', resourceError);
      return NextResponse.json({
        error: 'Resource not found'
      }, { status: 404 });
    }

    // Check access
    const productCode = resource.module?.product?.code;
    let hasAccess = false;

    if (!productCode || productCode === 'TEMPLATES') {
      hasAccess = true; // Free templates
    } else {
      const { data: purchase } = await supabase
        .from('Purchase')
        .select('*')
        .eq('userId', user.id)
        .or(`productCode.eq.${productCode},productCode.eq.ALL_ACCESS`)
        .eq('status', 'completed')
        .gte('expiresAt', new Date().toISOString())
        .maybeSingle();

      hasAccess = !!purchase;
    }

    return NextResponse.json({
      resource: {
        ...resource,
        hasAccess,
        productCode: productCode || 'TEMPLATES'
      }
    });

  } catch (error) {
    logger.error('Resource info API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}