import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { userIdInApi } from '../../(lib)/userIdInApi';
import { deleteBlog, findBlog, getSpecificBlog, updateBlog } from '../../(Repository)/blog';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: blogId } = await params;

    const blog = await getSpecificBlog(blogId);

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await userIdInApi();
    const { id: blogId } = await params;
    const { title, content } = await request.json();

    // Check if blog exists
    const blog = await findBlog(blogId);

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Check if user is the owner
    if (blog.userId !== userId) {
      return NextResponse.json(
        { message: 'You do not have permission to update this blog' },
        { status: 403 },
      );
    }

    await updateBlog(blogId, title, content);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update blog' }, { status: 500 });
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
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { userId: true },
    });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Check if user is the owner
    if (blog.userId !== userId) {
      return NextResponse.json(
        { message: 'You do not have permission to delete this blog' },
        { status: 403 },
      );
    }

    await deleteBlog(userId);

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete blog' }, { status: 500 });
  }
}
