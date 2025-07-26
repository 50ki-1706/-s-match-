import { userIdInApi } from '@/app/api/(lib)/userIdInApi';
import { deleteComment, findComment, updateComment } from '@/app/api/(Repository)/blog';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) => {
  try {
    const { commentId } = await params;
    const userId = await userIdInApi();

    // リクエストボディからcontentを取得
    const { content } = await req.json();

    // コメントの存在確認と所有者チェック
    const comment = await findComment(commentId);

    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    if (comment.userId !== userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // コメントを更新
    await updateComment(commentId, content);

    // 204 No Content を返す
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update comment' }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> },
) => {
  try {
    const { commentId } = await params;
    const userId = await userIdInApi();

    // コメントの存在確認と所有者チェック
    const comment = await findComment(commentId);

    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    if (comment.userId !== userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // コメントを削除
    await deleteComment(commentId);

    // 204 No Content を返す
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete comment' }, { status: 500 });
  }
};
