import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';

const UpperTabs = ({
  userName,
  userId,
  isEditing,
  setIsEditing,
}: {
  userName: string;
  userId: string;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}) => {
  return (
    <div className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>{userName}</h1>
        <p className='text-gray-600'>@{userId}</p>
      </div>
      <Button variant='outline' onClick={() => setIsEditing(!isEditing)} className='mt-4 md:mt-0'>
        <Edit2 className='mr-2 size-4' />
        プロフィール編集
      </Button>
    </div>
  );
};

export default UpperTabs;
