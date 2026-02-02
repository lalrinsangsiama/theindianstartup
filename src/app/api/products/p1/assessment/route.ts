import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { scores, answers } = await request.json();
    
    // Check user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Calculate overall score
    const totalScore = scores.totalScore || 0;
    const percentageScore = scores.percentageScore || 0;
    
    // Award XP based on assessment completion
    const xpReward = 50; // Base XP for completing assessment
    const bonusXp = percentageScore >= 80 ? 100 : percentageScore >= 60 ? 50 : 0;
    const totalXp = xpReward + bonusXp;

    // Get current user data first
    const { data: userData } = await supabase
      .from('User')
      .select('totalXP, metadata')
      .eq('id', user.id)
      .single();

    const currentXP = userData?.totalXP || 0;
    const currentMetadata = userData?.metadata || {};
    const readinessLevel = percentageScore >= 80 ? 'high' :
                          percentageScore >= 60 ? 'medium' :
                          percentageScore >= 40 ? 'developing' : 'early';

    // Update user XP and metadata
    await supabase
      .from('User')
      .update({
        totalXP: currentXP + totalXp,
        metadata: {
          ...currentMetadata,
          assessmentScore: percentageScore,
          assessmentDate: new Date().toISOString(),
          readinessLevel
        }
      })
      .eq('id', user.id);

    // Store assessment results
    await supabase
      .from('XPEvent')
      .insert({
        id: crypto.randomUUID(),
        userId: user.id,
        type: 'assessment_completed',
        points: totalXp,
        payload: {
          assessmentType: 'startup_readiness',
          score: percentageScore,
          categoryScores: scores.categoryScores,
          answers: answers,
          completedAt: new Date().toISOString()
        },
        createdAt: new Date().toISOString()
      });

    // Generate personalized recommendations
    const recommendations = generateRecommendations(scores.categoryScores);
    
    // Check for badge eligibility
    const badges = [];
    if (percentageScore >= 80) {
      badges.push({
        id: 'assessment_master',
        name: 'Assessment Master',
        description: 'Scored 80%+ on Startup Readiness Assessment',
        icon: '🎯'
      });
    }

    return NextResponse.json({
      success: true,
      score: percentageScore,
      xpEarned: totalXp,
      badges,
      recommendations,
      nextSteps: getNextSteps(percentageScore)
    });
  } catch (error) {
    console.error('Assessment error:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    );
  }
}

function generateRecommendations(categoryScores: Record<string, { score: number; max: number }>) {
  const recommendations = [];

  for (const [category, data] of Object.entries(categoryScores) as [string, { score: number; max: number }][]) {
    const percentage = Math.round((data.score / data.max) * 100);
    
    if (percentage < 70) {
      recommendations.push({
        category,
        score: percentage,
        priority: percentage < 40 ? 'high' : 'medium',
        actions: getActionsForCategory(category, percentage)
      });
    }
  }
  
  return recommendations.sort((a, b) => a.score - b.score);
}

function getActionsForCategory(category: string, score: number) {
  const actionMap: Record<string, string[]> = {
    'Idea Clarity': [
      'Complete customer discovery interviews',
      'Refine your problem statement',
      'Create a clear value proposition',
      'Develop your elevator pitch'
    ],
    'Market Understanding': [
      'Conduct comprehensive market research',
      'Analyze competitor strategies',
      'Calculate TAM, SAM, and SOM',
      'Create detailed customer personas'
    ],
    'Technical Readiness': [
      'Define MVP features and scope',
      'Choose appropriate tech stack',
      'Find technical co-founder or team',
      'Create development roadmap'
    ],
    'Financial Planning': [
      'Create 18-month financial projection',
      'Calculate unit economics',
      'Plan funding strategy',
      'Build expense budget'
    ],
    'Personal Commitment': [
      'Evaluate time commitment realistically',
      'Build support network',
      'Set clear personal goals',
      'Prepare for the entrepreneurial journey'
    ]
  };
  
  return actionMap[category] || [];
}

function getNextSteps(score: number) {
  if (score >= 80) {
    return [
      'Start Day 1 of the 30-Day Sprint',
      'Begin customer interviews immediately',
      'Set up your startup documentation',
      'Join the founder community'
    ];
  } else if (score >= 60) {
    return [
      'Focus on weak areas identified',
      'Complete market research',
      'Validate your assumptions',
      'Start with Day 1 foundation work'
    ];
  } else if (score >= 40) {
    return [
      'Spend more time on problem validation',
      'Study successful startup case studies',
      'Find a mentor or advisor',
      'Begin with pre-work modules'
    ];
  } else {
    return [
      'Start with foundational learning',
      'Read recommended books and resources',
      'Join startup communities to learn',
      'Consider finding a co-founder'
    ];
  }
}