import { NextRequest, NextResponse } from 'next/server';
import { createEvent } from '../(Repository)/event';
import { userIdInApi } from '../(lib)/userIdInApi';

export async function POST(request: NextRequest) {
  try {
    const organizerId = await userIdInApi();
    const body = await request.json();
    const newEvent = await createEvent(body, organizerId);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create event' }, { status: 500 });
  }
}
