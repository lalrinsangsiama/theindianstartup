import { NextResponse } from 'next/server';
import { EmailAutomation } from '@/lib/email-automation';

// This endpoint should be called by a cron service daily at 6 PM IST
export async function POST(request: Request) {
  try {
    // Verify cron secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Send inactive reminders (function handles user selection internally)
    await EmailAutomation.sendInactiveReminders();

    return NextResponse.json({
      success: true,
      message: 'Inactive reminders processed',
    });

  } catch (error) {
    console.error('Inactive reminders cron error:', error);
    return NextResponse.json(
      { error: 'Failed to send inactive reminders' },
      { status: 500 }
    );
  }
}