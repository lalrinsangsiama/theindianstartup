import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user  
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Only allow specific admin emails to run this
    const adminEmails = ['lalrin.sangsiama@gmail.com', 'admin@theindianstartup.in'];
    if (!adminEmails.includes(user.email || '')) {
      return NextResponse.json({
        error: 'Not authorized to create tables'
      }, { status: 403 });
    }

    const results = [];

    // Create User table
    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public."User" (
            id VARCHAR PRIMARY KEY,
            email VARCHAR UNIQUE NOT NULL,
            name VARCHAR NOT NULL,
            phone VARCHAR,
            "createdAt" TIMESTAMP DEFAULT NOW(),
            "currentDay" INTEGER DEFAULT 1,
            "startedAt" TIMESTAMP,
            "completedAt" TIMESTAMP,
            "totalXP" INTEGER DEFAULT 0,
            "currentStreak" INTEGER DEFAULT 0,
            "longestStreak" INTEGER DEFAULT 0,
            badges TEXT[],
            avatar VARCHAR,
            bio TEXT,
            "linkedinUrl" VARCHAR,
            "twitterUrl" VARCHAR,
            "websiteUrl" VARCHAR
          );
        `
      });
      
      results.push({
        table: 'User',
        success: !error,
        error: error?.message
      });
    } catch (e: any) {
      results.push({
        table: 'User',
        success: false,
        error: e.message
      });
    }

    // Create StartupPortfolio table
    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public."StartupPortfolio" (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            "userId" VARCHAR UNIQUE NOT NULL,
            "startupName" VARCHAR,
            tagline VARCHAR,
            logo VARCHAR,
            "problemStatement" TEXT,
            solution TEXT,
            "valueProposition" TEXT,
            "targetMarket" JSONB,
            competitors JSONB,
            "marketSize" JSONB,
            "revenueStreams" JSONB,
            "pricingStrategy" JSONB,
            domain VARCHAR,
            "socialHandles" JSONB,
            "entityType" VARCHAR,
            "complianceStatus" JSONB,
            "mvpDescription" TEXT,
            features JSONB,
            "userFeedback" JSONB,
            "salesStrategy" JSONB,
            "customerPersonas" JSONB,
            projections JSONB,
            "fundingNeeds" INTEGER,
            "pitchDeck" VARCHAR,
            "onePageSummary" TEXT,
            "updatedAt" TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY ("userId") REFERENCES public."User"(id)
          );
        `
      });
      
      results.push({
        table: 'StartupPortfolio',
        success: !error,
        error: error?.message
      });
    } catch (e: any) {
      results.push({
        table: 'StartupPortfolio',
        success: false,
        error: e.message
      });
    }

    // Create XPEvent table
    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS public."XPEvent" (
            id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
            "userId" VARCHAR NOT NULL,
            type VARCHAR NOT NULL,
            points INTEGER NOT NULL,
            description VARCHAR NOT NULL,
            "createdAt" TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY ("userId") REFERENCES public."User"(id)
          );
        `
      });
      
      results.push({
        table: 'XPEvent',
        success: !error,
        error: error?.message
      });
    } catch (e: any) {
      results.push({
        table: 'XPEvent',
        success: false,
        error: e.message
      });
    }

    return NextResponse.json({
      message: 'Table creation completed',
      results
    });
    
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}