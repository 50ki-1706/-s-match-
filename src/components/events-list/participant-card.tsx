'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Participant } from '@/lib/types/event-list';
import { MessageCircle, Trash2, UserPlus } from 'lucide-react';

interface ParticipantCardProps {
  participant: Participant;
  onDM?: (participantId: string) => void;
  onDelete?: (participantId: string) => void;
  onInvite?: (participantId: string) => void;
}

export const ParticipantCard = ({
  participant,
  onDM,
  onDelete,
  onInvite,
}: ParticipantCardProps) => {
  const handleDM = () => {
    if (onDM) {
      onDM(participant.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(participant.id);
    }
  };

  const handleInvite = () => {
    if (onInvite) {
      onInvite(participant.id);
    }
  };

  const getInitial = (name: string): string => {
    if (!name) return '?';
    return name[0];
  };

  return (
    <Card>
      <CardContent className='pt-6'>
        <div className='mb-4 flex items-center gap-3'>
          <Avatar className='size-12'>
            <AvatarImage src={participant.avatar || '/placeholder.svg'} />
            <AvatarFallback>{getInitial(participant.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-medium'>{participant.name}</h3>
            <p className='text-sm text-gray-500'>申請日: {participant.appliedAt}</p>
          </div>
        </div>

        {participant.message && (
          <div className='mb-4 rounded-lg bg-gray-50 p-3'>
            <p className='text-sm'>{participant.message}</p>
          </div>
        )}

        <div className='flex gap-2'>
          <Button size='sm' variant='outline' className='flex-1 bg-transparent' onClick={handleDM}>
            <MessageCircle className='mr-1 size-4' />
            DM
          </Button>
          <Button
            size='sm'
            variant='outline'
            className='flex-1 bg-transparent'
            onClick={handleDelete}
          >
            <Trash2 className='mr-1 size-4' />
            削除
          </Button>
          <Button
            size='sm'
            className='flex-1'
            style={{ backgroundColor: '#0de1db', color: 'white' }}
            onClick={handleInvite}
          >
            <UserPlus className='mr-1 size-4' />
            招待
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
