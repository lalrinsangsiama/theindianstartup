import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

    // Get user profile with portfolio - use maybeSingle to handle no results
    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('*, StartupPortfolio(*)')
      .eq('id', user.id)
      .maybeSingle();

    return NextResponse.json({
      user: userProfile,
      profileError: profileError?.message,
      hasProfile: !!userProfile,
      hasName: !!userProfile?.name,
      hasPortfolio: userProfile?.StartupPortfolio && userProfile.StartupPortfolio.length > 0,
      portfolioData: userProfile?.StartupPortfolio,
      raw: userProfile
    });
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}