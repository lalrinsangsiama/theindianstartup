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

    // Check if user has access to P8
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P8', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied. P8 purchase required.' }, { status: 403 });
    }

    // Get P8 product and modules
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
      .eq('code', 'P8')
      .single();

    if (productError) {
      throw new Error('P8 product not found');
    }

    // Get all P8 resources
    const { data: resources, error: resourcesError } = await supabase
      .from('Resource')
      .select('*')
      .in('moduleId', product.modules?.map((m: any) => m.id) || [])
      .order('createdAt', { ascending: false });

    if (resourcesError) {
      throw new Error('Error fetching P8 resources');
    }

    // Get lessons with comprehensive resource data
    const { data: lessons, error: lessonsError } = await supabase
      .from('Lesson')
      .select('id, day, title, resources, metadata')
      .in('moduleId', product.modules?.map((m: any) => m.id) || [])
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
      dashboards: resources.filter(r => r.type === 'dashboard'),
      frameworks: resources.filter(r => r.type === 'framework'),
      guides: resources.filter(r => r.type.includes('guide'))
    };

    // Get interactive data room tools info
    const interactiveTools = [
      {
        id: 'data-room-architecture',
        name: 'Data Room Architecture Tool',
        description: 'Professional data room structure designer with investor-grade organization and security features',
        url: '/dataroom/tools#architecture',
        value: 25000,
        status: 'active'
      },
      {
        id: 'financial-model-builder',
        name: 'Advanced Financial Model Builder',
        description: 'Comprehensive financial modeling tool with scenario analysis and investor-ready projections',
        url: '/dataroom/tools#financial-model',
        value: 35000,
        status: 'active'
      },
      {
        id: 'cap-table-manager',
        name: 'Cap Table Management System',
        description: 'Professional cap table management with equity tracking, vesting schedules, and dilution modeling',
        url: '/dataroom/tools#cap-table',
        value: 30000,
        status: 'active'
      },
      {
        id: 'dd-qa-generator',
        name: 'Due Diligence Q&A Generator',
        description: 'Comprehensive Q&A preparation tool with industry-specific questions and expert answers',
        url: '/dataroom/tools#dd-qa',
        value: 30000,
        status: 'active'
      },
      {
        id: 'team-analytics',
        name: 'Team Analytics Dashboard',
        description: 'Advanced team performance analytics with investor reporting and organizational insights',
        url: '/dataroom/tools#team-analytics',
        value: 22000,
        status: 'active'
      },
      {
        id: 'customer-analytics',
        name: 'Customer Analytics Engine',
        description: 'Comprehensive customer analytics with cohort analysis, LTV calculations, and churn prediction',
        url: '/dataroom/tools#customer-analytics',
        value: 28000,
        status: 'active'
      },
      {
        id: 'analytics-suite',
        name: 'Data Room Analytics Suite',
        description: 'Complete analytics dashboard for data room performance, investor engagement, and KPI tracking',
        url: '/dataroom/analytics',
        value: 48000,
        status: 'active'
      }
    ];

    // Template library info
    const templateLibrary = {
      name: 'Complete P8 Data Room Template Library',
      description: '300+ professional data room templates worth ₹4,00,000+ covering all aspects of investor-ready documentation',
      url: '/dataroom/templates',
      totalTemplates: 300,
      categories: [
        'Legal Documentation Suite (80 documents)',
        'Financial Models & Reports (40 templates)', 
        'Business Strategy & Operations (35 documents)',
        'HR & Team Documentation (25 templates)',
        'Customer & Revenue Analytics (30 reports)',
        'Due Diligence Materials (40 documents)',
        'Compliance & Regulatory (25 templates)',
        'Exit Strategy & IPO Preparation (15 documents)',
        'Investor Relations Materials (20 templates)',
        'Advanced Sector-Specific Templates (30 documents)'
      ],
      totalValue: 400000,
      formats: ['PDF', 'DOCX', 'PPTX', 'XLSX', 'AI', 'PSD', 'Figma'],
      access: 'immediate_download'
    };

    return NextResponse.json({
      success: true,
      product: {
        code: product.code,
        title: product.title,
        totalValue: '₹10,00,000+',
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
        resourcesPerLesson: lessons.map((lesson: any) => ({
          day: lesson.day,
          title: lesson.title,
          resourceCount: lesson.resources ? lesson.resources.length : 0,
          resourceValue: lesson.resources ?
            lesson.resources.reduce((sum: number, r: any) => sum + (r.value || 0), 0) : 0,
          hasInteractiveTools: lesson.resources ?
            lesson.resources.some((r: any) => r.type === 'interactive_tool') : false
        }))
      },
      accessInfo: {
        hasAccess: true,
        purchaseDate: purchases[0].createdAt,
        expiresAt: purchases[0].expiresAt,
        daysRemaining: Math.ceil((new Date(purchases[0].expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      },
      expertContent: {
        vcMasterclasses: 15,
        cfoInsights: 12,
        investmentBankerSessions: 8,
        totalVideoHours: 15,
        expertValue: 150000
      }
    });

  } catch (error) {
    console.error('Error fetching P8 resources:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}