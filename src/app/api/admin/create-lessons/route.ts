import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';

export async function POST() {
  try {
    // Check admin access
    await requireAdmin();
    
    const supabase = createClient();

    // Create minimal lesson data for the first few days
    const basicLessons = [
      {
        day: 1,
        title: "Start Your Journey",
        briefContent: "Welcome to Day 1 of your startup journey! Today we'll set your foundation and clarify your startup vision. Focus: Validate your startup idea and set clear goals for the next 30 days.",
        estimatedTime: 45,
        xpReward: 50,
        actionItems: [
          {
            id: "day1-task1",
            title: "Define Your Startup Idea",
            description: "Write a clear, one-sentence description of your startup idea.",
            xp: 25,
            category: "core",
            estimatedTime: 15
          },
          {
            id: "day1-task2", 
            title: "Set Your 30-Day Goals",
            description: "Define 3 specific goals you want to achieve by the end of this program.",
            xp: 25,
            category: "core",
            estimatedTime: 30
          }
        ],
        resources: [
          {
            id: "day1-resource1",
            title: "Startup Idea Worksheet",
            type: "template",
            url: "#",
            description: "Template to help clarify your startup concept"
          }
        ]
      },
      {
        day: 2,
        title: "Market Research",
        briefContent: "Today we dive into understanding your market. Research is the foundation of every successful startup. Focus: Identify your target market and understand the competitive landscape.",
        estimatedTime: 60,
        xpReward: 50,
        actionItems: [
          {
            id: "day2-task1",
            title: "Define Target Market",
            description: "Identify and describe your primary target customer segment.",
            xp: 25,
            category: "core",
            estimatedTime: 30
          },
          {
            id: "day2-task2",
            title: "Competitor Analysis",
            description: "Research and analyze 5 direct or indirect competitors.",
            xp: 25,
            category: "core", 
            estimatedTime: 30
          }
        ],
        resources: [
          {
            id: "day2-resource1",
            title: "Market Research Template",
            type: "template",
            url: "#",
            description: "Comprehensive market analysis framework"
          }
        ]
      },
      {
        day: 3,
        title: "Customer Discovery",
        briefContent: "Get out of the building and talk to potential customers. Customer interviews are crucial for validating your assumptions. Focus: Conduct at least 3 customer interviews to validate your problem hypothesis.",
        estimatedTime: 45,
        xpReward: 50,
        actionItems: [
          {
            id: "day3-task1",
            title: "Prepare Interview Questions",
            description: "Create a list of 10 open-ended questions for customer interviews.",
            xp: 20,
            category: "core",
            estimatedTime: 15
          },
          {
            id: "day3-task2",
            title: "Conduct Customer Interviews",
            description: "Interview at least 3 potential customers about the problem you're solving.",
            xp: 30,
            category: "core",
            estimatedTime: 30
          }
        ],
        resources: [
          {
            id: "day3-resource1",
            title: "Customer Interview Guide",
            type: "template",
            url: "#",
            description: "Framework for effective customer interviews"
          }
        ]
      }
    ];

    // Insert lessons into database
    for (const lesson of basicLessons) {
      const { error } = await supabase
        .from('DailyLesson')
        .upsert({
          day: lesson.day,
          title: lesson.title,
          briefContent: lesson.briefContent,
          estimatedTime: lesson.estimatedTime,
          xpReward: lesson.xpReward,
          actionItems: lesson.actionItems,
          resources: lesson.resources
        }, {
          onConflict: 'day'
        });

      if (error) {
        logger.error(`Error inserting day ${lesson.day}:`, error);
        return NextResponse.json(
          { success: false, error: `Failed to insert day ${lesson.day}: ${error.message}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${basicLessons.length} lessons`,
      lessonsCreated: basicLessons.map(l => ({ day: l.day, title: l.title }))
    });

  } catch (error) {
    logger.error('Create lessons error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create lessons'
      },
      { status: 500 }
    );
  }
}