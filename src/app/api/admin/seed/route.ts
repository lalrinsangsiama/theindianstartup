import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // Check admin access
    await requireAdmin();
    
    // Run the seed script
    const { stdout, stderr } = await execAsync('npm run seed');
    
    if (stderr && !stderr.includes('Prisma schema loaded')) {
      return NextResponse.json(
        { success: false, error: stderr },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Seed completed successfully',
      output: stdout
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to run seed'
      },
      { status: 500 }
    );
  }
}