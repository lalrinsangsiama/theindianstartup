import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../lib/supabase/server';

export async function POST(request: NextRequest) {
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

    // Test data
    const testData = {
      founderName: 'Test Founder',
      phone: '1234567890',
      startupName: 'Test Startup',
      startupIdea: 'Test idea for debugging',
      targetMarket: 'Test market'
    };

    // Try to insert into different possible table names
    const results: {
      userId: string;
      userEmail: string | undefined;
      attempts: Array<{
        table: string;
        success: boolean;
        error?: string;
        data: any;
      }>;
    } = {
      userId: user.id,
      userEmail: user.email,
      attempts: []
    };

    // Try 1: lowercase 'user'
    try {
      const { data: result1, error: error1 } = await supabase
        .from('user')
        .insert({
          id: user.id,
          email: user.email!,
          name: testData.founderName,
          phone: testData.phone,
          startedAt: new Date().toISOString(),
        })
        .select('*')
        .maybeSingle();
        
      results.attempts.push({
        table: 'user (lowercase)',
        success: !error1,
        error: error1?.message,
        data: result1
      });
    } catch (e: any) {
      results.attempts.push({
        table: 'user (lowercase)',
        success: false,
        error: e.message,
        data: null
      });
    }

    // Try 2: PascalCase 'User'
    try {
      const { data: result2, error: error2 } = await supabase
        .from('User')
        .insert({
          id: user.id + '_test',
          email: 'test_' + user.email!,
          name: testData.founderName,
          phone: testData.phone,
          startedAt: new Date().toISOString(),
        })
        .select('*')
        .maybeSingle();
        
      results.attempts.push({
        table: 'User (PascalCase)',
        success: !error2,
        error: error2?.message,
        data: result2
      });
    } catch (e: any) {
      results.attempts.push({
        table: 'User (PascalCase)',
        success: false,
        error: e.message,
        data: null
      });
    }

    // Try 3: Check what tables actually exist
    try {
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_table_names')
        .single();
        
      results.attempts.push({
        table: 'RPC get_table_names',
        success: !tablesError,
        error: tablesError?.message,
        data: tables
      });
    } catch (e: any) {
      results.attempts.push({
        table: 'RPC get_table_names',
        success: false,
        error: e.message,
        data: null
      });
    }

    return NextResponse.json(results);
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}