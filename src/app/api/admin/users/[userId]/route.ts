import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

// C4: UUID validation schema
const uuidSchema = z.string().uuid('Invalid user ID format');

// C1: Whitelist only allowed fields for admin user updates
const AdminUserUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional().nullable(),
  paymentBlocked: z.boolean().optional(),
  currentStreak: z.number().int().min(0).optional(),
  totalXP: z.number().int().min(0).optional(),
  badges: z.array(z.string()).max(50).optional(),
  startupName: z.string().max(200).optional().nullable(),
  industry: z.string().max(100).optional().nullable(),
}).strict(); // Reject any extra fields

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await requireAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    // 401 for auth issues, 403 for permission issues
    const status = message === 'Authentication required' ? 401 : 403;
    return NextResponse.json({ error: message }, { status });
  }

  // C4: Validate UUID format
  const uuidResult = uuidSchema.safeParse(params.userId);
  if (!uuidResult.success) {
    return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
  }

  const supabase = createClient();

  try {
    // Get user with purchases
    const { data: user, error: userError } = await supabase
      .from('User')
      .select(`
        *,
        purchases:Purchase(
          id,
          productCode,
          productName,
          amount,
          status,
          createdAt,
          expiresAt
        )
      `)
      .eq('id', uuidResult.data)
      .single();

    if (userError) throw userError;

    return NextResponse.json(user);
  } catch (error) {
    logger.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await requireAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    // 401 for auth issues, 403 for permission issues
    const status = message === 'Authentication required' ? 401 : 403;
    return NextResponse.json({ error: message }, { status });
  }

  // C4: Validate UUID format
  const uuidResult = uuidSchema.safeParse(params.userId);
  if (!uuidResult.success) {
    return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
  }

  const supabase = createClient();

  // C1: Parse and validate update data against whitelist schema
  let updates;
  try {
    const body = await request.json();
    updates = AdminUserUpdateSchema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Admin user update validation failed:', { errors: error.errors, userId: params.userId });
      return NextResponse.json(
        { error: 'Invalid update data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Ensure at least one field is being updated
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  try {
    const { data: user, error } = await supabase
      .from('User')
      .update(updates)
      .eq('id', uuidResult.data)
      .select()
      .single();

    if (error) throw error;

    logger.info('Admin updated user:', { userId: uuidResult.data, updatedFields: Object.keys(updates) });
    return NextResponse.json(user);
  } catch (error) {
    logger.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await requireAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    // 401 for auth issues, 403 for permission issues
    const status = message === 'Authentication required' ? 401 : 403;
    return NextResponse.json({ error: message }, { status });
  }

  // C4: Validate UUID format
  const uuidResult = uuidSchema.safeParse(params.userId);
  if (!uuidResult.success) {
    return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { error } = await supabase
      .from('User')
      .delete()
      .eq('id', uuidResult.data);

    if (error) throw error;

    logger.info('Admin deleted user:', { userId: uuidResult.data });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}