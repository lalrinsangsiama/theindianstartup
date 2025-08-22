import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const day = searchParams.get('day');
    
    // Check user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has access to P1
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('id')
      .eq('userId', user.id)
      .in('productCode', ['P1', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json(
        { error: 'No access to P1 course' },
        { status: 403 }
      );
    }

    // Get P1 modules first
    const { data: modules, error: modulesError } = await supabase
      .from('Module')
      .select(`
        id,
        title,
        resources:Resource(
          id,
          title,
          description,
          type,
          url,
          fileUrl,
          tags,
          isDownloadable,
          metadata
        )
      `)
      .eq('productId', (
        await supabase
          .from('Product')
          .select('id')
          .eq('code', 'P1')
          .single()
      ).data?.id);

    if (modulesError || !modules) {
      console.error('Error fetching P1 modules:', modulesError);
      return NextResponse.json(
        { error: 'Failed to fetch P1 modules' },
        { status: 500 }
      );
    }

    if (day) {
      // Get resources for specific day from lesson metadata
      const { data: lesson } = await supabase
        .from('Lesson')
        .select(`
          resources,
          module:Module!inner(
            product:Product!inner(code)
          )
        `)
        .eq('day', parseInt(day))
        .eq('module.product.code', 'P1')
        .single();

      if (lesson?.resources) {
        return NextResponse.json({
          resources: lesson.resources,
          day: parseInt(day)
        });
      }
    }

    // Flatten all resources from modules
    let allResources: any[] = [];
    modules.forEach(module => {
      if (module.resources) {
        module.resources.forEach((resource: any) => {
          allResources.push({
            ...resource,
            moduleTitle: module.title
          });
        });
      }
    });

    // Filter by type if provided
    if (type) {
      allResources = allResources.filter(r => r.type === type);
    }

    return NextResponse.json({
      resources: allResources,
      types: {
        templates: allResources.filter(r => r.type === 'template').length,
        tools: allResources.filter(r => r.type === 'tool').length,
        guides: allResources.filter(r => r.type === 'guide').length,
        total: allResources.length
      }
    });
  } catch (error) {
    console.error('Resources error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}