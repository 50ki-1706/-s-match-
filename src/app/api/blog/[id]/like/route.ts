import { deleteBlogLike, findBlog, findBlogLike, likeBlog } from '@/app/api/(Repository)/blog';
import { NextRequest, NextResponse } from 'next/server';
import { userIdInApi } from '../../../(lib)/userIdInApi';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await userIdInApi();
    const { id: blogId } = await params;

    const blog = await findBlog(blogId);

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    await likeBlog(blogId, userId);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create blog like' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await userIdInApi();
    const { id: blogId } = await params;

    // Check if blog exists
    const blog = await findBlogLike(blogId, userId);

    if (!blog) {
      return NextResponse.json({ message: 'Blog like not found' }, { status: 404 });
    }

    if (blog.userId !== userId) {
      return NextResponse.json(
        { message: 'You do not have permission to delete this blog like' },
        { status: 403 },
      );
    }

    await deleteBlogLike(blogId, userId);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete blog like' }, { status: 500 });
  }
}
