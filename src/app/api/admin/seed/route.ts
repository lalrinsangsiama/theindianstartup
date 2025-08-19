import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { spawn } from 'child_process';

export async function POST() {
  try {
    // Check admin access
    await requireAdmin();
    
    // Use spawn instead of exec for better security
    // This prevents shell injection attacks
    const seedProcess = spawn('npm', ['run', 'seed'], {
      env: process.env,
      shell: false // Explicitly disable shell
    });
    
    let stdout = '';
    let stderr = '';
    
    // Collect output
    seedProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    seedProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    // Wait for process to complete
    await new Promise<void>((resolve, reject) => {
      seedProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Seed process exited with code ${code}`));
        } else {
          resolve();
        }
      });
      
      seedProcess.on('error', (err) => {
        reject(err);
      });
    });
    
    // Check for meaningful errors (ignore Prisma info messages)
    if (stderr && !stderr.includes('Prisma schema loaded')) {
      return NextResponse.json(
        { success: false, error: 'Seed process encountered errors' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Seed completed successfully'
      // Don't expose stdout in production
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to run seed process'
      },
      { status: 500 }
    );
  }
}