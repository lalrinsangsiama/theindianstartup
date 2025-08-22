import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  // Log environment info
  const dbUrl = process.env.DATABASE_URL;
  const directUrl = process.env.DIRECT_URL;
  
  logger.info('DATABASE_URL exists:', !!dbUrl);
  logger.info('DIRECT_URL exists:', !!directUrl);
  
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

  try {
    // Test basic connection
    await prisma.$connect();
    
    // Try a simple query
    const userCount = await prisma.user.count();
    
    await prisma.$disconnect();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      userCount,
      databaseUrl: dbUrl?.replace(/:[^:@]*@/, ':****@'), // Hide password
      directUrl: directUrl?.replace(/:[^:@]*@/, ':****@'), // Hide password
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      nodeEnv: process.env.NODE_ENV
    });
  } catch (error: any) {
    await prisma.$disconnect();
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code,
      stack: error.stack,
      databaseUrl: dbUrl?.replace(/:[^:@]*@/, ':****@'), // Hide password
      directUrl: directUrl?.replace(/:[^:@]*@/, ':****@'), // Hide password
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      nodeEnv: process.env.NODE_ENV
    }, { status: 500 });
  }
}