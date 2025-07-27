import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const PostArea = () => {
  return (
    <Card>
      <CardContent className='pt-6'>
        <Textarea placeholder='今何をしていますか？' rows={3} className='mb-4' />
        <Button style={{ backgroundColor: '#0de1db', color: 'white' }}>投稿する</Button>
      </CardContent>
    </Card>
  );
};

export default PostArea;
