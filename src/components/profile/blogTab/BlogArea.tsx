import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle } from 'lucide-react';
import { blogPostsType } from '../blogTab';

const BlogArea = ({ blogPosts }: { blogPosts: blogPostsType[] }) => {
  return (
    <>
      {blogPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className='pt-6'>
            <div className='flex items-start gap-3'>
              <Avatar className='size-10'>
                <AvatarImage src='/placeholder.svg?height=40&width=40' />
                <AvatarFallback>YT</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div className='mb-2 flex items-center gap-2'>
                  <span className='font-medium'>山田太郎</span>
                  <span className='text-sm text-gray-500'>{post.timestamp}</span>
                </div>
                <p className='mb-4 text-gray-700'>{post.content}</p>

                <div className='mb-4 flex items-center gap-4'>
                  <Button variant='ghost' size='sm' className='text-gray-600'>
                    <Heart className='mr-1 size-4' />
                    {post.likes}
                  </Button>
                  <Button variant='ghost' size='sm' className='text-gray-600'>
                    <MessageCircle className='mr-1 size-4' />
                    {post.comments.length}
                  </Button>
                </div>

                <div className='space-y-3'>
                  {post.comments.map((comment, index) => (
                    <div key={index} className='flex items-start gap-2'>
                      <Avatar className='size-8'>
                        <AvatarImage src='/placeholder.svg?height=32&width=32' />
                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex-1 rounded-lg bg-gray-50 p-3'>
                        <div className='mb-1 flex items-center gap-2'>
                          <span className='text-sm font-medium'>{comment.user}</span>
                          <span className='text-xs text-gray-500'>{comment.timestamp}</span>
                        </div>
                        <p className='text-sm'>{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  <div className='mt-3 flex items-center gap-2'>
                    <Avatar className='size-8'>
                      <AvatarImage src='/placeholder.svg?height=32&width=32' />
                      <AvatarFallback>YT</AvatarFallback>
                    </Avatar>
                    <Input placeholder='コメントを書く...' className='flex-1' />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default BlogArea;
