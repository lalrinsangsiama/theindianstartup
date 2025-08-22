import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { checkProductAccess } from '@/lib/product-access';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has access to P7
    const access = await checkProductAccess(user.id, 'P7');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P7 State-wise Scheme Map course.' },
        { status: 403 }
      );
    }

    const { lessonId } = params;
    const supabase = createClient();

    // Parse lesson day from lessonId (e.g., "1", "2", etc.)
    const day = parseInt(lessonId);
    if (isNaN(day) || day < 1 || day > 30) {
      return NextResponse.json(
        { error: 'Invalid lesson ID. Must be between 1 and 30.' },
        { status: 400 }
      );
    }

    // Get lesson content from database
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select(`
        id,
        day,
        title,
        briefContent,
        actionItems,
        resources,
        estimatedTime,
        xpReward,
        orderIndex,
        module:Module (
          id,
          title,
          description,
          orderIndex,
          product:Product (
            code,
            title
          )
        )
      `)
      .eq('day', day)
      .eq('module.product.code', 'P7')
      .single();

    if (lessonError || !lesson) {
      logger.error('Error fetching P7 lesson:', lessonError);
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Get the lesson ID for progress tracking
    const lessonIdForProgress = day < 10 ? `p7_l0${day}` : `p7_l${day}`;
    
    // Check user's progress for this lesson
    const { data: progress } = await supabase
      .from('LessonProgress')
      .select('completed, xpEarned, completedAt')
      .eq('userId', user.id)
      .eq('lessonId', lessonIdForProgress)
      .eq('productCode', 'P7')
      .single();

    const lessonData = {
      ...lesson,
      isCompleted: progress?.completed || false,
      xpEarned: progress?.xpEarned || 0,
      completedAt: progress?.completedAt || null,
      hasAccess: true,
      daysRemaining: access.daysRemaining || 0
    };

    return NextResponse.json(lessonData);

  } catch (error) {
    logger.error('Error in P7 lesson API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has access to P7
    const access = await checkProductAccess(user.id, 'P7');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P7 State-wise Scheme Map course.' },
        { status: 403 }
      );
    }

    const { lessonId } = params;
    const body = await request.json();
    const { completed, reflection } = body;

    const day = parseInt(lessonId);
    if (isNaN(day) || day < 1 || day > 30) {
      return NextResponse.json(
        { error: 'Invalid lesson ID. Must be between 1 and 30.' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    
    // Get the lesson ID for progress tracking
    const lessonIdForProgress = day < 10 ? `p7_l0${day}` : `p7_l${day}`;

    // Get lesson details for XP reward
    const { data: lessons } = await supabase
      .from('Lesson')
      .select(`
        id,
        xpReward,
        module:Module!inner (
          product:Product!inner (
            code
          )
        )
      `)
      .eq('day', day)
      .eq('module.product.code', 'P7');
    
    const lesson = lessons?.[0];

    const xpReward = lesson?.xpReward || 150; // Default XP
    const actualLessonId = lesson?.id || lessonIdForProgress;

    // Update or insert progress in LessonProgress table
    const { data: existingProgress } = await supabase
      .from('LessonProgress')
      .select('id, completed')
      .eq('userId', user.id)
      .eq('lessonId', actualLessonId)
      .eq('productCode', 'P7')
      .single();

    if (existingProgress) {
      // Update existing progress
      const { error: updateError } = await supabase
        .from('LessonProgress')
        .update({
          completed: completed,
          xpEarned: completed ? xpReward : 0,
          completedAt: completed ? new Date().toISOString() : null,
          reflection: reflection || null,
          updatedAt: new Date().toISOString()
        })
        .eq('id', existingProgress.id);

      if (updateError) {
        logger.error('Error updating P7 progress:', updateError);
        return NextResponse.json(
          { error: 'Failed to update progress' },
          { status: 500 }
        );
      }

      // Update user's total XP if newly completed
      if (completed && !existingProgress.completed) {
        const { data: userData } = await supabase
          .from('User')
          .select('totalXP')
          .eq('id', user.id)
          .single();
        
        if (userData) {
          const { error: xpError } = await supabase
            .from('User')
            .update({ 
              totalXP: (userData.totalXP || 0) + xpReward
            })
            .eq('id', user.id);
            
          if (xpError) {
            logger.error('Error updating user XP:', xpError);
          }
        }
      }
    } else {
      // Insert new progress
      const { error: insertError } = await supabase
        .from('LessonProgress')
        .insert({
          userId: user.id,
          lessonId: actualLessonId,
          productCode: 'P7',
          completed: completed,
          xpEarned: completed ? xpReward : 0,
          completedAt: completed ? new Date().toISOString() : null,
          reflection: reflection || null,
          startedAt: new Date().toISOString()
        });

      if (insertError) {
        logger.error('Error inserting P7 progress:', insertError);
        return NextResponse.json(
          { error: 'Failed to save progress' },
          { status: 500 }
        );
      }

      // Update user's total XP if completed
      if (completed) {
        const { data: userData } = await supabase
          .from('User')
          .select('totalXP')
          .eq('id', user.id)
          .single();
        
        if (userData) {
          const { error: xpError } = await supabase
            .from('User')
            .update({ 
              totalXP: (userData.totalXP || 0) + xpReward
            })
            .eq('id', user.id);
            
          if (xpError) {
            logger.error('Error updating user XP:', xpError);
          }
        }
      }
    }

    return NextResponse.json({ 
      success: true,
      xpEarned: completed ? xpReward : 0 
    });

  } catch (error) {
    logger.error('Error updating P7 lesson progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}