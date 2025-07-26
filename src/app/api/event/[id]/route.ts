import { NextRequest, NextResponse } from 'next/server';
import { getEvent } from '../../(Repository)/event';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: eventId } = await params;
    const event = await getEvent(eventId);

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch event' }, { status: 500 });
  }
}
