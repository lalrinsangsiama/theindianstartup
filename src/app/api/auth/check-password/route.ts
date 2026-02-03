import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';

/**
 * POST /api/auth/check-password
 * Check if password has been exposed in data breaches using Have I Been Pwned
 * Uses k-anonymity - only sends first 5 chars of SHA1 hash
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Don't check very short passwords
    if (password.length < 6) {
      return NextResponse.json({
        isBreached: false,
        breachCount: null,
      });
    }

    // Generate SHA1 hash
    const hash = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex')
      .toUpperCase();

    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    // Query HIBP API with k-anonymity
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        headers: {
          'Add-Padding': 'true',
          'User-Agent': 'TheIndianStartup-PasswordCheck',
        },
        // Cache for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      // Don't fail if HIBP is unavailable
      logger.warn(`HIBP API unavailable: ${response.status}`);
      return NextResponse.json({
        isBreached: false,
        breachCount: null,
      });
    }

    const text = await response.text();
    const lines = text.split('\n');

    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix.trim() === suffix) {
        return NextResponse.json({
          isBreached: true,
          breachCount: parseInt(count.trim(), 10),
        });
      }
    }

    return NextResponse.json({
      isBreached: false,
      breachCount: null,
    });
  } catch (error) {
    logger.error('Password breach check error:', error);
    // Don't fail the check if something goes wrong
    return NextResponse.json({
      isBreached: false,
      breachCount: null,
    });
  }
}
