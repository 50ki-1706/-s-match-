'use client';

import { Button } from '@/components/ui/button';
import type { Event, Participant } from '@/lib/types/event-list';
import { findEventById } from '@/utils/event-list-utils';
import { useState } from 'react';
import { EventCard } from './event-card';
import { ParticipantList } from './participant-list';

interface EventManagementProps {
  events: Event[];
  participants: Record<string, Participant[]>;
  onCreateEvent?: () => void;
  onDM?: (participantId: string) => void;
  onDeleteParticipant?: (participantId: string) => void;
  onInviteParticipant?: (participantId: string) => void;
}

export const EventManagement = ({
  events,
  participants,
  onCreateEvent,
  onDM,
  onDeleteParticipant,
  onInviteParticipant,
}: EventManagementProps) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleBackClick = () => {
    setSelectedEventId(null);
  };

  const selectedEvent = selectedEventId ? findEventById(events, selectedEventId) : null;
  const eventParticipants = selectedEventId ? participants[selectedEventId] || [] : [];

  if (selectedEventId) {
    return (
      <>
        <div className='mb-6 flex items-center gap-4'>
          <Button variant='outline' onClick={handleBackClick}>
            ← 戻る
          </Button>
          <h2 className='text-xl font-semibold'>{selectedEvent?.title} - 参加希望者</h2>
        </div>

        <ParticipantList
          participants={eventParticipants}
          onDM={onDM}
          onDelete={onDeleteParticipant}
          onInvite={onInviteParticipant}
        />
      </>
    );
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>あなたが作成したイベント</h2>
        <Button style={{ backgroundColor: '#ff9900', color: 'white' }} onClick={onCreateEvent}>
          新しいイベントを作成
        </Button>
      </div>

      {!events.length ? (
        <div className='py-8 text-center text-gray-500'>まだイベントを作成していません</div>
      ) : (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={handleEventClick}
              showJoinButton={false}
            />
          ))}
        </div>
      )}
    </>
  );
};
