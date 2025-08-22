import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { withSecurity } from '@/lib/production-security';
import { monitoring } from '@/lib/production-monitoring';

async function handler(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { url, metrics, timestamp } = body;

    // Log SEO metrics
    if (process.env.NODE_ENV === 'production') {
      monitoring.trackPerformance('page_load', {
        duration: metrics.loadTime,
        metadata: {
          url,
          type: 'seo_metrics',
          renderTime: metrics.renderTime,
          interactiveTime: metrics.interactiveTime,
          seoScore: metrics.seoScore,
          timestamp,
        },
      });

      // Track specific SEO events
      if (metrics.seoScore) {
        monitoring.trackUserAction('seo_score', {
          value: metrics.seoScore,
          label: url,
          metadata: {
            loadTime: metrics.loadTime,
            renderTime: metrics.renderTime,
            interactiveTime: metrics.interactiveTime,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('SEO analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const POST = withSecurity(handler, {
  rateLimit: 'api_default',
});