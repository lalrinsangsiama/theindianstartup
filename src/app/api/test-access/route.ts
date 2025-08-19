import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '@/lib/auth';

export async function POST() {
  try {
    const user = await requireAuth();
    
    // Use service role for testing
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Create a test purchase record
    const purchaseDate = new Date();
    const accessEndDate = new Date();
    accessEndDate.setFullYear(accessEndDate.getFullYear() + 1);

    const { error } = await supabase
      .from('Purchase')
      .insert({
        userId: user.id,
        productType: '30_day_guide',
        productName: '30-Day India Launch Sprint - Test Access',
        amount: 100, // ₹1 in paise
        currency: 'INR',
        status: 'completed',
        razorpayOrderId: `test_order_${Date.now()}`,
        razorpayPaymentId: `test_payment_${Date.now()}`,
        purchaseDate: purchaseDate.toISOString(),
        accessEndDate: accessEndDate.toISOString(),
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

    if (error) {
      console.error('Error creating test purchase:', error);
      
      // If Purchase table doesn't exist, return success anyway
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return NextResponse.json({
          success: true,
          message: 'Test access granted (Purchase table not available)',
          accessEndDate: accessEndDate.toISOString(),
          warning: 'Purchase tracking disabled - table not found'
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to create test purchase' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test access granted successfully',
      accessEndDate: accessEndDate.toISOString()
    });

  } catch (error) {
    console.error('Test access error:', error);
    return NextResponse.json(
      { error: 'Failed to grant test access' },
      { status: 500 }
    );
  }
}