import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get user's referral code
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('referral_code, name')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.referral_code) {
      return NextResponse.json(
        { error: 'Referral code not found' },
        { status: 400 }
      );
    }

    // Check if already invited
    const { data: existingInvite } = await supabase
      .from('referrals')
      .select('id')
      .eq('referrer_id', user.id)
      .eq('referred_email', email)
      .single();

    if (existingInvite) {
      return NextResponse.json(
        { error: 'You have already invited this email' },
        { status: 400 }
      );
    }

    // Create referral record
    const { error: insertError } = await supabase
      .from('referrals')
      .insert({
        referrer_id: user.id,
        referred_email: email,
        status: 'pending',
        referral_code: profile.referral_code
      });

    if (insertError) {
      logger.error('Error creating referral:', insertError);
      return NextResponse.json(
        { error: 'Failed to create referral' },
        { status: 500 }
      );
    }

    // Send invitation email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://theindianstartup.in';
    const referralLink = `${baseUrl}/signup?ref=${profile.referral_code}`;

    try {
      if (!resend) {
        logger.info('Resend API key not configured, skipping email send');
        return NextResponse.json({
          success: true,
          message: 'Invitation created successfully! (Email sending disabled)'
        });
      }

      await resend.emails.send({
        from: 'The Indian Startup <noreply@theindianstartup.in>',
        to: email,
        subject: `${profile.name || 'Your friend'} invited you to The Indian Startup`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>You're invited to join The Indian Startup!</h2>
            
            <p>${profile.name || 'Your friend'} thinks you'd love our comprehensive courses for Indian founders.</p>
            
            <p>Join thousands of founders who are building successful startups with our step-by-step guidance.</p>
            
            <h3>What you'll get:</h3>
            <ul>
              <li>12 comprehensive courses covering everything from incorporation to funding</li>
              <li>3000+ templates and tools</li>
              <li>Access to a community of 10,000+ Indian founders</li>
              <li>India-specific guidance for regulations and compliance</li>
            </ul>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${referralLink}" style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Accept Invitation
              </a>
            </p>
            
            <p style="color: #666; font-size: 14px;">
              When you sign up using this link and make your first purchase, ${profile.name || 'your friend'} will receive ₹500 credit towards their next course.
            </p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              The Indian Startup | Building India's next unicorns<br>
              <a href="${baseUrl}" style="color: #666;">theindianstartup.in</a>
            </p>
          </div>
        `
      });
    } catch (emailError) {
      logger.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Invitation sent successfully!'
    });

  } catch (error) {
    logger.error('Invite API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}