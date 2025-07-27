import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserIcon = ({ userImage }: { userImage: string }) => {
  return (
    <div className='absolute left-6 top-36 sm:top-36 md:left-8 md:top-48'>
      <Avatar className='size-24 border-4 border-white md:size-32'>
        <AvatarImage src={userImage || '/placeholder.svg?height=128&width=128'} />
        <AvatarFallback>YT</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserIcon;
