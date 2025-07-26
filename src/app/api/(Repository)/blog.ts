import { prisma } from '@/lib/prisma';

export const getSpecificBlog = async (blogId: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: {
      id: true,
      title: true,
      content: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      BlogLike: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      BlogComment: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          BlogCommentLike: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return blog;
};

export const createBlog = async (userId: string, title: string, content: string) => {
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return blog;
};

export const findBlog = async (blogId: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { userId: true },
  });

  return blog;
};

export const updateBlog = async (blogId: string, title: string, content: string) => {
  await prisma.blog.update({
    where: { id: blogId },
    data: { title, content },
  });
};

export const deleteBlog = async (blogId: string) => {
  await prisma.blog.delete({
    where: { id: blogId },
  });
};

export const likeBlog = async (blogId: string, userId: string) => {
  await prisma.blogLike.create({
    data: {
      blogId,
      userId,
    },
  });
};

export const findBlogLike = async (blogId: string, userId: string) => {
  const blog = await prisma.blogLike.findUnique({
    where: { blogId_userId: { blogId, userId } },
  });

  return blog;
};

export const deleteBlogLike = async (blogId: string, userId: string) => {
  await prisma.blogLike.delete({
    where: {
      blogId_userId: {
        blogId,
        userId,
      },
    },
  });
};

export const createComment = async (blogId: string, userId: string, content: string) => {
  // ブログコメントを作成
  const newComment = await prisma.blogComment.create({
    data: {
      blogId,
      userId,
      content,
    },
  });

  return newComment;
};

export const findComment = async (commentId: string) => {
  const comment = await prisma.blogComment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  return comment;
};

export const updateComment = async (commentId: string, content: string) => {
  await prisma.blogComment.update({
    where: { id: commentId },
    data: { content },
  });
};

export const deleteComment = async (commentId: string) => {
  await prisma.blogComment.delete({
    where: { id: commentId },
  });
};

export const createCommentLike = async (commentId: string, userId: string) => {
  await prisma.blogCommentLike.create({
    data: {
      blogCommentId: commentId,
      userId,
    },
  });
};

export const findCommentLike = async (commentId: string, userId: string) => {
  const commentLike = await prisma.blogCommentLike.findUnique({
    where: {
      blogCommentId_userId: {
        blogCommentId: commentId,
        userId,
      },
    },
  });

  return commentLike;
};

export const deleteCommentLike = async (commentId: string, userId: string) => {
  await prisma.blogCommentLike.delete({
    where: {
      blogCommentId_userId: {
        blogCommentId: commentId,
        userId,
      },
    },
  });
};
