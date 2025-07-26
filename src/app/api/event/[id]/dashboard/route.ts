import { userIdInApi } from '@/app/api/(lib)/userIdInApi';
import { NextRequest, NextResponse } from 'next/server';
import {
  deleteEvent,
  findEvent,
  getEventForDashboard,
  updateEvent,
} from '../../../(Repository)/event';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: eventId } = await params;
    const userId = await userIdInApi();

    const event = await getEventForDashboard(eventId);

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    if (event.organizerId !== userId) {
      return NextResponse.json(
        { message: 'You do not have permission to access this event' },
        { status: 403 },
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch event details' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const organizerId = await userIdInApi();
    const body = await request.json();

    const existingEvent = await findEvent(body.id);

    if (!existingEvent) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    if (existingEvent.organizerId !== organizerId) {
      return NextResponse.json(
        { message: 'You do not have permission to update this event' },
        { status: 403 },
      );
    }

    await updateEvent(body);

    return NextResponse.json({ message: 'Event updated successfully' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await userIdInApi();
    const { id: eventId } = await params;
    const event = await findEvent(eventId);

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    if (event.organizerId !== userId) {
      return NextResponse.json(
        { message: 'You do not have permission to delete this event' },
        { status: 403 },
      );
    }

    await deleteEvent(eventId);

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete event' }, { status: 500 });
  }
}
