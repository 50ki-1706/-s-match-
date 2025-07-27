import { NextRequest, NextResponse } from 'next/server';
import { userIdInApi } from '../(lib)/userIdInApi';
import { getProfile, updateProfile } from '../(Repository)/profile';

export async function GET(request: NextRequest) {
  try {
    const userId = await userIdInApi();
    console.log(userId);
    const profile = await getProfile(userId);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await userIdInApi();
    const body = await request.json();

    await updateProfile(body, userId);
    return NextResponse.json({ message: 'no content' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'internal server error' }, { status: 500 });
  }
}
