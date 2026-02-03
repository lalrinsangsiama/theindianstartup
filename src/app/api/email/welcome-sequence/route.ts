import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { emailTemplates } from '@/lib/email-templates';
import { logger } from '@/lib/logger';
import { z } from 'zod';

// Schema for triggering specific sequence emails
const triggerSchema = z.object({
  userId: z.string().uuid(),
  sequenceDay: z.enum(['day1', 'day3', 'day7', 'day14', 'day30']),
});

/**
 * POST /api/email/welcome-sequence
 *
 * Triggers a specific welcome sequence email for a user.
 * This can be called by:
 * 1. A cron job that checks user signup dates
 * 2. Manually for testing
 * 3. Webhooks after specific events
 */
export async function POST(request: NextRequest) {
  try {
    // Verify internal API key for cron/webhook calls
    const apiKey = request.headers.get('x-api-key');
    const expectedKey = process.env.INTERNAL_API_KEY;

    // Allow calls without API key in development, require in production
    if (process.env.NODE_ENV === 'production' && apiKey !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = triggerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { userId, sequenceDay } = validation.data;
    const supabase = createClient();

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('id, name, email, totalXP, badges, createdAt')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check email preferences
    const { data: preferences } = await supabase
      .from('EmailPreference')
      .select('welcomeSequence')
      .eq('userId', userId)
      .single();

    if (preferences?.welcomeSequence === false) {
      return NextResponse.json({
        success: false,
        reason: 'User opted out of welcome sequence'
      });
    }

    // Get user progress for personalized content
    const { data: progress } = await supabase
      .from('LessonProgress')
      .select('completedAt')
      .eq('userId', userId)
      .not('completedAt', 'is', null);

    const completedDays = progress?.length || 0;

    // Get portfolio progress
    const { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('*')
      .eq('userId', userId)
      .single();

    const portfolioProgress = calculatePortfolioProgress(portfolio);

    // Generate the appropriate email based on sequence day
    let emailContent;
    const unsubscribeUrl = `https://theindianstartup.in/settings/email?unsubscribe=welcome`;

    switch (sequenceDay) {
      case 'day1':
        emailContent = emailTemplates.welcomeDay1(user.name || 'Founder', unsubscribeUrl);
        break;
      case 'day3':
        emailContent = emailTemplates.welcomeDay3(user.name || 'Founder', completedDays, unsubscribeUrl);
        break;
      case 'day7':
        emailContent = emailTemplates.welcomeDay7(
          user.name || 'Founder',
          {
            completedDays,
            totalXP: user.totalXP || 0,
            badges: user.badges || [],
          },
          unsubscribeUrl
        );
        break;
      case 'day14':
        emailContent = emailTemplates.welcomeDay14(
          user.name || 'Founder',
          {
            completedDays,
            portfolioProgress,
          },
          unsubscribeUrl
        );
        break;
      case 'day30':
        emailContent = emailTemplates.welcomeDay30(
          user.name || 'Founder',
          {
            totalXP: user.totalXP || 0,
            badges: user.badges || [],
            portfolioProgress,
          },
          unsubscribeUrl
        );
        break;
      default:
        return NextResponse.json({ error: 'Invalid sequence day' }, { status: 400 });
    }

    // Send the email
    const result = await sendEmail({
      to: user.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    if (!result.success) {
      logger.error('Failed to send welcome sequence email', {
        userId,
        sequenceDay,
        error: result.error,
      });
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Log the sent email
    await supabase.from('EmailLog').insert({
      userId,
      emailType: `welcome_sequence_${sequenceDay}`,
      subject: emailContent.subject,
      sentAt: new Date().toISOString(),
    });

    logger.info('Welcome sequence email sent', { userId, sequenceDay });

    return NextResponse.json({
      success: true,
      sequenceDay,
      userId,
    });

  } catch (error) {
    logger.error('Welcome sequence email error:', error);
    return NextResponse.json(
      { error: 'Failed to process welcome sequence' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/welcome-sequence
 *
 * Finds all users who should receive welcome sequence emails today
 * and sends them. This is designed to be called by a daily cron job.
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const cronSecret = request.headers.get('x-cron-secret');
    const expectedSecret = process.env.CRON_SECRET;

    if (process.env.NODE_ENV === 'production' && cronSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();
    const now = new Date();
    const results: { day: string; count: number; errors: number }[] = [];

    // Process each sequence day
    const sequenceDays = [
      { day: 'day1', daysAgo: 1 },
      { day: 'day3', daysAgo: 3 },
      { day: 'day7', daysAgo: 7 },
      { day: 'day14', daysAgo: 14 },
      { day: 'day30', daysAgo: 30 },
    ];

    for (const { day, daysAgo } of sequenceDays) {
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() - daysAgo);
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999)).toISOString();

      // Find users who signed up on this day and haven't received this email yet
      const { data: users } = await supabase
        .from('User')
        .select('id, email')
        .gte('createdAt', startOfDay)
        .lte('createdAt', endOfDay);

      if (!users || users.length === 0) {
        results.push({ day, count: 0, errors: 0 });
        continue;
      }

      // Check which users already received this email
      const userIds = users.map(u => u.id);
      const { data: sentEmails } = await supabase
        .from('EmailLog')
        .select('userId')
        .eq('emailType', `welcome_sequence_${day}`)
        .in('userId', userIds);

      const sentUserIds = new Set(sentEmails?.map(e => e.userId) || []);
      const usersToEmail = users.filter(u => !sentUserIds.has(u.id));

      let successCount = 0;
      let errorCount = 0;

      // Send emails (in batches to avoid rate limits)
      for (const user of usersToEmail) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/welcome-sequence`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.INTERNAL_API_KEY || '',
            },
            body: JSON.stringify({
              userId: user.id,
              sequenceDay: day,
            }),
          });

          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
          }

          // Small delay between emails
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch {
          errorCount++;
        }
      }

      results.push({ day, count: successCount, errors: errorCount });
    }

    logger.info('Welcome sequence cron completed', { results });

    return NextResponse.json({
      success: true,
      processedAt: now.toISOString(),
      results,
    });

  } catch (error) {
    logger.error('Welcome sequence cron error:', error);
    return NextResponse.json(
      { error: 'Failed to process welcome sequence cron' },
      { status: 500 }
    );
  }
}

/**
 * Calculate portfolio completion percentage based on filled fields
 */
function calculatePortfolioProgress(portfolio: any): number {
  if (!portfolio) return 0;

  const fields = [
    'startupName',
    'industry',
    'stage',
    'description',
    'problem',
    'solution',
    'targetCustomer',
    'businessModel',
    'competitiveAdvantage',
    'teamSize',
    'fundingStage',
    'pitchDeck',
  ];

  let filledFields = 0;
  for (const field of fields) {
    if (portfolio[field] && portfolio[field].toString().trim() !== '') {
      filledFields++;
    }
  }

  return Math.round((filledFields / fields.length) * 100);
}
