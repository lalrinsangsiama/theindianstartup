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

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get all P2 lessons
    const { data: product } = await supabase
      .from('products')
      .select(`
        modules (
          id,
          title,
          order_index,
          lessons (
            id,
            day,
            title,
            xp_reward,
            estimated_time
          )
        )
      `)
      .eq('code', 'P2')
      .single();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get user's lesson progress
    const allLessons = product.modules.flatMap((module: any) => 
      module.lessons.map((lesson: any) => ({
        ...lesson,
        moduleId: module.id,
        moduleTitle: module.title,
        moduleOrder: module.order_index
      }))
    );

    const { data: progress } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id)
      .in('lesson_id', allLessons.map(l => l.id));

    // Get user's XP events for P2
    const { data: xpEvents } = await supabase
      .from('p2_xp_events')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    // Get completion stats from P2 completions table
    const { data: completions } = await supabase
      .from('p2_completions')
      .select('*')
      .eq('user_id', user.id);

    // Calculate progress statistics
    const completedLessons = progress?.filter(p => p.completed) || [];
    const totalLessons = allLessons.length;
    const totalXP = xpEvents?.reduce((sum, event) => sum + event.xp_earned, 0) || 0;
    const totalTimeSpent = completions?.reduce((sum, comp) => sum + (comp.time_spent || 0), 0) || 0;

    // Module progress breakdown
    const moduleProgress = product.modules.map((module: any) => {
      const moduleLessons = module.lessons;
      const moduleCompleted = progress?.filter(p => 
        p.completed && moduleLessons.some((l: any) => l.id === p.lesson_id)
      ) || [];

      return {
        moduleId: module.id,
        title: module.title,
        order: module.order_index,
        totalLessons: moduleLessons.length,
        completedLessons: moduleCompleted.length,
        progressPercentage: Math.round((moduleCompleted.length / moduleLessons.length) * 100),
        isCompleted: moduleCompleted.length === moduleLessons.length,
        lastActivity: moduleCompleted.length > 0 ? 
          Math.max(...moduleCompleted.map(l => new Date(l.completed_at).getTime())) : null
      };
    });

    // Recent activity
    const recentActivity = progress
      ?.filter(p => p.completed_at)
      .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
      .slice(0, 10)
      .map(p => {
        const lesson = allLessons.find(l => l.id === p.lesson_id);
        return {
          lessonId: p.lesson_id,
          lessonTitle: lesson?.title,
          day: lesson?.day,
          moduleTitle: lesson?.moduleTitle,
          completedAt: p.completed_at,
          xpEarned: p.xp_earned,
          timeSpent: p.time_spent || lesson?.estimated_time
        };
      }) || [];

    // Learning streak calculation
    const completionDates = completedLessons
      .map(l => new Date(l.completed_at).toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort();

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < completionDates.length; i++) {
      const currentDate = new Date(completionDates[i]);
      const prevDate = i > 0 ? new Date(completionDates[i - 1]) : null;
      
      if (prevDate && currentDate.getTime() - prevDate.getTime() === 24 * 60 * 60 * 1000) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
      
      longestStreak = Math.max(longestStreak, tempStreak);
      
      // Check if current streak is ongoing
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      if (completionDates[completionDates.length - 1] === today || 
          completionDates[completionDates.length - 1] === yesterday) {
        currentStreak = tempStreak;
      }
    }

    // Next recommendations
    const nextLesson = allLessons
      .filter(lesson => !progress?.some(p => p.lesson_id === lesson.id && p.completed))
      .sort((a, b) => a.day - b.day)[0];

    const progressData = {
      overall: {
        completedLessons: completedLessons.length,
        totalLessons,
        progressPercentage: Math.round((completedLessons.length / totalLessons) * 100),
        totalXP,
        totalTimeSpent: Math.round(totalTimeSpent / 60), // in hours
        currentStreak,
        longestStreak,
        isCompleted: completedLessons.length === totalLessons
      },
      modules: moduleProgress,
      recentActivity,
      nextRecommendation: nextLesson ? {
        lessonId: nextLesson.id,
        title: nextLesson.title,
        day: nextLesson.day,
        moduleTitle: nextLesson.moduleTitle,
        estimatedTime: nextLesson.estimated_time,
        xpReward: nextLesson.xp_reward
      } : null,
      achievements: {
        totalTemplatesDownloaded: 0, // Will be calculated from p2_templates usage
        totalToolsUsed: 0, // Will be calculated from p2_tools usage
        portfolioActivitiesCompleted: 0 // Will be calculated from portfolio activities
      },
      timeline: {
        startDate: purchase.purchase_date,
        expectedCompletion: null, // Calculate based on pace
        daysActive: completionDates.length,
        averageLessonsPerWeek: completionDates.length > 0 ? 
          (completedLessons.length / Math.max(1, Math.ceil((Date.now() - new Date(purchase.purchase_date).getTime()) / (7 * 24 * 60 * 60 * 1000)))) : 0
      }
    };

    return NextResponse.json(progressData);

  } catch (error) {
    console.error('Error fetching P2 progress:', error);
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

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { lessonId, action, data } = body;

    if (action === 'complete') {
      // Get lesson info
      const { data: lesson } = await supabase
        .from('lessons')
        .select('*, module:modules(id, product:products(code))')
        .eq('id', lessonId)
        .single();

      if (!lesson || lesson.module.product.code !== 'P2') {
        return NextResponse.json({ error: 'Invalid lesson' }, { status: 400 });
      }

      // Mark lesson as completed
      const { error: progressError } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          purchase_id: purchase.id,
          completed: true,
          completed_at: new Date().toISOString(),
          xp_earned: lesson.xp_reward || 100,
          updated_at: new Date().toISOString()
        });

      if (progressError) throw progressError;

      // Add to P2 completions table
      const { error: completionError } = await supabase
        .from('p2_completions')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          module_id: lesson.module_id,
          completed_at: new Date().toISOString(),
          time_spent: data?.timeSpent || lesson.estimated_time,
          score: data?.score || null,
          notes: data?.notes || null
        });

      if (completionError) throw completionError;

      // Award XP
      const { error: xpError } = await supabase
        .from('p2_xp_events')
        .insert({
          user_id: user.id,
          event_type: 'lesson_complete',
          event_id: lessonId,
          xp_earned: lesson.xp_reward || 100
        });

      if (xpError) throw xpError;

      return NextResponse.json({ 
        success: true, 
        xpEarned: lesson.xp_reward || 100 
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error updating P2 progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}