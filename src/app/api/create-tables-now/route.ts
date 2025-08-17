import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Please login to create tables',
        authError: authError?.message
      }, { status: 401 });
    }

    // Allow any authenticated user (since we need to create tables for testing)
    if (!user.email?.includes('lalrin.sangsiama@gmail.com')) {
      return NextResponse.json({
        error: 'Only authorized for specific user',
        userEmail: user.email
      }, { status: 403 });
    }

    const results = [];

    // Create User table using direct SQL execution through Supabase
    try {
      // Check if RPC function exists and execute SQL
      const sqlCommands = [
        `
        CREATE TABLE IF NOT EXISTS public."User" (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          phone TEXT,
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "currentDay" INTEGER DEFAULT 1,
          "startedAt" TIMESTAMP,
          "completedAt" TIMESTAMP,
          "totalXP" INTEGER DEFAULT 0,
          "currentStreak" INTEGER DEFAULT 0,
          "longestStreak" INTEGER DEFAULT 0,
          badges TEXT[] DEFAULT '{}',
          avatar TEXT,
          bio TEXT,
          "linkedinUrl" TEXT,
          "twitterUrl" TEXT,
          "websiteUrl" TEXT
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS public."StartupPortfolio" (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
          "userId" TEXT UNIQUE NOT NULL,
          "startupName" TEXT,
          tagline TEXT,
          logo TEXT,
          "problemStatement" TEXT,
          solution TEXT,
          "valueProposition" TEXT,
          "targetMarket" JSONB,
          competitors JSONB,
          "marketSize" JSONB,
          "revenueStreams" JSONB,
          "pricingStrategy" JSONB,
          domain TEXT,
          "socialHandles" JSONB,
          "entityType" TEXT,
          "complianceStatus" JSONB,
          "mvpDescription" TEXT,
          features JSONB,
          "userFeedback" JSONB,
          "salesStrategy" JSONB,
          "customerPersonas" JSONB,
          projections JSONB,
          "fundingNeeds" INTEGER,
          "pitchDeck" TEXT,
          "onePageSummary" TEXT,
          "updatedAt" TIMESTAMP DEFAULT NOW(),
          CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS public."XPEvent" (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
          "userId" TEXT NOT NULL,
          type TEXT NOT NULL,
          points INTEGER NOT NULL,
          description TEXT NOT NULL,
          "createdAt" TIMESTAMP DEFAULT NOW(),
          CONSTRAINT fk_user_xp FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE
        );
        `
      ];

      for (let i = 0; i < sqlCommands.length; i++) {
        const tableName = i === 0 ? 'User' : i === 1 ? 'StartupPortfolio' : 'XPEvent';
        try {
          // Try using rpc method if available
          const { error } = await supabase.rpc('exec_sql', { sql: sqlCommands[i] });
          
          results.push({
            table: tableName,
            success: !error,
            error: error?.message || null,
            method: 'rpc'
          });
        } catch (rpcError: any) {
          // If RPC fails, return the error details
          results.push({
            table: tableName,
            success: false,
            error: `RPC not available: ${rpcError.message}`,
            method: 'rpc_failed',
            sql: sqlCommands[i]
          });
        }
      }

    } catch (error: any) {
      results.push({
        table: 'general',
        success: false,
        error: error.message
      });
    }

    return NextResponse.json({
      message: 'Table creation attempted',
      userId: user.id,
      userEmail: user.email,
      results,
      note: 'If RPC failed, you may need to execute the SQL commands manually in Supabase SQL Editor'
    });
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}