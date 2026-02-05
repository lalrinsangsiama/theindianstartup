import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { calculateBundleUpgradePrice } from '@/lib/product-access';
import { logger } from '@/lib/logger';

/**
 * GET /api/purchase/upgrade-price
 * Returns personalized ALL_ACCESS upgrade pricing for the authenticated user.
 * Credits the user for courses they already own.
 */
export async function GET() {
  try {
    const user = await requireAuth();

    const upgradeResult = await calculateBundleUpgradePrice(user.id);

    return NextResponse.json(upgradeResult);
  } catch (error) {
    // If not authenticated, return error
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    logger.error('Error fetching upgrade price:', error);
    return NextResponse.json(
      { error: 'Failed to calculate upgrade price' },
      { status: 500 }
    );
  }
}
