import { findDMRoom, getDMRoomWithMessages } from '@/app/api/(Repository)/dm';
import {
  createMessage,
  deleteMessage,
  findMessage,
  updateMessage,
} from '@/app/api/(Repository)/message';
import { NextRequest, NextResponse } from 'next/server';
import { userIdInApi } from '../../../(lib)/userIdInApi';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await userIdInApi();
    const { id: roomId } = await params;

    const dmRoom = await getDMRoomWithMessages(roomId);

    if (!dmRoom) {
      return NextResponse.json({ message: 'DM room not found' }, { status: 404 });
    }

    const isParticipant = dmRoom.participants.some((p) => p.user.id === userId);
    if (!isParticipant) {
      return NextResponse.json(
        { message: 'You are not a participant of this DM room' },
        { status: 403 },
      );
    }

    return NextResponse.json(dmRoom);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch DM room' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const senderId = await userIdInApi();
    const { id: roomId } = await params;
    const { content } = await request.json();

    const dmRoom = await findDMRoom(roomId);

    if (!dmRoom) {
      return NextResponse.json({ message: 'DM room not found' }, { status: 404 });
    }

    const isParticipant = dmRoom.participants.some((p) => p.userId === senderId);
    if (!isParticipant) {
      return NextResponse.json(
        { message: 'You are not a participant of this DM room' },
        { status: 403 },
      );
    }

    const message = await createMessage(roomId, senderId, content);
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create message' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await userIdInApi();
    const { messageId, content } = await request.json();

    const message = await findMessage(messageId);

    if (!message) {
      return NextResponse.json({ message: 'Message not found' }, { status: 404 });
    }

    if (message.senderId !== userId) {
      return NextResponse.json({ message: 'You can only edit your own messages' }, { status: 403 });
    }

    await updateMessage(messageId, content);
    return NextResponse.json({ message: 'Message updated successfully' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await userIdInApi();
    const { messageId } = await request.json();

    const message = await findMessage(messageId);

    if (!message) {
      return NextResponse.json({ message: 'Message not found' }, { status: 404 });
    }

    if (message.senderId !== userId) {
      return NextResponse.json(
        { message: 'You can only delete your own messages' },
        { status: 403 },
      );
    }

    await deleteMessage(messageId);
    return NextResponse.json({ message: 'Message deleted successfully' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete message' }, { status: 500 });
  }
}
