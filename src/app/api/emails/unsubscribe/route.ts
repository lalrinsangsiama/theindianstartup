import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe link' },
        { status: 400 }
      );
    }

    // Decode token
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId, emailType] = decoded.split(':');

    if (!userId || !emailType) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe link' },
        { status: 400 }
      );
    }

    // Update preferences based on email type
    const updateData: any = {};
    
    switch (emailType) {
      case 'daily_reminders':
        updateData.dailyReminders = false;
        break;
      case 'weekly_reports':
        updateData.weeklyReports = false;
        break;
      case 'achievements':
        updateData.achievements = false;
        break;
      case 'milestones':
        updateData.milestones = false;
        break;
      case 'all':
        updateData.unsubscribedAll = true;
        break;
      default:
        updateData[emailType] = false;
    }

    // Update preferences
    await prisma.emailPreference.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        ...updateData,
      },
    });

    // Return HTML page
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Unsubscribed - The Indian Startup</title>
        <style>
          body {
            font-family: 'Inter', Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
          }
          h1 {
            color: #000;
            margin: 0 0 16px 0;
          }
          p {
            color: #666;
            margin: 0 0 24px 0;
            line-height: 1.6;
          }
          a {
            display: inline-block;
            padding: 12px 24px;
            background: #000;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
          }
          a:hover {
            background: #333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>You've been unsubscribed</h1>
          <p>
            You've been successfully unsubscribed from 
            ${emailType === 'all' ? 'all emails' : emailType.replace(/_/g, ' ')}.
          </p>
          <p>
            You can update your email preferences anytime from your dashboard.
          </p>
          <a href="https://theindianstartup.in/settings">Go to Settings</a>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request' },
      { status: 500 }
    );
  }
}