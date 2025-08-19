import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Get all activity types
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

    // Get all active activity types
    const { data: activityTypes, error: typesError } = await supabase
      .from('ActivityType')
      .select('*')
      .eq('isActive', true)
      .order('category, name');

    if (typesError) {
      return NextResponse.json(
        { error: 'Failed to fetch activity types' },
        { status: 500 }
      );
    }

    // Get user's portfolio to get portfolioId
    const { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('id')
      .eq('userId', user.id)
      .single();

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Get user's existing activities
    const { data: userActivities, error: activitiesError } = await supabase
      .from('PortfolioActivity')
      .select('activityTypeId, status, data, updatedAt')
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('isLatest', true);

    if (activitiesError) {
      return NextResponse.json(
        { error: 'Failed to fetch user activities' },
        { status: 500 }
      );
    }

    // Combine activity types with user progress
    const activitiesWithProgress = activityTypes.map(activityType => {
      const userActivity = userActivities?.find(ua => ua.activityTypeId === activityType.id);
      
      return {
        ...activityType,
        userProgress: userActivity ? {
          status: userActivity.status,
          data: userActivity.data,
          lastUpdated: userActivity.updatedAt,
          isCompleted: userActivity.status === 'completed'
        } : null
      };
    });

    return NextResponse.json({ activities: activitiesWithProgress });

  } catch (error) {
    console.error('Activities API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create or update a portfolio activity
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { activityTypeId, data, status = 'draft', sourceLesson, sourceCourse, sourceModule } = body;

    if (!activityTypeId || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: activityTypeId, data' },
        { status: 400 }
      );
    }

    // Get user's portfolio
    let { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('id')
      .eq('userId', user.id)
      .single();

    // Create portfolio if it doesn't exist
    if (!portfolio) {
      const { data: newPortfolio, error: createError } = await supabase
        .from('StartupPortfolio')
        .insert({
          userId: user.id,
          startupName: 'My Startup'
        })
        .select('id')
        .single();

      if (createError) {
        return NextResponse.json(
          { error: 'Failed to create portfolio' },
          { status: 500 }
        );
      }
      
      portfolio = newPortfolio;
    }

    // Validate activity type exists
    const { data: activityType, error: typeError } = await supabase
      .from('ActivityType')
      .select('id, dataSchema, version')
      .eq('id', activityTypeId)
      .eq('isActive', true)
      .single();

    if (typeError || !activityType) {
      return NextResponse.json(
        { error: 'Invalid activity type' },
        { status: 400 }
      );
    }

    // TODO: Validate data against schema
    // For now, we'll skip validation and implement it later

    // Check if user already has this activity
    const { data: existingActivity } = await supabase
      .from('PortfolioActivity')
      .select('id')
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('activityTypeId', activityTypeId)
      .eq('isLatest', true)
      .maybeSingle();

    if (existingActivity) {
      // Update existing activity
      const { data: updatedActivity, error: updateError } = await supabase
        .from('PortfolioActivity')
        .update({
          data,
          status,
          sourceLesson,
          sourceCourse,
          sourceModule,
          dataVersion: 1,
          updatedAt: new Date().toISOString()
        })
        .eq('id', existingActivity.id)
        .select(`
          *,
          activityType:ActivityType(*)
        `)
        .single();

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update activity' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        activity: updatedActivity,
        action: 'updated'
      });
    } else {
      // Create new activity
      const { data: newActivity, error: createError } = await supabase
        .from('PortfolioActivity')
        .insert({
          userId: user.id,
          portfolioId: portfolio.id,
          activityTypeId,
          activityVersion: activityType.version,
          data,
          status,
          sourceLesson,
          sourceCourse,
          sourceModule,
          dataVersion: 1,
          isLatest: true
        })
        .select(`
          *,
          activityType:ActivityType(*)
        `)
        .single();

      if (createError) {
        return NextResponse.json(
          { error: 'Failed to create activity' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        activity: newActivity,
        action: 'created'
      });
    }

  } catch (error) {
    console.error('Activity create/update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}