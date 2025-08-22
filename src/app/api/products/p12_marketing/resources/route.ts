import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { checkProductAccess } from '@/lib/product-access';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has access to P12
    const access = await checkProductAccess(user.id, 'p12_marketing');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P12 Marketing Mastery course.' },
        { status: 403 }
      );
    }

    const supabase = createClient();

    // Get P12 product ID
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select('id')
      .eq('code', 'p12_marketing')
      .single();

    if (productError || !product) {
      logger.error('Error fetching P12 product:', productError);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get all P12 modules and their resources
    const { data: modules, error: moduleError } = await supabase
      .from('Module')
      .select(`
        id,
        title,
        description,
        orderIndex,
        resources:Resource(
          id,
          title,
          description,
          type,
          fileUrl,
          tags,
          isDownloadable,
          metadata,
          viewCount,
          downloadCount
        )
      `)
      .eq('productId', product.id)
      .order('orderIndex');

    if (moduleError) {
      logger.error('Error fetching P12 modules:', moduleError);
      return NextResponse.json(
        { error: 'Failed to fetch resources' },
        { status: 500 }
      );
    }

    // Organize resources by category
    const resourcesByCategory = {
      templates: [] as any[],
      masterclasses: [] as any[],
      tools: [] as any[],
      premium: [] as any[]
    };

    const allResources: any[] = [];

    modules?.forEach(module => {
      module.resources?.forEach(resource => {
        const enrichedResource = {
          ...resource,
          moduleTitle: module.title,
          moduleId: module.id,
          productCode: 'p12_marketing',
          source: 'module' as const
        };

        allResources.push(enrichedResource);

        // Categorize resources
        if (resource.type === 'template_collection') {
          resourcesByCategory.templates.push(enrichedResource);
        } else if (resource.type === 'video_masterclass') {
          resourcesByCategory.masterclasses.push(enrichedResource);
        } else if (resource.type === 'interactive_tool' || resource.type === 'dashboard_template') {
          resourcesByCategory.tools.push(enrichedResource);
        } else if (resource.type === 'premium_collection') {
          resourcesByCategory.premium.push(enrichedResource);
        }
      });
    });

    // Get resource statistics
    const totalTemplates = resourcesByCategory.templates.reduce((acc, r) => {
      const metadata = typeof r.metadata === 'object' ? r.metadata : {};
      return acc + (metadata.templateCount || 0);
    }, 0);

    const totalValue = allResources.reduce((acc, r) => {
      const metadata = typeof r.metadata === 'object' ? r.metadata : {};
      const valueStr = metadata.value || '₹0';
      const value = parseInt(valueStr.replace(/[₹,]/g, '')) || 0;
      return acc + value;
    }, 0);

    const statistics = {
      totalResources: allResources.length,
      totalTemplates,
      totalValue: `₹${totalValue.toLocaleString()}`,
      templateCollections: resourcesByCategory.templates.length,
      masterclasses: resourcesByCategory.masterclasses.length,
      interactiveTools: resourcesByCategory.tools.length,
      premiumResources: resourcesByCategory.premium.length
    };

    return NextResponse.json({
      resources: allResources,
      resourcesByCategory,
      statistics,
      modules: modules?.map(m => ({
        id: m.id,
        title: m.title,
        description: m.description,
        orderIndex: m.orderIndex,
        resourceCount: m.resources?.length || 0
      })) || [],
      hasAccess: true,
      accessDetails: {
        daysRemaining: access.daysRemaining,
        expiresAt: access.expiresAt
      }
    });

  } catch (error) {
    logger.error('Error in P12 resources API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}