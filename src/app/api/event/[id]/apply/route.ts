import { userIdInApi } from '@/app/api/(lib)/userIdInApi';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await userIdInApi();
    const { id: eventId } = await params;

    await prisma.eventApplicant.create({
      data: {
        eventId,
        userId,
      },
    });

    return NextResponse.json({ message: 'Successfully applied to the event' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to apply to the event' }, { status: 500 });
  }
}
