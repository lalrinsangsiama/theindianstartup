import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { day: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dayNumber = parseInt(params.day);
    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 30) {
      return NextResponse.json(
        { error: 'Invalid day number' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { tasks, completedAt } = body;

    if (!tasks || !completedAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Calculate XP earned
    const xpEarned = tasks
      .filter((task: any) => task.completed)
      .reduce((sum: number, task: any) => sum + (task.xp || 0), 0);

    // Get completed task IDs
    const completedTaskIds = tasks
      .filter((task: any) => task.completed)
      .map((task: any) => task.id);

    // Check if progress record exists
    let { data: progress, error: progressError } = await supabase
      .from('DailyProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('day', dayNumber)
      .single();

    if (progressError && progressError.code !== 'PGRST116') {
      logger.error('Error fetching progress:', progressError);
      return NextResponse.json(
        { error: 'Failed to fetch progress' },
        { status: 500 }
      );
    }

    // Update or create progress record
    const progressData = {
      userId: user.id,
      day: dayNumber,
      startedAt: progress?.startedAt || new Date().toISOString(),
      completedAt,
      tasksCompleted: completedTaskIds,
      proofUploads: progress?.proofUploads || [],
      xpEarned,
    };

    if (progress) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('DailyProgress')
        .update(progressData)
        .eq('id', progress.id);

      if (updateError) {
        logger.error('Error updating progress:', updateError);
        return NextResponse.json(
          { error: 'Failed to update progress' },
          { status: 500 }
        );
      }
    } else {
      // Create new record
      const { error: createError } = await supabase
        .from('DailyProgress')
        .insert(progressData);

      if (createError) {
        logger.error('Error creating progress:', createError);
        return NextResponse.json(
          { error: 'Failed to create progress' },
          { status: 500 }
        );
      }
    }

    // Update user's total XP and current day
    const { data: currentUser, error: userFetchError } = await supabase
      .from('User')
      .select('totalXP, currentDay')
      .eq('id', user.id)
      .single();

    if (userFetchError) {
      logger.error('Error fetching user data:', userFetchError);
      // Don't fail the whole operation, just log the error
    } else {
      const newTotalXP = (currentUser.totalXP || 0) + xpEarned;
      const newCurrentDay = Math.max(currentUser.currentDay || 1, dayNumber + 1);

      const { error: userUpdateError } = await supabase
        .from('User')
        .update({
          totalXP: newTotalXP,
          currentDay: Math.min(newCurrentDay, 30), // Cap at day 30
        })
        .eq('id', user.id);

      if (userUpdateError) {
        logger.error('Error updating user:', userUpdateError);
        // Don't fail the whole operation
      }
    }

    // Check for badge awards (simplified version)
    await checkAndAwardBadges(user.id, dayNumber, supabase);

    return NextResponse.json({
      success: true,
      data: {
        xpEarned,
        completedTasks: completedTaskIds.length,
        totalTasks: tasks.length,
      },
    });

  } catch (error) {
    logger.error('Complete lesson API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function checkAndAwardBadges(userId: string, dayNumber: number, supabase: any) {
  try {
    // Get all badges that could be awarded
    const { data: badges, error: badgesError } = await supabase
      .from('Badge')
      .select('*')
      .not('dayRequired', 'is', null)
      .lte('dayRequired', dayNumber);

    if (badgesError) {
      logger.error('Error fetching badges:', badgesError);
      return;
    }

    // Get user's current badges
    const { data: userBadges, error: userBadgesError } = await supabase
      .from('User')
      .select('badges')
      .eq('id', userId)
      .single();

    if (userBadgesError) {
      logger.error('Error fetching user badges:', userBadgesError);
      return;
    }

    const currentBadges = (userBadges.badges as string[]) || [];
    const newBadges = [...currentBadges];

    // Check each badge
    for (const badge of badges) {
      if (!currentBadges.includes(badge.code)) {
        // Award badge if day requirement is met
        if (badge.dayRequired && dayNumber >= badge.dayRequired) {
          newBadges.push(badge.code);
        }
      }
    }

    // Update user badges if new ones were awarded
    if (newBadges.length > currentBadges.length) {
      await supabase
        .from('User')
        .update({ badges: newBadges })
        .eq('id', userId);
    }

  } catch (error) {
    logger.error('Error checking badges:', error);
    // Don't throw - badges are not critical
  }
}