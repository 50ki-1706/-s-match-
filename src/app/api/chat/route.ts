import { userIdInApi } from '@/app/api/(lib)/userIdInApi';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const organizerId = await userIdInApi();

    // ChatRoomを作成
    const chatRoom = await prisma.chatRoom.create({
      data: {
        participants: {
          create: [{ userId: organizerId }, { userId: userId }],
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        id: chatRoom.id,
        createdAt: chatRoom.createdAt,
        participants: chatRoom.participants,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('ChatRoom作成エラー:', error);
    return NextResponse.json({ error: 'ChatRoom作成に失敗しました。' }, { status: 500 });
  }
}
