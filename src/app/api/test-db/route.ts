import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
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
      databaseUrl: process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@') // Hide password
    });
  } catch (error: any) {
    await prisma.$disconnect();
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code,
      databaseUrl: process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@') // Hide password
    }, { status: 500 });
  }
}