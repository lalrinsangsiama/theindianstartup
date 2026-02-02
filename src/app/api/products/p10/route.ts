// P10: Patent Mastery API Endpoints
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P10
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P10', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError) {
      logger.error('Error checking P10 access:', purchaseError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({ 
        error: 'Access denied. Purchase P10: Patent Mastery to continue.' 
      }, { status: 403 });
    }

    // Get P10 course structure
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select(`
        *,
        modules:Module (
          *,
          lessons:Lesson (
            *
          )
        )
      `)
      .eq('code', 'P10')
      .single();

    if (productError) {
      logger.error('Error fetching P10 product:', productError);
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Get user's progress for P10
    const { data: progress, error: progressError } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('productCode', 'P10');

    if (progressError) {
      logger.warn('Error fetching P10 progress:', progressError);
    }

    // Get user's patent portfolio data
    const { data: portfolios, error: portfolioError } = await supabase
      .from('PatentPortfolio')
      .select(`
        *,
        applications:PatentApplication (*)
      `)
      .eq('userId', user.id);

    if (portfolioError) {
      logger.warn('Error fetching patent portfolios:', portfolioError);
    }

    // Calculate progress statistics
    const totalLessons = product.modules?.reduce((sum: number, module: any) => sum + (module.lessons?.length || 0), 0) || 0;
    const completedLessons = progress?.filter((p: any) => p.completed).length || 0;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Get user's XP and achievements
    const totalXP = progress?.reduce((sum: number, p: any) => sum + (p.xpEarned || 0), 0) || 0;

    const response = {
      course: product,
      userProgress: {
        totalLessons,
        completedLessons,
        progressPercentage,
        totalXP,
        currentStreak: user.currentStreak || 0,
        lastActive: new Date().toISOString()
      },
      portfolios: portfolios || [],
      lessonProgress: progress || [],
      accessInfo: {
        hasAccess: true,
        purchaseDate: purchases[0].purchaseDate,
        expiresAt: purchases[0].expiresAt,
        productCode: purchases[0].productCode
      }
    };

    logger.info(`P10 course data loaded for user ${user.id}`);
    return NextResponse.json(response);

  } catch (error) {
    logger.error('Error in P10 GET handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, data } = body;

    // Verify P10 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P10', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    switch (action) {
      case 'complete_lesson':
        return await completeLesson(user.id, purchases[0].id, data);
      case 'save_progress':
        return await saveProgress(user.id, purchases[0].id, data);
      case 'create_portfolio':
        return await createPatentPortfolio(user.id, data);
      case 'add_application':
        return await addPatentApplication(user.id, data);
      case 'update_application':
        return await updatePatentApplication(user.id, data);
      case 'run_prior_art_search':
        return await runPriorArtSearch(user.id, data);
      case 'analyze_patentability':
        return await analyzePatentability(user.id, data);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error in P10 POST handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to complete a lesson
async function completeLesson(userId: string, purchaseId: string, data: any) {
  const { lessonId, xpEarned, reflection, proofUploads } = data;

  try {
    // Update lesson progress (using productCode instead of purchaseId)
    const { data: progress, error: progressError } = await supabase
      .from('LessonProgress')
      .upsert({
        userId,
        lessonId,
        productCode: 'P10',
        completed: true,
        completedAt: new Date().toISOString(),
        xpEarned: xpEarned || 0,
        reflection,
        proofUploads: proofUploads || []
      }, {
        onConflict: 'userId,lessonId'
      })
      .select()
      .single();

    if (progressError) {
      logger.error('Error updating lesson progress:', progressError);
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
    }

    // Update user's total XP using RPC or direct query
    // First get current XP, then update
    const { data: userData } = await supabase
      .from('User')
      .select('totalXP')
      .eq('id', userId)
      .single();

    const { error: userError } = await supabase
      .from('User')
      .update({
        totalXP: (userData?.totalXP || 0) + (xpEarned || 0),
        updatedAt: new Date().toISOString()
      })
      .eq('id', userId);

    if (userError) {
      logger.error('Error updating user XP:', userError);
    }

    // Create XP event record (using correct column names)
    const { error: xpError } = await supabase
      .from('XPEvent')
      .insert({
        userId,
        type: 'lesson_completion',
        points: xpEarned || 0,
        description: `Completed P10 lesson: ${lessonId}`
      });

    if (xpError) {
      logger.error('Error creating XP event:', xpError);
    }

    logger.info(`Lesson ${lessonId} completed by user ${userId}`);
    return NextResponse.json({ success: true, progress });

  } catch (error) {
    logger.error('Error completing lesson:', error);
    return NextResponse.json({ error: 'Failed to complete lesson' }, { status: 500 });
  }
}

// Helper function to save general progress
async function saveProgress(userId: string, purchaseId: string, data: any) {
  const { lessonId, tasksCompleted, reflection, proofUploads } = data;

  try {
    const { data: progress, error } = await supabase
      .from('LessonProgress')
      .upsert({
        userId,
        lessonId,
        productCode: 'P10',
        tasksCompleted,
        reflection,
        proofUploads: proofUploads || [],
        updatedAt: new Date().toISOString()
      }, {
        onConflict: 'userId,lessonId'
      })
      .select()
      .single();

    if (error) {
      logger.error('Error saving progress:', error);
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
    }

    return NextResponse.json({ success: true, progress });

  } catch (error) {
    logger.error('Error in saveProgress:', error);
    return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
  }
}

// Helper function to create patent portfolio
async function createPatentPortfolio(userId: string, data: any) {
  const { portfolioName, description, strategicObjectives, targetMarkets } = data;

  try {
    const { data: portfolio, error } = await supabase
      .from('PatentPortfolio')
      .insert({
        userId,
        portfolioName,
        description,
        targetMarkets: targetMarkets || [],
        strategicGoals: { objectives: strategicObjectives || [] },
        createdAt: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating patent portfolio:', error);
      return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
    }

    logger.info(`Patent portfolio created by user ${userId}: ${portfolioName}`);
    return NextResponse.json({ success: true, portfolio });

  } catch (error) {
    logger.error('Error in createPatentPortfolio:', error);
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}

// Helper function to add patent application
async function addPatentApplication(userId: string, data: any) {
  const { 
    portfolioId, 
    title, 
    inventionType, 
    jurisdiction, 
    inventors, 
    technologyArea,
    description,
    filingCosts 
  } = data;

  try {
    const { data: application, error } = await supabase
      .from('PatentApplication')
      .insert({
        userId,
        portfolioId,
        title,
        inventionType,
        jurisdiction,
        inventors: inventors || [],
        technologyArea,
        filingCosts: filingCosts || 0,
        status: 'draft',
        createdAt: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      logger.error('Error adding patent application:', error);
      return NextResponse.json({ error: 'Failed to add application' }, { status: 500 });
    }

    // Update portfolio stats - get current values first
    const { data: portfolioData } = await supabase
      .from('PatentPortfolio')
      .select('totalPatents, pendingApplications')
      .eq('id', portfolioId)
      .single();

    const { error: portfolioError } = await supabase
      .from('PatentPortfolio')
      .update({
        totalPatents: (portfolioData?.totalPatents || 0) + 1,
        pendingApplications: (portfolioData?.pendingApplications || 0) + 1,
        updatedAt: new Date().toISOString()
      })
      .eq('id', portfolioId);

    if (portfolioError) {
      logger.error('Error updating portfolio stats:', portfolioError);
    }

    logger.info(`Patent application added by user ${userId}: ${title}`);
    return NextResponse.json({ success: true, application });

  } catch (error) {
    logger.error('Error in addPatentApplication:', error);
    return NextResponse.json({ error: 'Failed to add application' }, { status: 500 });
  }
}

// Helper function to update patent application
async function updatePatentApplication(userId: string, data: any) {
  const { applicationId, updates } = data;

  try {
    // Verify ownership
    const { data: existing, error: checkError } = await supabase
      .from('PatentApplication')
      .select('userId')
      .eq('id', applicationId)
      .single();

    if (checkError || !existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Application not found or access denied' }, { status: 404 });
    }

    const { data: application, error } = await supabase
      .from('PatentApplication')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', applicationId)
      .eq('userId', userId)
      .select()
      .single();

    if (error) {
      logger.error('Error updating patent application:', error);
      return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
    }

    logger.info(`Patent application updated by user ${userId}: ${applicationId}`);
    return NextResponse.json({ success: true, application });

  } catch (error) {
    logger.error('Error in updatePatentApplication:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

// Helper function to run prior art search
async function runPriorArtSearch(userId: string, data: any) {
  const { applicationId, searchQuery, searchStrategy, databasesSearched } = data;

  try {
    // Create prior art search record
    const { data: search, error } = await supabase
      .from('PriorArtSearch')
      .insert({
        userId,
        applicationId,
        searchQuery,
        searchStrategy,
        databasesSearched: databasesSearched || [],
        searchDate: new Date().toISOString(),
        searcherName: 'System',
        isCompleted: false
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating prior art search:', error);
      return NextResponse.json({ error: 'Failed to initiate search' }, { status: 500 });
    }

    // In a real implementation, this would trigger actual patent database searches
    // For now, we'll simulate with mock results
    const mockResults = {
      totalResults: Math.floor(Math.random() * 100) + 10,
      relevantResults: Math.floor(Math.random() * 20) + 5,
      topReferences: [
        {
          patentNumber: 'US10123456B2',
          title: 'Method for automated patent analysis using machine learning',
          applicant: 'Tech Corp Inc.',
          relevanceScore: 85,
          publicationDate: '2023-01-15'
        },
        {
          patentNumber: 'IN234567',
          title: 'System for intellectual property management',
          applicant: 'IP Solutions Ltd.',
          relevanceScore: 72,
          publicationDate: '2022-08-20'
        }
      ],
      noveltyAssessment: 'Based on initial search results, the invention appears to have novel elements that distinguish it from existing prior art.',
      patentabilityOpinion: 'Preliminary analysis suggests good patentability prospects with proper claim drafting.'
    };

    // Update search with results
    const { error: updateError } = await supabase
      .from('PriorArtSearch')
      .update({
        totalResults: mockResults.totalResults,
        relevantResults: mockResults.relevantResults,
        topReferences: mockResults.topReferences,
        noveltyAssessment: mockResults.noveltyAssessment,
        patentabilityOpinion: mockResults.patentabilityOpinion,
        isCompleted: true,
        updatedAt: new Date().toISOString()
      })
      .eq('id', search.id);

    if (updateError) {
      logger.error('Error updating search results:', updateError);
    }

    logger.info(`Prior art search completed for user ${userId}, application ${applicationId}`);
    return NextResponse.json({ 
      success: true, 
      searchId: search.id,
      results: mockResults 
    });

  } catch (error) {
    logger.error('Error in runPriorArtSearch:', error);
    return NextResponse.json({ error: 'Failed to run search' }, { status: 500 });
  }
}

// Helper function to analyze patentability
async function analyzePatentability(userId: string, data: any) {
  const { 
    inventionDescription, 
    technicalField, 
    problemSolved, 
    technicalSolution,
    applicationId 
  } = data;

  try {
    // Simulate AI-powered patentability analysis
    // In production, this would integrate with actual AI analysis tools
    const mockAnalysis = {
      noveltyScore: Math.floor(Math.random() * 40) + 60, // 60-100
      inventiveStepScore: Math.floor(Math.random() * 35) + 55, // 55-90
      industrialApplicationScore: Math.floor(Math.random() * 30) + 70, // 70-100
      overallPatentabilityScore: 0,
      section3Compliance: true,
      technicalEffectPresent: true,
      recommendations: [
        'Consider emphasizing the technical implementation details in the specification',
        'Prepare detailed performance comparisons with existing solutions',
        'Document unexpected technical results or advantages',
        'Ensure claims focus on technical features rather than abstract concepts'
      ],
      estimatedFilingCost: {
        india: { min: 50000, max: 150000 },
        us: { min: 800000, max: 1500000 },
        eu: { min: 600000, max: 1200000 }
      },
      estimatedTimeline: {
        india: '18-36 months',
        us: '24-48 months',
        eu: '24-42 months'
      }
    };

    // Calculate overall score
    mockAnalysis.overallPatentabilityScore = Math.round(
      (mockAnalysis.noveltyScore + mockAnalysis.inventiveStepScore + mockAnalysis.industrialApplicationScore) / 3
    );

    // Save analysis results
    const { data: analysis, error } = await supabase
      .from('PatentAnalytics')
      .insert({
        userId,
        reportType: 'patentability',
        reportTitle: 'Patentability Analysis Report',
        analysisScope: 'Single Invention Assessment',
        keyFindings: [
          `Overall Patentability Score: ${mockAnalysis.overallPatentabilityScore}/100`,
          `Novelty Assessment: ${mockAnalysis.noveltyScore}/100`,
          `Inventive Step: ${mockAnalysis.inventiveStepScore}/100`,
          `Industrial Application: ${mockAnalysis.industrialApplicationScore}/100`
        ],
        recommendations: mockAnalysis.recommendations,
        reportStatus: 'completed',
        confidentialityLevel: 'confidential'
      })
      .select()
      .single();

    if (error) {
      logger.error('Error saving patentability analysis:', error);
    }

    logger.info(`Patentability analysis completed for user ${userId}`);
    return NextResponse.json({ 
      success: true, 
      analysis: mockAnalysis,
      reportId: analysis?.id 
    });

  } catch (error) {
    logger.error('Error in analyzePatentability:', error);
    return NextResponse.json({ error: 'Failed to analyze patentability' }, { status: 500 });
  }
}