import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const DELETION_GRACE_PERIOD_DAYS = 7;

const deleteRequestSchema = z.object({
  reason: z.enum([
    'not_using',
    'found_alternative',
    'privacy_concerns',
    'too_expensive',
    'not_helpful',
    'other',
  ]),
  additionalFeedback: z.string().max(1000).optional(),
  confirmEmail: z.string().email(),
});

const cancelDeletionSchema = z.object({
  requestId: z.string().min(1),
});

// POST: Request account deletion
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    const body = await request.json();
    const validation = deleteRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { reason, additionalFeedback, confirmEmail } = validation.data;

    // Verify email matches
    if (confirmEmail.toLowerCase() !== user.email?.toLowerCase()) {
      return NextResponse.json(
        { error: 'Email confirmation does not match your account email' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Check for existing pending deletion request
    const { data: existingRequest } = await supabase
      .from('AccountDeletionRequest')
      .select('id, status, scheduledDeletionAt')
      .eq('userId', user.id)
      .in('status', ['pending', 'scheduled'])
      .single();

    if (existingRequest) {
      return NextResponse.json(
        {
          error: 'A deletion request is already pending',
          existingRequest: {
            id: existingRequest.id,
            status: existingRequest.status,
            scheduledDeletionAt: existingRequest.scheduledDeletionAt,
          },
        },
        { status: 400 }
      );
    }

    // Calculate scheduled deletion date (7 days from now)
    const scheduledDeletionAt = new Date();
    scheduledDeletionAt.setDate(scheduledDeletionAt.getDate() + DELETION_GRACE_PERIOD_DAYS);

    // Create deletion request
    const { data: deletionRequest, error: createError } = await supabase
      .from('AccountDeletionRequest')
      .insert({
        userId: user.id,
        reason,
        additionalFeedback,
        status: 'scheduled',
        scheduledDeletionAt: scheduledDeletionAt.toISOString(),
      })
      .select()
      .single();

    if (createError) {
      logger.error('Failed to create deletion request:', createError);
      return NextResponse.json(
        { error: 'Failed to create deletion request' },
        { status: 500 }
      );
    }

    // Update user record with deletion info
    await supabase
      .from('User')
      .update({
        deletionRequestedAt: new Date().toISOString(),
        deletionScheduledFor: scheduledDeletionAt.toISOString(),
        deletionReason: reason,
      })
      .eq('id', user.id);

    // Audit log
    await createAuditLog({
      eventType: 'data_delete',
      userId: user.id,
      action: 'account_deletion_requested',
      details: {
        reason,
        scheduledDeletionAt: scheduledDeletionAt.toISOString(),
        gracePeriodDays: DELETION_GRACE_PERIOD_DAYS,
      },
      ipAddress: clientIP,
    });

    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: `Account deletion scheduled. Your account will be permanently deleted on ${scheduledDeletionAt.toLocaleDateString('en-IN')} unless you cancel.`,
      deletionRequest: {
        id: deletionRequest.id,
        status: deletionRequest.status,
        scheduledDeletionAt: deletionRequest.scheduledDeletionAt,
        gracePeriodDays: DELETION_GRACE_PERIOD_DAYS,
      },
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Account deletion request error:', error);
    return NextResponse.json(
      { error: 'Failed to process deletion request' },
      { status: 500 }
    );
  }
}

// GET: Get deletion request status
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    const { data: deletionRequest, error } = await supabase
      .from('AccountDeletionRequest')
      .select('*')
      .eq('userId', user.id)
      .order('createdAt', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      logger.error('Failed to fetch deletion request:', error);
      return NextResponse.json(
        { error: 'Failed to fetch deletion status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      deletionRequest: deletionRequest || null,
      gracePeriodDays: DELETION_GRACE_PERIOD_DAYS,
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Get deletion status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deletion status' },
      { status: 500 }
    );
  }
}

// DELETE: Cancel deletion request
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    const supabase = createClient();

    // Find active deletion request
    const { data: deletionRequest, error: fetchError } = await supabase
      .from('AccountDeletionRequest')
      .select('id, status')
      .eq('userId', user.id)
      .in('status', ['pending', 'scheduled'])
      .single();

    if (fetchError || !deletionRequest) {
      return NextResponse.json(
        { error: 'No active deletion request found' },
        { status: 404 }
      );
    }

    // Cancel the deletion request
    await supabase
      .from('AccountDeletionRequest')
      .update({
        status: 'cancelled',
        cancelledAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .eq('id', deletionRequest.id);

    // Clear deletion flags from user
    await supabase
      .from('User')
      .update({
        deletionRequestedAt: null,
        deletionScheduledFor: null,
        deletionReason: null,
      })
      .eq('id', user.id);

    // Audit log
    await createAuditLog({
      eventType: 'data_delete',
      userId: user.id,
      action: 'account_deletion_cancelled',
      details: {
        requestId: deletionRequest.id,
      },
      ipAddress: clientIP,
    });

    return NextResponse.json({
      success: true,
      message: 'Account deletion has been cancelled. Your account is safe.',
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Cancel deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel deletion' },
      { status: 500 }
    );
  }
}
