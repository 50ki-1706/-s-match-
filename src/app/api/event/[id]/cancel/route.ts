import { userIdInApi } from '@/app/api/(lib)/userIdInApi';
import { cancelEvent } from '@/app/api/(Repository)/event';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await userIdInApi();
    const { id: eventId } = await params;
    await cancelEvent(eventId, userId);
    return NextResponse.json({ message: 'event canceled' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
