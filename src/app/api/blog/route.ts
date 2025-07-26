import { NextRequest, NextResponse } from 'next/server';
import { userIdInApi } from '../(lib)/userIdInApi';
import { createBlog } from '../(Repository)/blog';

export async function POST(request: NextRequest) {
  try {
    const userId = await userIdInApi();
    const { title, content } = await request.json();

    const blog = await createBlog(userId, title, content);

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create blog' }, { status: 500 });
  }
}
