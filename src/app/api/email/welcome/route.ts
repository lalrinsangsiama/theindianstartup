import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { sendEmail } from '@/lib/email';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const welcomeEmailSchema = z.object({
  userId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = welcomeEmailSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const { userId } = validation.data;

    // Get user details
    const supabase = createClient();
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('name, email')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const welcomeEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to The Indian Startup!</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-family: 'IBM Plex Mono', monospace; font-size: 24px; font-weight: bold; }
          .content { margin-bottom: 30px; }
          .button { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">THE INDIAN STARTUP</div>
            <p>30-Day India Launch Sprint</p>
          </div>
          
          <div class="content">
            <h2>Welcome ${user.name || 'Founder'}! 🚀</h2>
            
            <p>Congratulations on taking the first step towards launching your startup! Your payment has been confirmed and your 30-day journey begins now.</p>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Access your personalized dashboard</li>
              <li>Start with Day 1: Idea Refinement & Goal Setting</li>
              <li>Build your startup portfolio as you progress</li>
              <li>Connect with fellow founders in our community</li>
              <li>Earn XP and badges for completing tasks</li>
            </ul>
            
            <p>Your access is valid for <strong>365 days</strong> from today, so you can learn at your own pace.</p>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Start Your Journey</a>
            
            <p><strong>Need help?</strong><br>
            Reply to this email or reach out to us at support@theindianstartup.in</p>
            
            <p>Here's to your startup success! 🎉</p>
            
            <p>Best regards,<br>
            The Indian Startup Team</p>
          </div>
          
          <div class="footer">
            <p>The Indian Startup | Building India's next generation of founders</p>
            <p>theindianstartup.in | support@theindianstartup.in</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await sendEmail({
      to: user.email,
      subject: '🚀 Welcome to The Indian Startup - Your Journey Begins!',
      html: welcomeEmailHtml,
      text: `Welcome ${user.name || 'Founder'}! Your 30-day startup journey begins now. Visit ${process.env.NEXT_PUBLIC_APP_URL}/dashboard to get started.`,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    logger.error('Welcome email failed:', error);
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
}