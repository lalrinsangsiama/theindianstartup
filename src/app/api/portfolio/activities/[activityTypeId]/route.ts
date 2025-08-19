import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Get specific activity by type ID
export async function GET(
  request: NextRequest,
  { params }: { params: { activityTypeId: string } }
) {
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

    const { activityTypeId } = params;

    // Get activity type
    const { data: activityType, error: typeError } = await supabase
      .from('ActivityType')
      .select('*')
      .eq('id', activityTypeId)
      .eq('isActive', true)
      .single();

    if (typeError || !activityType) {
      return NextResponse.json(
        { error: 'Activity type not found' },
        { status: 404 }
      );
    }

    // Get user's portfolio
    const { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('id')
      .eq('userId', user.id)
      .single();

    if (!portfolio) {
      return NextResponse.json({
        activityType,
        userActivity: null
      });
    }

    // Get user's activity for this type
    const { data: userActivity } = await supabase
      .from('PortfolioActivity')
      .select('*')
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('activityTypeId', activityTypeId)
      .eq('isLatest', true)
      .maybeSingle();

    return NextResponse.json({
      activityType,
      userActivity
    });

  } catch (error) {
    console.error('Activity GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update or create specific activity
export async function PUT(
  request: NextRequest,
  { params }: { params: { activityTypeId: string } }
) {
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

    const { activityTypeId } = params;
    const body = await request.json();
    const { data, status = 'completed', sourceLesson, sourceCourse, sourceModule } = body;

    if (!data) {
      return NextResponse.json(
        { error: 'Missing required field: data' },
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
      .select('id, version')
      .eq('id', activityTypeId)
      .eq('isActive', true)
      .single();

    if (typeError || !activityType) {
      return NextResponse.json(
        { error: 'Activity type not found' },
        { status: 404 }
      );
    }

    // Check if user already has this activity
    const { data: existingActivity } = await supabase
      .from('PortfolioActivity')
      .select('id')
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('activityTypeId', activityTypeId)
      .eq('isLatest', true)
      .maybeSingle();

    let result;
    
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
          updatedAt: new Date().toISOString()
        })
        .eq('id', existingActivity.id)
        .select('*')
        .single();

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update activity' },
          { status: 500 }
        );
      }

      result = { activity: updatedActivity, action: 'updated' };
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
        .select('*')
        .single();

      if (createError) {
        return NextResponse.json(
          { error: 'Failed to create activity' },
          { status: 500 }
        );
      }

      result = { activity: newActivity, action: 'created' };
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Activity PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete specific activity
export async function DELETE(
  request: NextRequest,
  { params }: { params: { activityTypeId: string } }
) {
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

    const { activityTypeId } = params;

    // Get user's portfolio
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

    // Delete the activity
    const { error: deleteError } = await supabase
      .from('PortfolioActivity')
      .delete()
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('activityTypeId', activityTypeId)
      .eq('isLatest', true);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to delete activity' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Activity DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}