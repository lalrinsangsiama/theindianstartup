import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { APIUtils } from '@/lib/api-error-tracking';
import { EmailAutomation } from '@/lib/email-automation';

export const dynamic = 'force-dynamic';

interface FeedbackData {
  type: 'bug' | 'feature' | 'improvement' | 'compliment' | 'complaint';
  title: string;
  description: string;
  email?: string;
  page: string;
  userAgent: string;
  timestamp: string;
}

// POST - Submit user feedback
export async function POST(request: NextRequest) {
  return APIUtils.withErrorTracking(async (req) => {
    const {
      type,
      title,
      description,
      email,
      page,
      userAgent,
      timestamp
    }: FeedbackData = await req.json();

    // Validate required fields
    APIUtils.validateRequired(
      { type, title, description },
      ['type', 'title', 'description']
    );

    // Get user session (optional for feedback)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    try {
      // Store feedback in database (you'll need to create this table)
      const feedbackRecord = {
        user_id: user?.id || null,
        type,
        title,
        description,
        contact_email: email || user?.email || null,
        page,
        user_agent: userAgent,
        submitted_at: timestamp,
        status: 'new',
        created_at: new Date().toISOString(),
      };

      // For now, we'll store it in a simple way
      // TODO: Create a feedback table in your database schema
      
      // Send notification email to admin
      if (type === 'bug' || type === 'complaint') {
        try {
          await EmailAutomation.sendAdminNotification({
            subject: `${type === 'bug' ? '🐛 Bug Report' : '⚠️ User Complaint'}: ${title}`,
            message: `
              <h2>New ${type === 'bug' ? 'Bug Report' : 'Complaint'} Received</h2>
              
              <p><strong>Title:</strong> ${title}</p>
              <p><strong>Description:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                ${description.replace(/\n/g, '<br>')}
              </div>
              
              <p><strong>Page:</strong> ${page}</p>
              <p><strong>User:</strong> ${user ? `${user.email} (${user.id})` : 'Anonymous'}</p>
              <p><strong>Contact Email:</strong> ${email || 'Not provided'}</p>
              <p><strong>Submitted At:</strong> ${timestamp}</p>
              <p><strong>User Agent:</strong> ${userAgent}</p>
            `,
            priority: type === 'bug' ? 'high' : 'medium',
          });
        } catch (emailError) {
          console.error('Failed to send admin notification:', emailError);
          // Don't fail the feedback submission if email fails
        }
      }

      // Send thank you email if user provided email
      if (email) {
        try {
          await EmailAutomation.sendThankYouForFeedback(email, {
            type,
            title,
            userName: user?.user_metadata?.name || 'there',
          });
        } catch (emailError) {
          console.error('Failed to send thank you email:', emailError);
          // Don't fail the feedback submission if email fails
        }
      }

      return APIUtils.successResponse({
        message: 'Feedback submitted successfully',
        id: `feedback_${Date.now()}`, // Simple ID for now
      });

    } catch (error) {
      throw APIUtils.Errors.InternalError('Failed to process feedback');
    }
  })(request);
}

// GET - Get feedback statistics (admin only)
export async function GET(request: NextRequest) {
  return APIUtils.withErrorTracking(async (req) => {
    const supabase = createClient();
    const user = await APIUtils.requireAuth(req, supabase);
    APIUtils.requireAdmin(user);

    // TODO: Implement feedback statistics
    // For now, return placeholder data
    return APIUtils.successResponse({
      total: 0,
      byType: {
        bug: 0,
        feature: 0,
        improvement: 0,
        compliment: 0,
        complaint: 0,
      },
      recent: [],
    });
  })(request);
}