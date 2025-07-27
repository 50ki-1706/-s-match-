import { NextRequest, NextResponse } from 'next/server';
import { joinEvent } from '../../(Repository)/event';
import { userIdInApi } from '../../(lib)/userIdInApi';

export async function POST(request: NextRequest) {
  try {
    const { eventId } = await request.json();
    const userId = await userIdInApi();

    await joinEvent(userId, eventId, null);

    return NextResponse.json({ message: 'Successfully joined the event' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to join the event' }, { status: 500 });
  }
}
