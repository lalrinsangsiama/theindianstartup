import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  try {
    const { data: products, error } = await supabase
      .from('Product')
      .select(`
        *,
        _count: (
          modules:Module(count),
          purchases:Purchase(count)
        )
      `)
      .order('createdAt', { ascending: true });

    if (error) throw error;

    return NextResponse.json(products || []);
  } catch (error) {
    logger.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const productData = await request.json();

  try {
    const { data: product, error } = await supabase
      .from('Product')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(product);
  } catch (error) {
    logger.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}