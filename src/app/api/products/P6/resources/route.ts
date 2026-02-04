import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P6
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P6', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied. P6 purchase required.' }, { status: 403 });
    }

    // Get P6 product and modules
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
      .eq('code', 'P6')
      .single();

    if (productError) {
      throw new Error('P6 product not found');
    }

    // Get all P6 resources
    const { data: resources, error: resourcesError } = await supabase
      .from('Resource')
      .select('*')
      .in('moduleId', product.modules?.map((m: any) => m.id) || [])
      .order('createdAt', { ascending: false });

    if (resourcesError) {
      throw new Error('Error fetching P6 resources');
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
    const totalLessonValue = lessons.reduce((total: number, lesson: any) => {
      if (lesson.resources && Array.isArray(lesson.resources)) {
        const lessonValue = lesson.resources.reduce((lessonTotal: number, resource: any) => {
          return lessonTotal + (resource.value || 0);
        }, 0);
        return total + lessonValue;
      }
      return total;
    }, 0);

    // Categorize resources
    const categorizedResources = {
      interactive_tools: resources.filter((r: any) => r.type === 'interactive_tool'),
      template_libraries: resources.filter((r: any) => r.type === 'template_library'),
      video_series: resources.filter((r: any) => r.type === 'video_series'),
      dashboards: resources.filter((r: any) => r.type === 'dashboard'),
      calculators: resources.filter((r: any) => r.type.includes('calculator')),
      playbooks: resources.filter((r: any) => r.type.includes('playbook'))
    };

    // Get interactive sales tools info
    const interactiveTools = [
      {
        id: 'sales-readiness',
        name: 'Sales Readiness Assessment',
        description: 'Comprehensive assessment tool to evaluate your sales foundation and identify improvement areas',
        url: '/sales/tools#readiness-assessment',
        value: 12000,
        status: 'active'
      },
      {
        id: 'lead-generation',
        name: 'Lead Generation Machine',
        description: 'Multi-channel lead generation tool with Indian market focus and automation capabilities',
        url: '/sales/tools#lead-generation',
        value: 25000,
        status: 'active'
      },
      {
        id: 'pipeline-manager',
        name: 'Sales Pipeline Manager',
        description: 'Advanced pipeline management system with forecasting and performance analytics',
        url: '/sales/tools#pipeline-manager',
        value: 22000,
        status: 'active'
      },
      {
        id: 'pricing-calculator',
        name: 'Pricing Strategy Calculator',
        description: 'Dynamic pricing optimization tool with Indian market analysis and competitive positioning',
        url: '/sales/tools#pricing-calculator',
        value: 18000,
        status: 'active'
      },
      {
        id: 'customer-success',
        name: 'Customer Success Dashboard',
        description: 'Comprehensive customer health tracking and success management platform',
        url: '/sales/tools#customer-success',
        value: 20000,
        status: 'active'
      },
      {
        id: 'analytics-suite',
        name: 'Sales Analytics Suite',
        description: 'Advanced sales analytics with AI-powered insights and revenue forecasting',
        url: '/sales/tools#analytics-suite',
        value: 35000,
        status: 'active'
      }
    ];

    // Template library info
    const templateLibrary = {
      name: 'Complete P6 Sales Template Library',
      description: '200+ professional sales templates worth ₹2,50,000+ covering all aspects of Indian sales operations',
      url: '/sales/templates',
      totalTemplates: 200,
      categories: [
        'Cold Outreach Scripts (50 variations)',
        'Sales Playbooks & Processes (25 documents)', 
        'Pricing Models & Strategies (15 templates)',
        'Customer Onboarding Materials (20 documents)',
        'Team Training & Management (30 resources)',
        'Analytics & Reporting Templates (25 dashboards)',
        'Channel Partner Materials (20 documents)',
        'Customer Success Templates (15 documents)'
      ],
      totalValue: 250000,
      formats: ['PDF', 'DOCX', 'PPTX', 'XLSX', 'HTML'],
      access: 'immediate_download'
    };

    return NextResponse.json({
      success: true,
      product: {
        code: product.code,
        title: product.title,
        totalValue: '₹5,00,000+',
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
        lessonsWithResources: lessons.filter((l: any) => l.resources && Array.isArray(l.resources) && l.resources.length > 0).length,
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
      }
    });

  } catch (error) {
    logger.error('Error fetching P6 resources:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}