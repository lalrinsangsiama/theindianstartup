import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

    // Get user's active purchases
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select(`
        id,
        productId,
        product:Product!inner(
          id,
          code,
          title,
          description
        )
      `)
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString()) as {
        data: Array<{
          id: string;
          productId: string;
          product: {
            id: string;
            code: string;
            title: string;
            description: string;
          };
        }> | null;
        error: any;
      };

    if (purchaseError) {
      console.error('Error fetching purchases:', purchaseError);
      return NextResponse.json({
        error: 'Failed to fetch purchases'
      }, { status: 500 });
    }

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({
        resources: [],
        resourcesByProduct: {},
        totalResources: 0,
        products: [],
        resourceTypes: [],
        tags: [],
        hasAllAccess: false
      });
    }

    // Check if user has ALL_ACCESS bundle
    const hasAllAccess = purchases.some(p => p.product?.code === 'ALL_ACCESS');

    let productIds: string[] = [];

    if (hasAllAccess) {
      // If user has ALL_ACCESS, get all products
      const { data: allProducts } = await supabase
        .from('Product')
        .select('id')
        .eq('isActive', true)
        .neq('code', 'ALL_ACCESS');
      
      if (allProducts) {
        productIds = allProducts.map(p => p.id);
      }
    } else {
      // Otherwise, extract product IDs from purchases
      productIds = purchases
        .map(p => p.product?.id)
        .filter((id): id is string => !!id);
    }

    // Remove duplicates
    productIds = [...new Set(productIds)];

    // If no product IDs, return empty
    if (productIds.length === 0) {
      return NextResponse.json({
        resources: [],
        resourcesByProduct: {},
        totalResources: 0,
        products: [],
        resourceTypes: [],
        tags: [],
        hasAllAccess
      });
    }

    // Get all modules for purchased products
    const { data: modules, error: modulesError } = await supabase
      .from('Module')
      .select(`
        id,
        title,
        description,
        productId,
        product:Product!inner(
          code,
          title
        ),
        resources:Resource(
          id,
          title,
          description,
          type,
          url,
          fileUrl,
          tags,
          isDownloadable
        )
      `)
      .in('productId', productIds)
      .order('order', { ascending: true }) as {
        data: Array<{
          id: string;
          title: string;
          description: string;
          productId: string;
          product: {
            code: string;
            title: string;
          };
          resources: Array<{
            id: string;
            title: string;
            description: string;
            type: string;
            url: string;
            fileUrl: string;
            tags: string[];
            isDownloadable: boolean;
          }> | null;
        }> | null;
        error: any;
      };

    if (modulesError) {
      console.error('Error fetching modules:', modulesError);
      return NextResponse.json({
        error: 'Failed to fetch resources'
      }, { status: 500 });
    }

    // Get lesson resources (from the resources JSON field in lessons)
    const { data: lessons, error: lessonsError } = await supabase
      .from('Lesson')
      .select(`
        id,
        title,
        resources,
        moduleId,
        module:Module!inner(
          id,
          title,
          productId,
          product:Product(
            code,
            title
          )
        )
      `)
      .in('module.productId', productIds) as {
        data: Array<{
          id: string;
          title: string;
          resources: any;
          moduleId: string;
          module: {
            id: string;
            title: string;
            productId: string;
            product: {
              code: string;
              title: string;
            };
          };
        }> | null;
        error: any;
      };

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
    }

    // Aggregate all resources
    const allResources: any[] = [];
    const resourcesByProduct: Record<string, any[]> = {};

    // Add module resources
    modules?.forEach(module => {
      // Skip if no product info
      if (!module.product) return;
      
      const productCode = module.product.code;
      const productTitle = module.product.title;

      if (!resourcesByProduct[productCode]) {
        resourcesByProduct[productCode] = [];
      }

      module.resources?.forEach(resource => {
        const enrichedResource = {
          ...resource,
          moduleTitle: module.title,
          moduleId: module.id,
          productCode,
          productTitle,
          source: 'module' as const
        };
        allResources.push(enrichedResource);
        resourcesByProduct[productCode].push(enrichedResource);
      });
    });

    // Add lesson resources
    lessons?.forEach(lesson => {
      if (lesson.resources && Array.isArray(lesson.resources) && lesson.module?.product) {
        const productCode = lesson.module.product.code;
        const productTitle = lesson.module.product.title;

        if (!resourcesByProduct[productCode]) {
          resourcesByProduct[productCode] = [];
        }

        lesson.resources.forEach((resource: any, index: number) => {
          const enrichedResource = {
            id: `lesson-${lesson.id}-${index}`,
            title: typeof resource === 'string' ? resource : (resource.title || 'Resource'),
            description: typeof resource === 'string' ? '' : (resource.description || ''),
            type: typeof resource === 'string' ? 'guide' : (resource.type || 'guide'),
            url: typeof resource === 'string' ? '' : (resource.url || ''),
            fileUrl: typeof resource === 'string' ? '' : (resource.fileUrl || ''),
            tags: typeof resource === 'string' ? [] : (resource.tags || []),
            isDownloadable: typeof resource === 'string' ? false : (resource.isDownloadable || false),
            lessonTitle: lesson.title,
            moduleTitle: lesson.module?.title || '',
            moduleId: lesson.module?.id || '',
            productCode,
            productTitle,
            source: 'lesson' as const
          };
          allResources.push(enrichedResource);
          resourcesByProduct[productCode].push(enrichedResource);
        });
      }
    });

    // Get unique resource types
    const resourceTypes = [...new Set(allResources.map(r => r.type))];

    // Get all unique tags
    const allTags = [...new Set(allResources.flatMap(r => r.tags || []))];

    // Build products array based on what resources we have
    const productsWithResources = Object.keys(resourcesByProduct)
      .filter(code => code && resourcesByProduct[code].length > 0)
      .map(code => {
        // Find the product title from modules or purchases
        const purchase = purchases.find(p => p.product?.code === code);
        const moduleWithProduct = modules?.find(m => m.product?.code === code);
        
        return {
          code,
          title: purchase?.product?.title || moduleWithProduct?.product?.title || code,
          resourceCount: resourcesByProduct[code].length
        };
      })
      .sort((a, b) => a.code.localeCompare(b.code));

    return NextResponse.json({
      resources: allResources,
      resourcesByProduct,
      totalResources: allResources.length,
      products: productsWithResources,
      resourceTypes,
      tags: allTags,
      hasAllAccess
    });

  } catch (error) {
    console.error('Resources API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}