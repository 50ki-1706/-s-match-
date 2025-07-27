import { prisma } from '@/lib/prisma';
import { DmRoomList } from '../(type)/chat';
import { ChatRoomWithMessages } from '../(type)/message';

/**
 * 2人のユーザーIDでDMルームを作成し、参加者として両者を登録する
 * @param senderId 1人目のユーザーID
 * @param receiverId 2人目のユーザーID
 */
export const createChatRoomWithParticipants = async (
  senderId: string,
  userId2: string,
): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    const room = await tx.chatRoom.create({
      data: {},
    });

    await tx.chatRoomParticipant.createMany({
      data: [
        { roomId: room.id, userId: senderId },
        { roomId: room.id, userId: userId2 },
      ],
    });
  });
};

export const getChatRoomWithMessages = async (id: string): Promise<ChatRoomWithMessages | null> => {
  const dmRoom = await prisma.chatRoom.findUnique({
    where: { id },
    select: {
      id: true,
      participants: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      Message: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  if (!dmRoom) return null;

  // Date型をISO文字列に変換するのみ
  return {
    id: dmRoom.id,
    participants: dmRoom.participants,
    messages: dmRoom.Message.map((message) => ({
      ...message,
      createdAt: message.createdAt.toISOString(),
    })),
  };
};

export const findChatRoom = async (roomId: string) => {
  // DMルームの存在確認と参加者チェック
  const dmRoom = await prisma.chatRoom.findUnique({
    where: { id: roomId },
    include: {
      participants: true,
    },
  });

  return dmRoom;
};

export const getChatRoomList = async (userId: string): Promise<DmRoomList> => {
  const dmRooms = await prisma.chatRoom.findMany({
    where: {
      participants: {
        some: {
          userId,
        },
      },
    },
    select: {
      id: true,
      participants: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return dmRooms;
};
