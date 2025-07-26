import { NextRequest, NextResponse } from 'next/server';
import { getProfile, updateProfile } from '../../(Repository)/profile';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;
    const profile = await getProfile(userId);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;
    const body = await request.json();

    await updateProfile(body, userId);
    return NextResponse.json({ message: 'no content' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
