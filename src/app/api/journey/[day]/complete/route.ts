import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkStreakBonus, checkMilestoneBonus } from '@/lib/xp';

export const dynamic = 'force-dynamic';

// POST - Mark daily lesson as complete
export async function POST(
  request: NextRequest,
  { params }: { params: { day: string } }
) {
  try {
    const day = parseInt(params.day);
    const { tasksCompleted, reflection } = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's current progress
    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('current_day, current_streak, longest_streak, started_at')
      .eq('id', user.id)
      .single();

    if (userDataError || !userData) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    // Check if user can complete this day
    if (day > userData.current_day + 1) {
      return NextResponse.json(
        { error: 'Cannot skip ahead in the journey' },
        { status: 400 }
      );
    }

    // Check if already completed
    const { data: existingProgress } = await supabase
      .from('daily_progress')
      .select('id, completed_at')
      .eq('user_id', user.id)
      .eq('day', day)
      .single();

    if (existingProgress?.completed_at) {
      return NextResponse.json(
        { error: 'Day already completed' },
        { status: 400 }
      );
    }

    // Calculate streak
    let newStreak = userData.current_streak || 0;
    const lastCompletedDay = userData.current_day || 0;
    
    // Check if this maintains the streak (completing next day or same day)
    if (day === lastCompletedDay + 1 || (day === 1 && lastCompletedDay === 0)) {
      // Check if last completion was within 24 hours for streak
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // For simplicity, we'll just increment streak for sequential days
      newStreak = (userData.current_streak || 0) + 1;
    } else if (day <= lastCompletedDay) {
      // Completing a previous day doesn't affect streak
      newStreak = userData.current_streak || 0;
    } else {
      // Streak broken
      newStreak = 1;
    }

    const longestStreak = Math.max(newStreak, userData.longest_streak || 0);

    // Create or update daily progress
    const progressData = {
      user_id: user.id,
      day,
      started_at: existingProgress ? undefined : new Date().toISOString(),
      completed_at: new Date().toISOString(),
      tasks_completed: tasksCompleted || [],
      reflection: reflection || null,
      xp_earned: 20, // Base XP for completing a day
    };

    let dailyProgress;
    if (existingProgress) {
      const { data, error } = await supabase
        .from('daily_progress')
        .update(progressData)
        .eq('id', existingProgress.id)
        .select()
        .single();
      
      if (error) throw error;
      dailyProgress = data;
    } else {
      const { data, error } = await supabase
        .from('daily_progress')
        .insert(progressData)
        .select()
        .single();
      
      if (error) throw error;
      dailyProgress = data;
    }

    // Update user progress
    const updateData: any = {
      current_streak: newStreak,
      longest_streak: longestStreak,
    };

    // Only update current_day if this is a new day
    if (day > userData.current_day) {
      updateData.current_day = day;
    }

    // Set started_at if this is day 1
    if (day === 1 && !userData.started_at) {
      updateData.started_at = new Date().toISOString();
    }

    // Set completed_at if this is day 30
    if (day === 30) {
      updateData.completed_at = new Date().toISOString();
    }

    const { error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating user progress:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user progress' },
        { status: 500 }
      );
    }

    // Award XP for completing the day
    const xpEvents = [];
    
    // Base XP for daily completion
    xpEvents.push({
      type: 'DAILY_LESSON_COMPLETE',
      metadata: { day },
    });

    // Check for all tasks completed
    if (tasksCompleted && tasksCompleted.length >= 3) {
      xpEvents.push({
        type: 'ALL_TASKS_COMPLETE',
        metadata: { day },
      });
    }

    // Check for reflection completion
    if (reflection) {
      xpEvents.push({
        type: 'EVENING_REFLECTION',
        metadata: { day },
      });
    }

    // Check for streak bonus
    const streakBonus = checkStreakBonus(newStreak);
    if (streakBonus) {
      xpEvents.push({
        type: streakBonus,
        metadata: { streak: newStreak },
      });
    }

    // Check for milestone bonus
    const milestoneBonus = checkMilestoneBonus(day);
    if (milestoneBonus) {
      xpEvents.push({
        type: milestoneBonus,
        metadata: { day },
      });
    }

    // Award all XP events
    const xpResults = [];
    for (const event of xpEvents) {
      try {
        const response = await fetch(`${request.nextUrl.origin}/api/xp/award`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || '',
          },
          body: JSON.stringify({
            eventType: event.type,
            metadata: event.metadata,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          xpResults.push(result);
        }
      } catch (error) {
        console.error('Error awarding XP:', error);
      }
    }

    // Calculate total XP earned
    const totalXPEarned = xpResults.reduce((sum, result) => 
      sum + (result.xp?.points || 0) + (result.xp?.bonusXP || 0), 0
    );

    // Collect all unlocked badges
    const unlockedBadges = xpResults.flatMap(result => 
      result.badges?.unlocked || []
    );

    return NextResponse.json({
      success: true,
      progress: {
        day,
        currentStreak: newStreak,
        longestStreak,
        currentDay: Math.max(day, userData.current_day || 1),
      },
      xp: {
        earned: totalXPEarned,
        events: xpEvents.map(e => e.type),
      },
      badges: {
        unlocked: unlockedBadges,
      },
    });

  } catch (error) {
    console.error('Complete day error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}