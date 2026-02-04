import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    // Get or create referral code for user
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', user.id)
      .single();

    if (profileError) {
      logger.error('Error fetching profile:', profileError);
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }

    let referralCode = profile?.referral_code;

    // If no referral code exists, create one
    if (!referralCode) {
      referralCode = generateReferralCode(user.id);
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ referral_code: referralCode })
        .eq('id', user.id);

      if (updateError) {
        logger.error('Error updating referral code:', updateError);
        return NextResponse.json({ error: 'Failed to create referral code' }, { status: 500 });
      }
    }

    // Get referral statistics
    const { data: referrals, error: referralsError } = await supabase
      .from('referrals')
      .select(`
        id,
        referred_email,
        status,
        created_at,
        purchase_date,
        credit_earned
      `)
      .eq('referrer_id', user.id)
      .order('created_at', { ascending: false });

    if (referralsError) {
      logger.error('Error fetching referrals:', referralsError);
      return NextResponse.json({ error: 'Failed to fetch referrals' }, { status: 500 });
    }

    // Calculate statistics
    const successfulReferrals = referrals?.filter(r => r.status === 'successful').length || 0;
    const pendingCredits = referrals?.filter(r => r.status === 'pending').reduce((sum, r) => sum + (r.credit_earned || 500), 0) || 0;
    
    // Get available credits
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('available_credits')
      .eq('user_id', user.id)
      .single();

    const availableCredits = credits?.available_credits || 0;

    // Construct referral link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://theindianstartup.in';
    const referralLink = `${baseUrl}/signup?ref=${referralCode}`;

    return NextResponse.json({
      referralCode,
      referralLink,
      totalReferrals: referrals?.length || 0,
      successfulReferrals,
      pendingCredits,
      availableCredits,
      referralHistory: referrals || []
    });

  } catch (error) {
    logger.error('Referral API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateReferralCode(userId: string): string {
  // Generate a unique referral code using cryptographically secure randomness
  const timestamp = Date.now().toString(36);
  // Use crypto.randomUUID() for secure random string generation
  const randomStr = crypto.randomUUID().substring(0, 8).replace(/-/g, '');
  const userPart = userId.substring(0, 4);
  return `TIS${userPart}${timestamp}${randomStr}`.toUpperCase();
}