import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized',
        authError: authError?.message
      }, { status: 401 });
    }

    // Simple tests
    const results: any = {
      userId: user.id,
      userEmail: user.email,
      tests: {}
    };

    // Test 1: Try to list users table with lowercase
    try {
      const { data: users, error: usersError, count } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .limit(1);
      
      results.tests.users_table = {
        success: !usersError,
        error: usersError?.message,
        count: count,
        sample: users?.[0]
      };
    } catch (e: any) {
      results.tests.users_table = {
        success: false,
        error: e.message
      };
    }

    // Test 2: Try auth.users (Supabase auth table)
    try {
      const { data: authUser, error: authUserError } = await supabase.auth.admin.getUserById(user.id);
      
      results.tests.auth_user = {
        success: !authUserError,
        error: authUserError?.message,
        data: authUser?.user
      };
    } catch (e: any) {
      results.tests.auth_user = {
        success: false,
        error: e.message
      };
    }

    // Test 3: Try to create a simple record in the users table
    try {
      const { data: insertResult, error: insertError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          raw_user_meta_data: { name: 'Test User' },
          created_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        })
        .select()
        .maybeSingle();
      
      results.tests.insert_user = {
        success: !insertError,
        error: insertError?.message,
        data: insertResult
      };
    } catch (e: any) {
      results.tests.insert_user = {
        success: false,
        error: e.message
      };
    }

    return NextResponse.json(results);
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}