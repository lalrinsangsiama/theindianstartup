import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { supportManager } from '@/lib/customer-support';
import { checkRequestBodySize } from '@/lib/rate-limit';
import { z } from 'zod';

// Validate ticketId format (alphanumeric with hyphens, typical ticket ID format)
const ticketIdSchema = z.string()
  .min(1, 'Ticket ID is required')
  .max(50, 'Ticket ID too long')
  .regex(/^[A-Za-z0-9\-_]+$/, 'Invalid ticket ID format');

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Validate route parameter
  const { ticketId } = await params;
  const ticketIdValidation = ticketIdSchema.safeParse(ticketId);
  if (!ticketIdValidation.success) {
    return NextResponse.json({ error: 'Invalid ticket ID format' }, { status: 400 });
  }

  // Check request body size
  const bodySizeError = checkRequestBodySize(request);
  if (bodySizeError) {
    return bodySizeError;
  }

  try {
    const updates = await request.json();
    const ticket = await supportManager.updateTicket(ticketIdValidation.data, updates);
    return NextResponse.json(ticket);
  } catch (error) {
    logger.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Validate route parameter
  const { ticketId } = await params;
  const ticketIdValidation = ticketIdSchema.safeParse(ticketId);
  if (!ticketIdValidation.success) {
    return NextResponse.json({ error: 'Invalid ticket ID format' }, { status: 400 });
  }

  // Check request body size
  const bodySizeError = checkRequestBodySize(request);
  if (bodySizeError) {
    return bodySizeError;
  }

  try {
    const responseData = await request.json();
    const response = await supportManager.respondToTicket(ticketIdValidation.data, responseData);
    return NextResponse.json(response);
  } catch (error) {
    logger.error('Error responding to ticket:', error);
    return NextResponse.json(
      { error: 'Failed to respond to ticket' },
      { status: 500 }
    );
  }
}