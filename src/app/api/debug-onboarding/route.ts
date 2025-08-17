import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Not authenticated',
        authError: authError?.message
      }, { status: 401 });
    }

    const debug: {
      userId: string;
      userEmail: string | undefined;
      tests: any;
      onboardingStatus?: any;
    } = {
      userId: user.id,
      userEmail: user.email,
      tests: {}
    };

    // Test 1: Check User table exists and query user
    try {
      const { data: userData, error: userError } = await supabase
        .from('User')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      debug.tests.userTable = {
        success: !userError,
        error: userError?.message,
        data: userData,
        hasUser: !!userData,
        userName: userData?.name,
        userPhone: userData?.phone
      };
    } catch (e: any) {
      debug.tests.userTable = {
        success: false,
        error: e.message
      };
    }

    // Test 2: Check StartupPortfolio table exists and query portfolio
    try {
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('StartupPortfolio')
        .select('*')
        .eq('userId', user.id)
        .maybeSingle();

      debug.tests.portfolioTable = {
        success: !portfolioError,
        error: portfolioError?.message,
        data: portfolioData,
        hasPortfolio: !!portfolioData,
        startupName: portfolioData?.startupName
      };
    } catch (e: any) {
      debug.tests.portfolioTable = {
        success: false,
        error: e.message
      };
    }

    // Test 3: Test the actual profile API endpoint
    try {
      const profileResponse = await fetch(new URL('/api/user/profile', request.url).toString(), {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      });
      const profileData = await profileResponse.json();

      debug.tests.profileApi = {
        success: profileResponse.ok,
        status: profileResponse.status,
        data: profileData,
        hasCompletedOnboarding: profileData.hasCompletedOnboarding
      };
    } catch (e: any) {
      debug.tests.profileApi = {
        success: false,
        error: e.message
      };
    }

    // Test 4: Check what the dashboard is checking
    const hasName = debug.tests.userTable.data?.name;
    const hasPortfolio = debug.tests.portfolioTable.hasPortfolio;
    
    debug.onboardingStatus = {
      hasName: !!hasName,
      hasPortfolio: !!hasPortfolio,
      shouldBeCompleted: !!(hasName && hasPortfolio),
      actualApiResponse: debug.tests.profileApi.data?.hasCompletedOnboarding
    };

    return NextResponse.json(debug);
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}