import type { Participant } from '@/lib/types/event-list';
import { ParticipantCard } from './participant-card';

interface ParticipantListProps {
  participants: Participant[];
  onDM?: (participantId: string) => void;
  onDelete?: (participantId: string) => void;
  onInvite?: (participantId: string) => void;
}

export const ParticipantList = ({
  participants,
  onDM,
  onDelete,
  onInvite,
}: ParticipantListProps) => {
  if (!participants.length) {
    return (
      <div className='col-span-full py-8 text-center text-gray-500'>まだ参加希望者がいません</div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {participants.map((participant) => (
        <ParticipantCard
          key={participant.id}
          participant={participant}
          onDM={onDM}
          onDelete={onDelete}
          onInvite={onInvite}
        />
      ))}
    </div>
  );
};
