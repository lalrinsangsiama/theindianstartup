import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

// Validation schema for payment verification
const paymentVerificationSchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1)
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Validate request body
    const body = await request.json();
    const result = paymentVerificationSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: result.error.errors },
        { status: 400 }
      );
    }
    
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = result.data;

    // Verify payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Calculate purchase date
    const purchasedAt = new Date();

    // Update purchase record
    const { data: purchase, error: updateError } = await supabase
      .from('Purchase')
      .update({
        status: 'completed',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        purchasedAt: purchasedAt.toISOString(),
      })
      .eq('razorpayOrderId', razorpay_order_id)
      .eq('userId', user.id)
      .select(`
        *,
        product:Product(*)
      `)
      .single();

    if (updateError) {
      logger.error('Error updating purchase:', updateError);
      return NextResponse.json(
        { error: 'Failed to update purchase record' },
        { status: 500 }
      );
    }

    if (!purchase) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    // If this is P1 purchase, update user's currentDay to 1 to start the journey
    if (purchase.product?.code === 'P1') {
      await supabase
        .from('User')
        .update({
          currentDay: 1,
        })
        .eq('id', user.id);
    }

    // Send success email (optional - commented out until email system is implemented)
    /*
    try {
      const productName = purchase.product?.title || 'Product Purchase';
      const amount = purchase.amount / 100; // Convert paise to rupees
      
      await fetch('/api/email/purchase-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.user_metadata?.name,
          amount: amount,
          productName: productName,
          expiresAt: purchase.expiresAt,
        }),
      });
    } catch (emailError) {
      logger.error('Failed to send confirmation email:', emailError);
      // Don't fail the payment verification
    }
    */

    return NextResponse.json({
      message: 'Payment verified successfully',
      purchase: {
        id: purchase.id,
        productCode: purchase.product?.code,
        productTitle: purchase.product?.title,
        amount: purchase.amount / 100, // Convert to rupees
        expiresAt: purchase.expiresAt,
      }
    });

  } catch (error) {
    logger.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}