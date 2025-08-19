import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const updates = await request.json();

    // Get user from session
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update portfolio
    const { data: portfolio, error: updateError } = await supabase
      .from('StartupPortfolio')
      .update({
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      .eq('userId', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Portfolio update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update portfolio' },
        { status: 500 }
      );
    }

    return NextResponse.json(portfolio);

  } catch (error) {
    console.error('Portfolio update API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}