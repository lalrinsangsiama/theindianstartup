import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { sendEmail } from '@/lib/email';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test email
    const result = await sendEmail({
      to: 'support@theindianstartup.in', // Sending to yourself for testing
      subject: 'Test Email - The Indian Startup Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #111111;">Email Test Successful! 🎉</h1>
          <p>This test email confirms that your GoDaddy email integration is working correctly.</p>
          <hr style="border: 1px solid #e5e5e5; margin: 20px 0;">
          <p><strong>Configuration Details:</strong></p>
          <ul>
            <li>SMTP Host: ${process.env.EMAIL_HOST}</li>
            <li>Port: ${process.env.EMAIL_PORT}</li>
            <li>From: ${process.env.EMAIL_FROM}</li>
          </ul>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Sent from The Indian Startup Platform<br>
            ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
      text: 'Email test successful! Your GoDaddy email integration is working correctly.',
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully!',
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send email',
        details: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    logger.error('Test email error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Email test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}