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
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get all P2 lessons
    const { data: product } = await supabase
      .from('Product')
      .select(`
        modules:Module (
          id,
          title,
          orderIndex,
          lessons:Lesson (
            id,
            day,
            title,
            xpReward,
            estimatedTime
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
        moduleOrder: module.orderIndex
      }))
    );

    const { data: progress } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('userId', user.id)
      .in('lessonId', allLessons.map(l => l.id));

    // Get user's XP events for P2
    const { data: xpEvents } = await supabase
      .from('XPEvent')
      .select('*')
      .eq('userId', user.id)
      .order('createdAt', { ascending: false });

    // Get completion stats from LessonProgress
    const { data: completions } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('completed', true);

    // Calculate progress statistics
    const completedLessons = progress?.filter(p => p.completed) || [];
    const totalLessons = allLessons.length;
    const totalXP = xpEvents?.reduce((sum, event) => sum + event.points, 0) || 0;
    const totalTimeSpent = completions?.reduce((sum, comp) => sum + (comp.estimatedTime || 0), 0) || 0;

    // Module progress breakdown
    const moduleProgress = product.modules.map((module: any) => {
      const moduleLessons = module.lessons;
      const moduleCompleted = progress?.filter(p =>
        p.completed && moduleLessons.some((l: any) => l.id === p.lessonId)
      ) || [];

      return {
        moduleId: module.id,
        title: module.title,
        order: module.orderIndex,
        totalLessons: moduleLessons.length,
        completedLessons: moduleCompleted.length,
        progressPercentage: Math.round((moduleCompleted.length / moduleLessons.length) * 100),
        isCompleted: moduleCompleted.length === moduleLessons.length,
        lastActivity: moduleCompleted.length > 0 ?
          Math.max(...moduleCompleted.map(l => new Date(l.completedAt).getTime())) : null
      };
    });

    // Recent activity
    const recentActivity = progress
      ?.filter(p => p.completedAt)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 10)
      .map(p => {
        const lesson = allLessons.find(l => l.id === p.lessonId);
        return {
          lessonId: p.lessonId,
          lessonTitle: lesson?.title,
          day: lesson?.day,
          moduleTitle: lesson?.moduleTitle,
          completedAt: p.completedAt,
          xpEarned: p.xpEarned,
          timeSpent: lesson?.estimatedTime
        };
      }) || [];

    // Learning streak calculation
    const completionDates = completedLessons
      .map(l => new Date(l.completedAt).toDateString())
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
      .filter(lesson => !progress?.some(p => p.lessonId === lesson.id && p.completed))
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
        estimatedTime: nextLesson.estimatedTime,
        xpReward: nextLesson.xpReward
      } : null,
      achievements: {
        totalTemplatesDownloaded: 0, // Will be calculated from p2_templates usage
        totalToolsUsed: 0, // Will be calculated from p2_tools usage
        portfolioActivitiesCompleted: 0 // Will be calculated from portfolio activities
      },
      timeline: {
        startDate: purchase.purchaseDate,
        expectedCompletion: null, // Calculate based on pace
        daysActive: completionDates.length,
        averageLessonsPerWeek: completionDates.length > 0 ?
          (completedLessons.length / Math.max(1, Math.ceil((Date.now() - new Date(purchase.purchaseDate).getTime()) / (7 * 24 * 60 * 60 * 1000)))) : 0
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
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { lessonId, action, data } = body;

    if (action === 'complete') {
      // Get lesson info
      const { data: lesson } = await supabase
        .from('Lesson')
        .select('*, module:Module(id, product:Product(code))')
        .eq('id', lessonId)
        .single();

      if (!lesson || lesson.module.product.code !== 'P2') {
        return NextResponse.json({ error: 'Invalid lesson' }, { status: 400 });
      }

      // Mark lesson as completed
      const { error: progressError } = await supabase
        .from('LessonProgress')
        .upsert({
          userId: user.id,
          lessonId: lessonId,
          purchaseId: purchase.id,
          completed: true,
          completedAt: new Date().toISOString(),
          xpEarned: lesson.xpReward || 100,
          updatedAt: new Date().toISOString()
        });

      if (progressError) throw progressError;

      // Award XP
      const { error: xpError } = await supabase
        .from('XPEvent')
        .insert({
          userId: user.id,
          type: 'lesson_complete',
          points: lesson.xpReward || 100,
          description: `Completed lesson: ${lesson.title}`,
          metadata: { lessonId, productCode: 'P2' }
        });

      if (xpError) throw xpError;

      return NextResponse.json({
        success: true,
        xpEarned: lesson.xpReward || 100
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error updating P2 progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}