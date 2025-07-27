'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ProfileTabs = () => {
  return (
    <TabsList className='mb-8 grid w-full grid-cols-3'>
      <TabsTrigger value='profile'>プロフィール</TabsTrigger>
      <TabsTrigger value='events'>イベント</TabsTrigger>
      <TabsTrigger value='blog'>ブログ</TabsTrigger>
    </TabsList>
  );
};
