import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin, UserRole } from '@/lib/auth';
import { logUserRoleChange } from '@/lib/audit-log';
import { z } from 'zod';

// Valid roles that can be assigned
const VALID_ROLES: UserRole[] = ['user', 'admin', 'support', 'moderator'];

const updateRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(['user', 'admin', 'support', 'moderator']),
});

/**
 * Update a user's role (admin only)
 * POST /api/admin/users/role
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin access
    const admin = await requireAdmin({
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    // Parse and validate request body
    const body = await request.json();
    const result = updateRoleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.issues },
        { status: 400 }
      );
    }

    const { userId, role } = result.data;

    // Prevent admin from demoting themselves
    if (userId === admin.id && role !== 'admin') {
      return NextResponse.json(
        { error: 'Cannot change your own role' },
        { status: 403 }
      );
    }

    const supabase = createClient();

    // Get current user role
    const { data: targetUser, error: fetchError } = await supabase
      .from('User')
      .select('id, email, role')
      .eq('id', userId)
      .single();

    if (fetchError || !targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const oldRole = targetUser.role || 'user';

    // Update role
    const { error: updateError } = await supabase
      .from('User')
      .update({ role })
      .eq('id', userId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update role', details: updateError.message },
        { status: 500 }
      );
    }

    // Log the role change
    await logUserRoleChange(
      admin.id,
      userId,
      oldRole,
      role,
      request.headers.get('x-forwarded-for') || undefined
    );

    return NextResponse.json({
      success: true,
      message: `Role updated from ${oldRole} to ${role}`,
      user: {
        id: userId,
        email: targetUser.email,
        oldRole,
        newRole: role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Admin access required') ||
          error.message.includes('Authentication required')) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get all users with their roles (admin only)
 * GET /api/admin/users/role
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdmin({
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
    });

    const supabase = createClient();

    const { data: users, error } = await supabase
      .from('User')
      .select('id, email, name, role, createdAt')
      .order('createdAt', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    // Group by role for easy filtering
    const byRole = {
      admin: users?.filter(u => u.role === 'admin') || [],
      support: users?.filter(u => u.role === 'support') || [],
      moderator: users?.filter(u => u.role === 'moderator') || [],
      user: users?.filter(u => u.role === 'user' || !u.role) || [],
    };

    return NextResponse.json({
      users,
      byRole,
      validRoles: VALID_ROLES,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Admin access required') ||
          error.message.includes('Authentication required')) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
