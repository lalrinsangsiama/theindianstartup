import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { logAdminAction } from '@/lib/audit-log';
import { createClient } from '@/lib/supabase/server';
import { adminProductSchema, validateRequest, validationErrorResponse } from '@/lib/validation-schemas';
import { checkRequestBodySize } from '@/lib/rate-limit';

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
  // Check request body size before parsing
  const bodySizeError = checkRequestBodySize(request);
  if (bodySizeError) {
    return bodySizeError;
  }

  let adminId: string | null = null;
  try {
    const adminResult = await requireAdmin();
    adminId = adminResult?.id || null;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  let rawData;
  try {
    rawData = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate input
  const validation = validateRequest(adminProductSchema, rawData);
  if (!validation.success) {
    return NextResponse.json(validationErrorResponse(validation), { status: 400 });
  }

  try {
    const { data: product, error } = await supabase
      .from('Product')
      .insert([validation.data])
      .select()
      .single();

    if (error) throw error;

    // Log admin action
    if (adminId) {
      await logAdminAction(adminId, 'CREATE_PRODUCT', {
        productCode: validation.data.code,
        productTitle: validation.data.title,
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    logger.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}