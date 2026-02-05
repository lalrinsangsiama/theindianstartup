import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get P2 product data
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select(`
        *,
        modules:Module (
          id,
          title,
          description,
          orderIndex,
          lessons:Lesson (
            id,
            day,
            title,
            briefContent,
            estimatedTime,
            xpReward,
            orderIndex
          )
        )
      `)
      .eq('code', 'P2')
      .single();

    if (productError) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check user access
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    const hasAccess = !!purchase;

    // Get user progress
    let userProgress = null;
    if (hasAccess) {
      const { data: progress } = await supabase
        .from('LessonProgress')
        .select('*')
        .eq('userId', user.id)
        .in('lessonId', product.modules.flatMap((m: any) => m.lessons.map((l: any) => l.id)));

      const completedLessons = progress?.filter(p => p.completed) || [];
      const totalLessons = product.modules.reduce((total: number, module: any) => total + module.lessons.length, 0);

      userProgress = {
        completedLessons: completedLessons.length,
        totalLessons,
        progressPercentage: Math.round((completedLessons.length / totalLessons) * 100),
        totalXP: completedLessons.reduce((total: number, lesson: any) => total + (lesson.xpEarned || 0), 0),
        lastActivity: completedLessons.length > 0 ?
          Math.max(...completedLessons.map((l: any) => new Date(l.completedAt).getTime())) : null
      };
    }

    // Get P2 tools and templates count
    const { data: tools } = await supabase
      .from('p2_tools')
      .select('id')
      .eq('is_active', true);

    const { data: templates } = await supabase
      .from('p2_templates')
      .select('id');

    const courseData = {
      ...product,
      hasAccess,
      userProgress,
      toolsCount: tools?.length || 0,
      templatesCount: templates?.length || 0,
      purchaseInfo: purchase ? {
        purchaseDate: purchase.purchaseDate,
        expiresAt: purchase.expiresAt,
        productName: purchase.productName
      } : null
    };

    return NextResponse.json(courseData);

  } catch (error) {
    logger.error('Error fetching P2 course data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

const postBodySchema = z.object({
  action: z.enum(['update_preferences', 'track_engagement']),
  data: z.record(z.unknown()),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse JSON with error handling
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Validate request body
    const validation = postBodySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { action, data } = validation.data;

    switch (action) {
      case 'update_preferences':
        // Update user learning preferences for P2
        const { error } = await supabase
          .from('UserPreference')
          .upsert({
            userId: user.id,
            productCode: 'P2',
            preferences: data,
            updatedAt: new Date().toISOString()
          });

        if (error) throw error;
        return NextResponse.json({ success: true });

      case 'track_engagement':
        // Track user engagement with P2 content
        const { error: engagementError } = await supabase
          .from('XPEvent')
          .insert({
            userId: user.id,
            type: (data as { eventType?: string }).eventType,
            points: (data as { xpEarned?: number }).xpEarned || 0,
            description: `P2 engagement: ${(data as { eventType?: string }).eventType}`,
            metadata: { eventId: (data as { eventId?: string }).eventId, productCode: 'P2' }
          });

        if (engagementError) throw engagementError;
        return NextResponse.json({ success: true });

      default:
        // This should never happen due to Zod validation, but TypeScript needs it
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error processing P2 course request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}