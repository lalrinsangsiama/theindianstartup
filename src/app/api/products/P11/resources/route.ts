import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P11
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P11', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied. P11 purchase required.' }, { status: 403 });
    }

    // Get P11 product and modules
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select(`
        *,
        modules:Module(
          id,
          title,
          orderIndex,
          resources:Resource(*)
        )
      `)
      .eq('code', 'P11')
      .single();

    if (productError) {
      throw new Error('P11 product not found');
    }

    // Get all P11 resources
    const { data: resources, error: resourcesError } = await supabase
      .from('Resource')
      .select('*')
      .in('moduleId', product.modules?.map(m => m.id) || [])
      .order('createdAt', { ascending: false });

    if (resourcesError) {
      throw new Error('Error fetching P11 resources');
    }

    // Get lessons with comprehensive resource data
    const { data: lessons, error: lessonsError } = await supabase
      .from('Lesson')
      .select('id, day, title, resources, metadata')
      .in('moduleId', product.modules?.map(m => m.id) || [])
      .order('day');

    if (lessonsError) {
      throw new Error('Error fetching lesson resources');
    }

    // Calculate total resource value
    const totalLessonValue = lessons.reduce((total, lesson) => {
      if (lesson.resources && Array.isArray(lesson.resources)) {
        const lessonValue = lesson.resources.reduce((lessonTotal, resource) => {
          return lessonTotal + (resource.value || 0);
        }, 0);
        return total + lessonValue;
      }
      return total;
    }, 0);

    // Categorize resources
    const categorizedResources = {
      interactive_tools: resources.filter(r => r.type === 'interactive_tool'),
      template_libraries: resources.filter(r => r.type === 'template_library'),
      video_series: resources.filter(r => r.type === 'video_series'),
      guides: resources.filter(r => r.type.includes('guide')),
      calculators: resources.filter(r => r.type.includes('calculator')),
      databases: resources.filter(r => r.type.includes('database'))
    };

    // Get interactive tools info
    const interactiveTools = [
      {
        id: 'brand-strategy',
        name: 'Brand Strategy Calculator',
        description: 'AI-powered brand analysis with 8 key metrics and personalized recommendations',
        url: '/products/p11#brand-strategy',
        value: 15000,
        status: 'active'
      },
      {
        id: 'pr-campaigns',
        name: 'PR Campaign Manager',
        description: 'Complete PR campaign planning and media relationship tracking system',
        url: '/products/p11#pr-campaigns',
        value: 25000,
        status: 'active'
      },
      {
        id: 'brand-assets',
        name: 'Brand Asset Generator',
        description: 'Professional brand asset creation with logo builder and color tools',
        url: '/products/p11#brand-assets',
        value: 20000,
        status: 'active'
      },
      {
        id: 'media-relations',
        name: 'Media Relationship Manager',
        description: 'Comprehensive journalist database and pitch tracking CRM',
        url: '/products/p11#media-relations',
        value: 25000,
        status: 'active'
      }
    ];

    // Template library info
    const templateLibrary = {
      name: 'Complete P11 Template Library',
      description: '300+ professional brand and PR templates worth ₹1,50,000+',
      url: '/branding/templates',
      totalTemplates: 300,
      categories: [
        'Brand Identity Templates (50 documents)',
        'Public Relations Templates (75 documents)', 
        'Awards & Recognition Templates (25 documents)',
        'Digital PR & Social Media Templates (50 documents)',
        'Personal Branding Templates (40 documents)',
        'Analytics & Measurement Templates (35 documents)',
        'Specialized Industry Templates (25 documents)'
      ],
      totalValue: 150000,
      formats: ['PDF', 'DOCX', 'PPTX', 'AI', 'PSD', 'XLSX', 'Figma'],
      access: 'immediate_download'
    };

    return NextResponse.json({
      success: true,
      product: {
        code: product.code,
        title: product.title,
        totalValue: (product.metadata as any)?.total_value || '₹2,00,000+',
        modules: product.modules?.length || 0,
        lessons: lessons.length
      },
      resources: {
        total: resources.length,
        categorized: categorizedResources,
        totalValue: totalLessonValue
      },
      interactiveTools: {
        count: interactiveTools.length,
        tools: interactiveTools,
        totalValue: interactiveTools.reduce((sum, tool) => sum + tool.value, 0)
      },
      templateLibrary,
      lessons: {
        count: lessons.length,
        lessonsWithResources: lessons.filter(l => l.resources && Array.isArray(l.resources) && l.resources.length > 0).length,
        resourcesPerLesson: lessons.map(lesson => ({
          day: lesson.day,
          title: lesson.title,
          resourceCount: lesson.resources ? lesson.resources.length : 0,
          resourceValue: lesson.resources ? 
            lesson.resources.reduce((sum, r) => sum + (r.value || 0), 0) : 0,
          hasInteractiveTools: lesson.resources ? 
            lesson.resources.some(r => r.type === 'interactive_tool') : false
        }))
      },
      accessInfo: {
        hasAccess: true,
        purchaseDate: purchases[0].createdAt,
        expiresAt: purchases[0].expiresAt,
        daysRemaining: Math.ceil((new Date(purchases[0].expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      }
    });

  } catch (error) {
    console.error('Error fetching P11 resources:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}