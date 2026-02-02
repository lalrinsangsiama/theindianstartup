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

    // Check if user has access to P7
    const access = await checkProductAccess(user.id, 'P7');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P7 State-wise Scheme Map course.' },
        { status: 403 }
      );
    }

    const supabase = createClient();

    // Get all P7 resources from all modules
    const { data: resources, error: resourceError } = await supabase
      .from('Resource')
      .select(`
        id,
        title,
        description,
        type,
        fileUrl,
        tags,
        isDownloadable,
        metadata,
        moduleId,
        module:Module (
          id,
          title,
          orderIndex,
          product:Product (
            code,
            title
          )
        )
      `)
      .eq('module.product.code', 'P7')
      .order('module.orderIndex');

    if (resourceError) {
      logger.error('Error fetching P7 resources:', resourceError);
      return NextResponse.json(
        { error: 'Failed to fetch resources' },
        { status: 500 }
      );
    }

    // Group resources by module
    const resourcesByModule: Record<string, { moduleTitle: string; resources: any[] }> = {};
    const allResources: any[] = [];

    resources?.forEach((resource: any) => {
      const resourceModule = Array.isArray(resource.module) ? resource.module[0] : resource.module;
      const moduleTitle = resourceModule?.title;
      const moduleOrder = resourceModule?.orderIndex;
      
      if (!resourcesByModule[moduleOrder]) {
        resourcesByModule[moduleOrder] = {
          moduleTitle,
          resources: []
        };
      }
      
      const resourceData = {
        id: resource.id,
        title: resource.title,
        description: resource.description,
        type: resource.type,
        fileUrl: resource.fileUrl,
        tags: resource.tags,
        isDownloadable: resource.isDownloadable,
        metadata: resource.metadata
      };

      resourcesByModule[moduleOrder].resources.push(resourceData);
      allResources.push({
        ...resourceData,
        moduleTitle,
        moduleOrder
      });
    });

    // Calculate total value
    const totalValue = allResources.reduce((sum, resource) => {
      const metadata = resource.metadata;
      if (metadata && metadata.value) {
        // Extract numeric value from strings like "₹25,000"
        const valueStr = metadata.value.toString().replace(/[₹,]/g, '');
        const value = parseInt(valueStr) || 0;
        return sum + value;
      }
      return sum;
    }, 0);

    // Format resources for response
    const formattedResources = Object.keys(resourcesByModule)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(moduleOrder => ({
        moduleOrder: parseInt(moduleOrder),
        moduleTitle: resourcesByModule[moduleOrder].moduleTitle,
        resources: resourcesByModule[moduleOrder].resources
      }));

    return NextResponse.json({
      hasAccess: true,
      daysRemaining: access.daysRemaining || 0,
      totalResources: allResources.length,
      totalValue: `₹${totalValue.toLocaleString()}`,
      resourcesByModule: formattedResources,
      allResources
    });

  } catch (error) {
    logger.error('Error in P7 resources API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}