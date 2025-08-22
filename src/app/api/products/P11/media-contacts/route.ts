import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P11 (Premium tier only)
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P11', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Premium access required for media contacts' }, { status: 403 });
    }

    // Get P11 product with media database
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select('metadata')
      .eq('code', 'P11')
      .single();

    if (productError) {
      throw new Error('Product not found');
    }

    const mediaDatabase = product.metadata?.media_database;

    if (!mediaDatabase) {
      return NextResponse.json({ 
        error: 'Media database not available',
        message: 'Media contacts are being updated. Please check back soon.'
      }, { status: 404 });
    }

    // Return structured media contacts
    return NextResponse.json({
      success: true,
      mediaContacts: {
        totalContacts: 500,
        lastUpdated: '2025-01-01',
        categories: {
          national_english: {
            title: 'National English Media',
            count: mediaDatabase.national_english?.length || 0,
            publications: mediaDatabase.national_english || []
          },
          digital_first: {
            title: 'Digital-First Publications',
            count: mediaDatabase.digital_first?.length || 0,
            publications: mediaDatabase.digital_first || []
          },
          international: {
            title: 'International Media',
            count: mediaDatabase.international?.length || 0,
            publications: mediaDatabase.international || []
          },
          tv_channels: {
            title: 'TV Channels & Shows',
            count: mediaDatabase.tv_channels?.length || 0,
            channels: mediaDatabase.tv_channels || []
          }
        },
        usage_guidelines: [
          'These contacts are for P11 course participants only',
          'Always personalize your pitches to the journalist\'s beat',
          'Respect embargo and exclusive agreements',
          'Follow up professionally and don\'t spam',
          'Build relationships, don\'t just pitch'
        ]
      }
    });

  } catch (error) {
    console.error('Error fetching media contacts:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}