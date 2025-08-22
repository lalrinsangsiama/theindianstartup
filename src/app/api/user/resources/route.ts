import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
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
      logger.error('Error fetching purchases:', purchaseError);
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
      logger.error('Error fetching modules:', modulesError);
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
      logger.error('Error fetching lessons:', lessonsError);
    }

    // Add professional downloadable templates (always available)
    const professionalTemplates = [
      {
        id: 'template-business-model-canvas',
        title: 'Business Model Canvas - Professional',
        description: 'A3 landscape canvas with guided sections and examples, perfect for strategic planning and investor presentations.',
        type: 'template',
        url: '/templates/downloads/pdf/business-model-canvas-professional.html',
        fileUrl: '/templates/downloads/pdf/business-model-canvas-professional.html',
        tags: ['business-model', 'strategy', 'planning', 'pdf'],
        isDownloadable: true,
        format: 'PDF',
        category: 'Business Planning',
        source: 'template' as const,
        productCode: 'TEMPLATES',
        productTitle: 'Professional Templates'
      },
      {
        id: 'template-financial-projections',
        title: '5-Year Financial Projections Template',
        description: 'Comprehensive financial model with P&L, cash flow, key metrics, and assumption documentation.',
        type: 'template',
        url: '/templates/downloads/pdf/financial-projections-template.html',
        fileUrl: '/templates/downloads/pdf/financial-projections-template.html',
        tags: ['financial', 'projections', 'modeling', 'pdf'],
        isDownloadable: true,
        format: 'PDF',
        category: 'Financial Planning',
        source: 'template' as const,
        productCode: 'TEMPLATES',
        productTitle: 'Professional Templates'
      },
      {
        id: 'template-financial-model-excel',
        title: 'Startup Financial Model - Excel',
        description: 'Excel-ready financial model with automated calculations, charts, and scenario analysis for startups.',
        type: 'template',
        url: '/templates/downloads/excel/startup-financial-model.csv',
        fileUrl: '/templates/downloads/excel/startup-financial-model.csv',
        tags: ['financial', 'modeling', 'excel', 'calculations'],
        isDownloadable: true,
        format: 'Excel/CSV',
        category: 'Financial Planning',
        source: 'template' as const,
        productCode: 'TEMPLATES',
        productTitle: 'Professional Templates'
      },
      {
        id: 'template-fundraising-tracker',
        title: 'Fundraising Tracker - Excel',
        description: 'Complete investor pipeline management with due diligence checklist, term sheet comparison, and meeting tracker.',
        type: 'template',
        url: '/templates/downloads/excel/fundraising-tracker.csv',
        fileUrl: '/templates/downloads/excel/fundraising-tracker.csv',
        tags: ['fundraising', 'investors', 'tracking', 'excel'],
        isDownloadable: true,
        format: 'Excel/CSV',
        category: 'Fundraising',
        source: 'template' as const,
        productCode: 'TEMPLATES',
        productTitle: 'Professional Templates'
      },
      {
        id: 'template-founders-agreement',
        title: 'Founders Agreement Template',
        description: 'Comprehensive co-founder agreement with equity split, vesting schedules, IP assignment, and exit clauses.',
        type: 'template',
        url: '/templates/downloads/word/founders-agreement-template.html',
        fileUrl: '/templates/downloads/word/founders-agreement-template.html',
        tags: ['legal', 'founders', 'agreement', 'equity'],
        isDownloadable: true,
        format: 'Word/HTML',
        category: 'Legal Documents',
        source: 'template' as const,
        productCode: 'TEMPLATES',
        productTitle: 'Professional Templates'
      },
      {
        id: 'template-employment-contract',
        title: 'Employment Contract Template',
        description: 'Indian labor law compliant employment agreement with compensation structure, benefits, and confidentiality clauses.',
        type: 'template',
        url: '/templates/downloads/word/employment-contract-template.html',
        fileUrl: '/templates/downloads/word/employment-contract-template.html',
        tags: ['legal', 'employment', 'hr', 'contract'],
        isDownloadable: true,
        format: 'Word/HTML',
        category: 'HR & Legal',
        source: 'template' as const,
        productCode: 'TEMPLATES',
        productTitle: 'Professional Templates'
      }
    ];

    // Aggregate all resources
    const allResources: any[] = [...professionalTemplates];
    const resourcesByProduct: Record<string, any[]> = {
      'TEMPLATES': [...professionalTemplates]
    };

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
    logger.error('Resources API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}