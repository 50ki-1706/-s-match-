import { Music } from 'lucide-react';

export const AppHeader = () => {
  return (
    <div className='border-b bg-white shadow-sm'>
      <div className='container mx-auto p-4'>
        <h1 className='flex items-center text-2xl font-bold' style={{ color: '#0de1db' }}>
          <Music className='mr-2 size-8' />
          &mu;&apos;s match!
        </h1>
      </div>
    </div>
  );
};
