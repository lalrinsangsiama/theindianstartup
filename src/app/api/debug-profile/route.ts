import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../lib/supabase/server';

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

    // Try different table name possibilities
    let userProfile = null;
    let profileError = null;
    
    // Try lowercase table names first
    const { data: userProfileLower, error: profileErrorLower } = await supabase
      .from('user')
      .select('*, startupportfolio(*)')
      .eq('id', user.id)
      .maybeSingle();
      
    if (!profileErrorLower && userProfileLower) {
      userProfile = userProfileLower;
    } else {
      // Try PascalCase table names
      const { data: userProfilePascal, error: profileErrorPascal } = await supabase
        .from('User')
        .select('*, StartupPortfolio(*)')
        .eq('id', user.id)
        .maybeSingle();
        
      userProfile = userProfilePascal;
      profileError = profileErrorPascal;
    }

    return NextResponse.json({
      user: userProfile,
      profileError: profileError?.message,
      profileErrorLower: profileErrorLower?.message,
      hasProfile: !!userProfile,
      hasName: !!userProfile?.name,
      hasPortfolio: userProfile?.StartupPortfolio && userProfile.StartupPortfolio.length > 0,
      portfolioData: userProfile?.StartupPortfolio,
      raw: userProfile,
      userId: user.id,
      userEmail: user.email
    });
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}