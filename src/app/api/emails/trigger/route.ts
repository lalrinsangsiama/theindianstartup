import { NextRequest, NextResponse } from 'next/server';
import { EmailAutomation } from '@/lib/email-automation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Manual trigger for emails (for testing and admin use)
export async function POST(request: NextRequest) {
  try {
    const { action, userId, data } = await request.json();
    
    // Verify admin access (optional - you might want to remove this for production scheduled jobs)
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const adminEmails = ['admin@theindianstartup.in', 'support@theindianstartup.in'];
    if (!adminEmails.includes(user.email!)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Trigger emails based on action
    switch (action) {
      case 'welcome':
        await EmailAutomation.sendWelcomeEmail(userId);
        break;
        
      case 'payment_confirmation':
        await EmailAutomation.sendPaymentConfirmation(
          userId,
          data.amount,
          data.orderId,
          data.invoiceUrl
        );
        break;
        
      case 'achievement':
        await EmailAutomation.sendAchievementEmail(userId, data.badgeId);
        break;
        
      case 'daily_reminder':
        await EmailAutomation.sendDailyReminder(userId);
        break;
        
      case 'weekly_progress':
        await EmailAutomation.sendWeeklyProgress(userId);
        break;
        
      case 'milestone':
        await EmailAutomation.sendMilestoneEmail(userId, data.milestone, data.nextMilestone);
        break;
        
      case 'inactive_reminders':
        await EmailAutomation.sendInactiveReminders();
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Email trigger error:', error);
    return NextResponse.json(
      { error: 'Failed to trigger email' },
      { status: 500 }
    );
  }
}

// Automated triggers (for cron jobs)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const secret = searchParams.get('secret');
    
    // Verify cron job secret (for production, use a secure secret)
    const expectedSecret = process.env.CRON_SECRET || 'dev-secret-123';
    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      );
    }

    switch (action) {
      case 'daily_reminders':
        await scheduleDailyReminders();
        break;
        
      case 'weekly_reports':
        await scheduleWeeklyReports();
        break;
        
      case 'inactive_reminders':
        await EmailAutomation.sendInactiveReminders();
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Email automation error:', error);
    return NextResponse.json(
      { error: 'Failed to run email automation' },
      { status: 500 }
    );
  }
}

// Schedule daily reminders for all eligible users
async function scheduleDailyReminders() {
  const supabase = createClient();
  
  // Get users with active subscriptions who haven't completed today's lesson
  const { data: users, error } = await supabase
    .from('users')
    .select(`
      id,
      current_day,
      subscriptions!inner(status, expiry_date),
      email_preferences(daily_reminders, unsubscribed_all)
    `)
    .eq('subscriptions.status', 'active')
    .gte('subscriptions.expiry_date', new Date().toISOString())
    .lte('current_day', 30)
    .not('email_preferences.unsubscribed_all', 'eq', true)
    .not('email_preferences.daily_reminders', 'eq', false);

  if (error) {
    console.error('Failed to fetch users for daily reminders:', error);
    return;
  }

  // Send reminders to each user
  for (const user of users || []) {
    try {
      await EmailAutomation.sendDailyReminder(user.id);
    } catch (error) {
      console.error(`Failed to send daily reminder to user ${user.id}:`, error);
    }
  }
  
  console.log(`Sent daily reminders to ${users?.length || 0} users`);
}

// Schedule weekly reports for all eligible users
async function scheduleWeeklyReports() {
  const supabase = createClient();
  
  // Get users with active subscriptions
  const { data: users, error } = await supabase
    .from('users')
    .select(`
      id,
      subscriptions!inner(status, expiry_date),
      email_preferences(weekly_reports, unsubscribed_all)
    `)
    .eq('subscriptions.status', 'active')
    .gte('subscriptions.expiry_date', new Date().toISOString())
    .not('email_preferences.unsubscribed_all', 'eq', true)
    .not('email_preferences.weekly_reports', 'eq', false);

  if (error) {
    console.error('Failed to fetch users for weekly reports:', error);
    return;
  }

  // Send weekly reports to each user
  for (const user of users || []) {
    try {
      await EmailAutomation.sendWeeklyProgress(user.id);
    } catch (error) {
      console.error(`Failed to send weekly report to user ${user.id}:`, error);
    }
  }
  
  console.log(`Sent weekly reports to ${users?.length || 0} users`);
}