import { userIdInApi } from '@/app/api/(lib)/userIdInApi';
import { createCommentLike, deleteCommentLike, findCommentLike } from '@/app/api/(Repository)/blog';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) => {
  try {
    const { commentId } = await params;
    const userId = await userIdInApi();

    // コメントいいねを作成
    await createCommentLike(commentId, userId);

    // 204 No Content を返す
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to like comment' }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) => {
  try {
    const { commentId } = await params;
    const userId = await userIdInApi();

    // コメントいいねの存在確認
    const commentLike = await findCommentLike(commentId, userId);

    if (!commentLike) {
      return NextResponse.json({ message: 'Comment like not found' }, { status: 404 });
    }

    if (commentLike.userId !== userId) {
      return NextResponse.json(
        { message: 'You are not the owner of this comment' },
        { status: 403 },
      );
    }

    // コメントいいねを削除
    await deleteCommentLike(commentId, userId);

    // 204 No Content を返す
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to unlike comment' }, { status: 500 });
  }
};
