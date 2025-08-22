import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
      .from('products')
      .select(`
        *,
        modules (
          id,
          title,
          description,
          order_index,
          lessons (
            id,
            day,
            title,
            brief_content,
            estimated_time,
            xp_reward,
            order_index
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
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    const hasAccess = !!purchase;

    // Get user progress
    let userProgress = null;
    if (hasAccess) {
      const { data: progress } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .in('lesson_id', product.modules.flatMap((m: any) => m.lessons.map((l: any) => l.id)));

      const completedLessons = progress?.filter(p => p.completed) || [];
      const totalLessons = product.modules.reduce((total: number, module: any) => total + module.lessons.length, 0);

      userProgress = {
        completedLessons: completedLessons.length,
        totalLessons,
        progressPercentage: Math.round((completedLessons.length / totalLessons) * 100),
        totalXP: completedLessons.reduce((total: number, lesson: any) => total + (lesson.xp_earned || 0), 0),
        lastActivity: completedLessons.length > 0 ? 
          Math.max(...completedLessons.map((l: any) => new Date(l.completed_at).getTime())) : null
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
        purchaseDate: purchase.purchase_date,
        expiresAt: purchase.expires_at,
        productName: purchase.product_name
      } : null
    };

    return NextResponse.json(courseData);

  } catch (error) {
    console.error('Error fetching P2 course data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'update_preferences':
        // Update user learning preferences for P2
        const { data: updated, error } = await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            product_code: 'P2',
            preferences: data,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
        return NextResponse.json({ success: true });

      case 'track_engagement':
        // Track user engagement with P2 content
        const { data: engagement, error: engagementError } = await supabase
          .from('p2_xp_events')
          .insert({
            user_id: user.id,
            event_type: data.eventType,
            event_id: data.eventId,
            xp_earned: data.xpEarned || 0
          });

        if (engagementError) throw engagementError;
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error processing P2 course request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}