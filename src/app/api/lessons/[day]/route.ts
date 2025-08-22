import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '@/lib/auth';
import { parseEnhancedContent } from '@/lib/content-parser';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { day: string } }
) {
  try {
    const user = await getUser();
    if (!user) {
      // Provide basic lesson structure for unauthenticated users
      const dayNumber = parseInt(params.day);
      if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 30) {
        return NextResponse.json(
          { error: 'Invalid day number' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        day: dayNumber,
        title: `Day ${dayNumber}: Startup Journey`,
        briefContent: `Welcome to Day ${dayNumber} of your startup journey. Please log in to access the full lesson content.`,
        estimatedTime: 45,
        xpReward: 50,
        actionItems: [
          {
            id: `day${dayNumber}-fallback`,
            title: 'Login Required',
            description: 'Please log in to access lesson tasks.',
            xp: 0,
            category: 'auth',
            estimatedTime: 0
          }
        ],
        resources: [],
        focus: 'Please log in to continue your journey.',
        successMetrics: [],
        expertTips: [],
        reflectionQuestions: [],
        progress: null,
        requiresAuth: true
      });
    }

    const dayNumber = parseInt(params.day);
    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 30) {
      return NextResponse.json(
        { error: 'Invalid day number' },
        { status: 400 }
      );
    }

    // Use service role for lesson data access
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Fetch lesson data from proper Lesson table with relationships
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select(`
        *,
        module:Module!inner (
          *,
          product:Product!inner (*)
        )
      `)
      .eq('day', dayNumber)
      .eq('module.product.code', 'P1')
      .single();

    if (lessonError) {
      logger.error('Error fetching lesson:', lessonError);
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Create user-authenticated client for progress data
    const userSupabase = (await import('@/lib/supabase/server')).createClient();
    
    // Fetch user's progress for this day
    const { data: progress, error: progressError } = await userSupabase
      .from('DailyProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('day', dayNumber)
      .single();

    // If no error or "not found" error, that's okay
    if (progressError && progressError.code !== 'PGRST116') {
      logger.error('Error fetching progress:', progressError);
      // Don't return error, just continue without progress data
    }

    // Try to get enhanced content from files
    let enhancedContent;
    try {
      enhancedContent = parseEnhancedContent(dayNumber);
    } catch (error) {
      logger.info('Using database content for day', dayNumber);
      enhancedContent = null;
    }
    
    // Use enhanced content if available, otherwise use database content
    const actionItems = enhancedContent?.tasks || lesson.actionItems || [];
    const briefContent = enhancedContent?.briefContent || lesson.briefContent;
    const resources = enhancedContent?.resources || lesson.resources || [];
    const estimatedTime = enhancedContent?.estimatedTime || lesson.estimatedTime;
    const title = enhancedContent?.title || lesson.title;
    const focus = enhancedContent?.focus || extractFocusFromContent(briefContent);
    const successMetrics = enhancedContent?.successMetrics || extractSuccessMetrics(briefContent);
    
    // Format the response - handle both old DailyLesson and new Lesson table structures
    const responseData = {
      day: lesson.day,
      title: title,
      briefContent: briefContent,
      estimatedTime: estimatedTime,
      xpReward: lesson.xpReward,
      actionItems: actionItems,
      resources: resources,
      metadata: lesson.metadata || {},
      focus: focus,
      successMetrics: successMetrics,
      expertTips: lesson.metadata?.expertInsight ? [lesson.metadata.expertInsight] : [],
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
    logger.error('Lesson API error:', error);
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

// Function to enhance action items with detailed content
function enhanceActionItemsWithContent(actionItems: any[], day: number) {
  return actionItems.map((item: any) => {
    // Add detailed content based on the task and day
    const detailedContent = getDetailedContentForTask(item.id, item.title, day);
    
    return {
      ...item,
      detailedContent: detailedContent
    };
  });
}

// Function to provide detailed content for specific tasks
function getDetailedContentForTask(taskId: string, taskTitle: string, day: number) {
  // Day 1 specific content
  if (day === 1) {
    if (taskId === 'day1-task1' || taskTitle.toLowerCase().includes('startup idea')) {
      return {
        objective: "Create a clear, concise, and compelling one-sentence description of your startup idea that anyone can understand.",
        guide: [
          "Start with the problem: What specific problem does your startup solve?",
          "Identify your target audience: Who exactly are you helping?",
          "Define your solution: How does your product/service solve this problem?",
          "Write your first draft: 'We help [target audience] to [solve problem] by [your solution]'",
          "Refine for clarity: Remove jargon and make it conversational",
          "Test it: Can a 12-year-old understand what you do?",
          "Polish it: Make it memorable and compelling"
        ],
        tips: [
          "Keep it under 25 words - brevity is powerful",
          "Focus on the benefit, not the features",
          "Use simple language that anyone can understand",
          "Avoid industry jargon or technical terms",
          "Make it specific - 'productivity app' is vague, 'time tracking for freelancers' is specific"
        ],
        examples: [
          "We help small restaurant owners increase their profits by automating inventory management and reducing food waste.",
          "We help working parents find reliable, vetted babysitters in their neighborhood within 30 minutes.",
          "We help college students split bills and expenses with roommates without the awkward money conversations."
        ],
        resources: [
          {
            title: "One-Sentence Startup Pitch Template",
            url: "#",
            type: "template"
          },
          {
            title: "How to Explain Your Startup in One Sentence",
            url: "#",
            type: "article"
          }
        ],
        deliverable: "A single, powerful sentence that clearly explains what your startup does, who it's for, and why it matters."
      };
    }
    
    if (taskId === 'day1-task2' || taskTitle.toLowerCase().includes('30-day goals')) {
      return {
        objective: "Define 3 specific, measurable goals you want to achieve by the end of this 30-day program.",
        guide: [
          "Review the 30-day program structure to understand what's possible",
          "Think about your current situation and desired outcome",
          "Set one goal for validation: What do you need to prove about your idea?",
          "Set one goal for development: What do you need to build or create?",
          "Set one goal for market readiness: How will you prepare to launch?",
          "Make each goal SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
          "Write down why each goal matters to your startup's success"
        ],
        tips: [
          "Be specific - 'get customers' vs 'get 10 paying customers'",
          "Make them measurable - you should know clearly when you've achieved them",
          "Be realistic but ambitious - challenge yourself within 30 days",
          "Connect each goal to your long-term vision",
          "Focus on learning and validation, not perfection"
        ],
        examples: [
          "Validation Goal: Conduct 20 customer interviews to validate that working parents struggle with finding reliable babysitters",
          "Development Goal: Build and test a working MVP with core features for booking and payment",
          "Market Goal: Identify and connect with 3 potential strategic partners (schools, community centers, etc.)"
        ],
        resources: [
          {
            title: "SMART Goals Worksheet",
            url: "#",
            type: "template"
          },
          {
            title: "30-Day Startup Goals Framework",
            url: "#",
            type: "template"
          }
        ],
        deliverable: "3 clearly written SMART goals that will guide your focus and measure your success over the next 30 days."
      };
    }
  }

  // Default content for any task without specific content
  return {
    objective: `Complete the task: ${taskTitle}`,
    guide: [
      "Read the task description carefully",
      "Gather any required materials or information",
      "Break down the task into smaller steps if needed",
      "Work through each step systematically",
      "Review your work for completeness",
      "Mark the task as complete when finished"
    ],
    tips: [
      "Take your time and don't rush",
      "Ask for help if you get stuck",
      "Document your work for future reference",
      "Celebrate small wins along the way"
    ],
    deliverable: "Completed task that meets the requirements outlined in the description."
  };
}