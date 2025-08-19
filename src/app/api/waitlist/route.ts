import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
  productCode: z.string().min(1, 'Product code is required'),
  name: z.string().min(1, 'Name is required').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, productCode, name } = waitlistSchema.parse(body);

    const supabase = createClient();

    // Check if email is already on waitlist for this product
    const { data: existing } = await supabase
      .from('Waitlist')
      .select('id')
      .eq('email', email)
      .eq('productCode', productCode)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { message: 'You\'re already on the waitlist for this product!' },
        { status: 200 }
      );
    }

    // Add to waitlist
    const { error } = await supabase
      .from('Waitlist')
      .insert({
        email,
        productCode,
        name: name || null,
        joinedAt: new Date().toISOString(),
        notified: false
      });

    if (error) {
      console.error('Waitlist error:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    // Send confirmation email (optional)
    // await sendWaitlistConfirmation(email, productCode);

    return NextResponse.json({
      message: 'Successfully joined waitlist! We\'ll notify you when the course launches.',
      success: true
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productCode = searchParams.get('productCode');

    if (!productCode) {
      return NextResponse.json(
        { error: 'Product code is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get waitlist count for the product
    const { count, error } = await supabase
      .from('Waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('productCode', productCode);

    if (error) {
      console.error('Waitlist count error:', error);
      return NextResponse.json(
        { error: 'Failed to get waitlist count' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      count: count || 0,
      productCode
    });

  } catch (error) {
    console.error('Waitlist GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}