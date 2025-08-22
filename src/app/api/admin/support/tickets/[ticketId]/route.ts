import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { supportManager } from '@/lib/customer-support';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updates = await request.json();
    const ticket = await supportManager.updateTicket(params.ticketId, updates);
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
  { params }: { params: { ticketId: string } }
) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const responseData = await request.json();
    const response = await supportManager.respondToTicket(params.ticketId, responseData);
    return NextResponse.json(response);
  } catch (error) {
    logger.error('Error responding to ticket:', error);
    return NextResponse.json(
      { error: 'Failed to respond to ticket' },
      { status: 500 }
    );
  }
}