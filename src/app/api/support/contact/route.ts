import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const contactSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject too long'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(2000, 'Message too long'),
  urgency: z.enum(['low', 'normal', 'high', 'urgent']),
});

export async function POST(request: NextRequest) {
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

    // Parse and validate request body
    const body = await request.json();
    
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid contact form data', 
          details: validation.error.errors.map(err => ({ 
            field: err.path.join('.'), 
            message: err.message 
          }))
        },
        { status: 400 }
      );
    }

    const { subject, message, urgency } = validation.data;

    // Get user profile for context
    const { data: userProfile } = await supabase
      .from('User')
      .select('name, email')
      .eq('id', user.id)
      .maybeSingle();

    const userName = userProfile?.name || 'User';
    const userEmail = userProfile?.email || user.email || 'Unknown';

    // Create support ticket ID
    const ticketId = `TIS-${Date.now().toString().slice(-6)}`;

    // Email to support team
    const supportEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
          New Support Request - ${ticketId}
        </h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Priority:</strong> 
            <span style="background: ${urgency === 'urgent' ? '#ef4444' : urgency === 'high' ? '#f59e0b' : urgency === 'normal' ? '#10b981' : '#6b7280'}; color: white; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; font-size: 12px;">
              ${urgency}
            </span>
          </p>
          <p style="margin: 5px 0;"><strong>From:</strong> ${userName} (${userEmail})</p>
          <p style="margin: 5px 0;"><strong>User ID:</strong> ${user.id}</p>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN')}</p>
        </div>
        
        <div style="background: white; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #333;">Message:</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #0369a1;">
            <strong>Next Steps:</strong> Reply to this email to respond directly to the user. 
            Their response will go to: ${userEmail}
          </p>
        </div>
      </div>
    `;

    // Auto-confirmation email to user
    const userConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">We've Received Your Message</h2>
        
        <p>Hi ${userName},</p>
        
        <p>Thank you for reaching out to The Indian Startup support team. We've received your message and will get back to you soon.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Ticket ID:</strong> ${ticketId}</p>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin: 5px 0;"><strong>Priority:</strong> ${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</p>
          <p style="margin: 5px 0;"><strong>Expected Response:</strong> 
            ${urgency === 'urgent' ? 'Within 2 hours' : 
              urgency === 'high' ? 'Within 6 hours' : 
              urgency === 'normal' ? 'Within 24 hours' : 'Within 48 hours'}
          </p>
        </div>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px;">
            <strong>In the meantime:</strong><br>
            • Check our <a href="https://theindianstartup.in/help" style="color: #0369a1;">Help Center</a> for common questions<br>
            • Join our <a href="https://theindianstartup.in/community" style="color: #0369a1;">Community</a> to connect with other founders<br>
            • Visit your <a href="https://theindianstartup.in/dashboard" style="color: #0369a1;">Dashboard</a> to continue your journey
          </p>
        </div>
        
        <p>Best regards,<br>The Indian Startup Support Team</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>This is an automated confirmation. Please don't reply to this email. We'll respond to your original inquiry directly.</p>
        </div>
      </div>
    `;

    try {
      // Send notification to support team
      await sendEmail({
        to: 'support@theindianstartup.in',
        subject: `[${urgency.toUpperCase()}] Support Request: ${subject} - ${ticketId}`,
        html: supportEmailHtml,
        text: `New support request from ${userName} (${userEmail})\n\nTicket: ${ticketId}\nPriority: ${urgency}\nSubject: ${subject}\n\nMessage:\n${message}`,
      });

      // Send confirmation to user
      await sendEmail({
        to: userEmail,
        subject: `Support Request Received - ${ticketId}`,
        html: userConfirmationHtml,
        text: `Hi ${userName},\n\nWe've received your support request (${ticketId}) and will respond within 24 hours.\n\nSubject: ${subject}\nPriority: ${urgency}\n\nThank you,\nThe Indian Startup Support Team`,
      });

    } catch (emailError) {
      logger.error('Failed to send support emails:', emailError);
      // Don't fail the request if email fails, but log it
    }

    // Log the support request (optional - you could create a SupportTicket table)
    try {
      await supabase
        .from('SupportTickets')
        .insert({
          id: ticketId,
          userId: user.id,
          subject,
          message,
          urgency,
          status: 'open',
          createdAt: new Date().toISOString(),
        });
    } catch (logError) {
      logger.error('Failed to log support ticket:', logError);
      // Don't fail the request if logging fails
    }

    return NextResponse.json({
      success: true,
      ticketId,
      message: 'Support request submitted successfully',
      expectedResponse: urgency === 'urgent' ? 'Within 2 hours' : 
                       urgency === 'high' ? 'Within 6 hours' : 
                       urgency === 'normal' ? 'Within 24 hours' : 'Within 48 hours'
    });

  } catch (error) {
    logger.error('Support contact error:', error);
    return NextResponse.json(
      { error: 'Failed to submit support request' },
      { status: 500 }
    );
  }
}