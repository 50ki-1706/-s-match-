import { NextRequest, NextResponse } from 'next/server';
import { getProfile } from '../../(Repository)/profile';

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
