'use client';

import BlogArea from './BlogArea';
import PostArea from './PostArea';

export type blogPostsType = {
  id: number;
  content: string;
  timestamp: string;
  likes: number;
  comments: { user: string; content: string; timestamp: string }[];
};

export const BlogTab = () => {
  const blogPosts: blogPostsType[] = [
    {
      id: 1,
      content:
        '今日は新しい楽器を購入しました！ギターの音色が素晴らしくて、早く皆さんに聞いてもらいたいです。',
      timestamp: '2時間前',
      likes: 12,
      comments: [
        { user: '田中太郎', content: 'どんなギターですか？', timestamp: '1時間前' },
        { user: '佐藤花子', content: '素敵ですね！今度聞かせてください', timestamp: '30分前' },
      ],
    },
    {
      id: 2,
      content:
        '昨日のライブは最高でした！観客の皆さんとの一体感が忘れられません。次回のイベントも楽しみです。',
      timestamp: '1日前',
      likes: 28,
      comments: [{ user: '山田次郎', content: '素晴らしい演奏でした！', timestamp: '1日前' }],
    },
  ];

  return (
    <div className='space-y-6'>
      <PostArea />
      <BlogArea blogPosts={blogPosts} />
    </div>
  );
};
