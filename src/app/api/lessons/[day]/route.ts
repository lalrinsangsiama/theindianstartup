import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
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

    const supabase = createClient();

    // Fetch lesson data
    const { data: lesson, error: lessonError } = await supabase
      .from('DailyLesson')
      .select('*')
      .eq('day', dayNumber)
      .single();

    if (lessonError) {
      console.error('Error fetching lesson:', lessonError);
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Fetch user's progress for this day
    const { data: progress, error: progressError } = await supabase
      .from('DailyProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('day', dayNumber)
      .single();

    // If no error or "not found" error, that's okay
    if (progressError && progressError.code !== 'PGRST116') {
      console.error('Error fetching progress:', progressError);
      // Don't return error, just continue without progress data
    }

    // Format the response
    const responseData = {
      day: lesson.day,
      title: lesson.title,
      briefContent: lesson.briefContent,
      estimatedTime: lesson.estimatedTime,
      xpReward: lesson.xpReward,
      actionItems: lesson.actionItems || [],
      resources: lesson.resources || [],
      focus: extractFocusFromContent(lesson.briefContent),
      successMetrics: extractSuccessMetrics(lesson.briefContent),
      expertTips: [], // Can be added to database schema later
      reflectionQuestions: [], // Can be added to database schema later
      progress: progress ? {
        started: !!progress.startedAt,
        completed: !!progress.completedAt,
        tasksCompleted: progress.tasksCompleted || [],
        proofUploads: progress.proofUploads || [],
        xpEarned: progress.xpEarned || 0,
      } : null,
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Lesson API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to extract focus from brief content
function extractFocusFromContent(briefContent: string): string | undefined {
  // Look for patterns like "Today's Focus:" or "Focus:"
  const focusMatch = briefContent.match(/(?:Today's\s+)?Focus:\s*([^.!?]*[.!?])/i);
  if (focusMatch) {
    return focusMatch[1].trim();
  }
  
  // Fallback: extract first sentence as focus
  const sentences = briefContent.split(/[.!?]+/);
  if (sentences.length > 1 && sentences[1].trim()) {
    return sentences[1].trim();
  }
  
  return undefined;
}

// Helper function to extract success metrics from brief content
function extractSuccessMetrics(briefContent: string): string[] {
  const metrics: string[] = [];
  
  // Look for patterns like "Success Metrics:" followed by a list
  const metricsMatch = briefContent.match(/Success\s+Metrics?:\s*([\s\S]*?)(?:\n\n|\n[A-Z]|$)/i);
  if (metricsMatch) {
    const metricsText = metricsMatch[1];
    // Extract bullet points or dashes
    const bullets = metricsText.match(/[-•*]\s*([^\n]+)/g);
    if (bullets) {
      bullets.forEach(bullet => {
        const cleaned = bullet.replace(/^[-•*]\s*/, '').trim();
        if (cleaned) metrics.push(cleaned);
      });
    }
  }
  
  return metrics;
}