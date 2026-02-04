import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { portfolioUpdateSchema, ALLOWED_PORTFOLIO_FIELDS, validateRequest, validationErrorResponse } from '@/lib/validation-schemas';
import { createAuditLog } from '@/lib/audit-log';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Ensure user profile exists first (foreign key constraint)
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!existingUser) {
      // Create user profile if it doesn't exist
      const { error: createUserError } = await supabase
        .from('User')
        .insert({
          id: user.id,
          email: user.email || '',
          name: user.email?.split('@')[0] || 'Founder',
        });

      if (createUserError) {
        logger.error('Failed to create user profile for portfolio:', {
          error: createUserError,
          userId: user.id,
        });
        return NextResponse.json(
          { error: 'Failed to initialize user profile' },
          { status: 500 }
        );
      }
      logger.info('Created user profile for portfolio:', { userId: user.id });
    }

    // Get or create user portfolio
    let { data: portfolio, error: portfolioError } = await supabase
      .from('StartupPortfolio')
      .select('*')
      .eq('userId', user.id)
      .maybeSingle();

    if (portfolioError) {
      return NextResponse.json(
        { error: 'Failed to fetch portfolio' },
        { status: 500 }
      );
    }

    // Create portfolio if it doesn't exist
    if (!portfolio) {
      const { data: newPortfolio, error: createError } = await supabase
        .from('StartupPortfolio')
        .insert({
          userId: user.id,
          startupName: 'My Startup' // Default name
        })
        .select()
        .single();

      if (createError) {
        logger.error('Failed to create portfolio:', {
          error: createError,
          userId: user.id,
        });
        return NextResponse.json(
          { error: 'Failed to create portfolio' },
          { status: 500 }
        );
      }

      portfolio = newPortfolio;
    }

    // Get portfolio sections with completion status
    const { data: sections, error: sectionsError } = await supabase
      .from('PortfolioSection')
      .select('*')
      .eq('isActive', true)
      .order('order');

    if (sectionsError) {
      return NextResponse.json(
        { error: 'Failed to fetch portfolio sections' },
        { status: 500 }
      );
    }

    // Get user's portfolio activities
    const { data: activities, error: activitiesError } = await supabase
      .from('PortfolioActivity')
      .select(`
        *,
        activityType:ActivityType(*)
      `)
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('isLatest', true);

    if (activitiesError) {
      return NextResponse.json(
        { error: 'Failed to fetch portfolio activities' },
        { status: 500 }
      );
    }

    // Calculate completion status for each section
    const sectionsWithCompletion = sections?.map(section => {
      const sectionActivities = activities?.filter(activity => 
        activity.activityType?.portfolioSection === section.name
      ) || [];
      
      const requiredActivities = section.requiredActivities || [];
      const completedRequiredActivities = requiredActivities.filter((requiredId: string) =>
        sectionActivities.some(activity => 
          activity.activityType?.id === requiredId && activity.status === 'completed'
        )
      );

      const completionPercentage = requiredActivities.length > 0 
        ? Math.round((completedRequiredActivities.length / requiredActivities.length) * 100)
        : 0;

      return {
        ...section,
        completionPercentage,
        completedActivities: completedRequiredActivities.length,
        totalActivities: requiredActivities.length,
        activities: sectionActivities
      };
    }) || [];

    // Calculate overall portfolio completion
    const totalSections = sections?.length || 0;
    const completedSections = sectionsWithCompletion.filter(s => s.completionPercentage === 100).length;
    const overallCompletion = totalSections > 0 
      ? Math.round((completedSections / totalSections) * 100)
      : 0;

    // Get user's course purchases for recommendations
    const { data: purchases } = await supabase
      .from('Purchase')
      .select(`
        productId,
        product:Product(
          code,
          title
        )
      `)
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString()) as {
        data: Array<{
          product: {
            code: string;
            title: string;
          }
        }> | null;
      };

    const ownedProducts = purchases?.map(p => p.product.code).filter(Boolean) || [];

    return NextResponse.json({
      portfolio: {
        ...portfolio,
        overallCompletion,
        completedSections,
        totalSections
      },
      sections: sectionsWithCompletion,
      activities: activities || [],
      ownedProducts,
      stats: {
        totalActivities: activities?.length || 0,
        completedActivities: activities?.filter(a => a.status === 'completed').length || 0,
        draftActivities: activities?.filter(a => a.status === 'draft').length || 0,
        lastUpdated: activities && activities.length > 0 ? 
          Math.max(...activities.map(a => new Date(a.updatedAt).getTime())) : null
      }
    });

  } catch (error) {
    logger.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Get user from session
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let rawData;
    try {
      rawData = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Validate input
    const validation = validateRequest(portfolioUpdateSchema, rawData);
    if (!validation.success) {
      return NextResponse.json(validationErrorResponse(validation), { status: 400 });
    }

    // Filter to only allowed fields (whitelist)
    const allowedUpdates: Record<string, unknown> = {};
    for (const field of ALLOWED_PORTFOLIO_FIELDS) {
      if (field in validation.data) {
        allowedUpdates[field] = validation.data[field as keyof typeof validation.data];
      }
    }

    // Update portfolio
    const { data: portfolio, error: updateError } = await supabase
      .from('StartupPortfolio')
      .update({
        ...allowedUpdates,
        updatedAt: new Date().toISOString(),
      })
      .eq('userId', user.id)
      .select()
      .single();

    if (updateError) {
      logger.error('Portfolio update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update portfolio' },
        { status: 500 }
      );
    }

    // Audit log the update
    await createAuditLog({
      eventType: 'portfolio_update',
      userId: user.id,
      action: 'UPDATE',
      details: { updatedFields: Object.keys(allowedUpdates) },
    });

    return NextResponse.json(portfolio);

  } catch (error) {
    logger.error('Portfolio update API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}