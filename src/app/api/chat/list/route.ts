import { NextResponse } from 'next/server';
import { userIdInApi } from '../../(lib)/userIdInApi';
import { getChatRoomList } from '../../(Repository)/chat';

export async function GET() {
  try {
    const userId = await userIdInApi();
    const chatRooms = await getChatRoomList(userId);
    return NextResponse.json(chatRooms);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch chat rooms' }, { status: 500 });
  }
}
