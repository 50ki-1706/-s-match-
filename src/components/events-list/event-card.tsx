'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Event } from '@/lib/types/event-list';
import { getGenreLabel, getStatusBadge } from '@/utils/event-list-utils';
import { Calendar, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onJoin?: (eventId: string) => void;
  onClick?: (eventId: string) => void;
  showJoinButton?: boolean;
}

export const EventCard = ({ event, onJoin, onClick, showJoinButton = true }: EventCardProps) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(event.id);
    }
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onJoin) {
      onJoin(event.id);
    }
  };

  const isJoinDisabled = event.status !== 'OPEN';
  const joinButtonText = event.status === 'OPEN' ? '参加したい' : '募集終了';

  return (
    <Card
      className={`transition-shadow hover:shadow-lg ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className='mb-2 flex items-start justify-between'>
          <CardTitle className='text-lg'>{event.title}</CardTitle>
          {getStatusBadge(event.status)}
        </div>
        <Badge variant='outline' className='w-fit'>
          {getGenreLabel(event.genre)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className='mb-4 space-y-2'>
          <div className='flex items-center text-sm text-gray-600'>
            <Calendar className='mr-2 size-4' />
            {event.eventDate}
          </div>
          {event.location && (
            <div className='flex items-center text-sm text-gray-600'>
              <MapPin className='mr-2 size-4' />
              {event.location}
            </div>
          )}
          <div className='flex items-center text-sm text-gray-600'>
            <Users className='mr-2 size-4' />
            {event.currentParticipants}/{event.maxParticipants}人
          </div>
          <p className='text-sm text-gray-600'>主催: {event.organizer.name}</p>
        </div>

        {event.description && <p className='mb-4 text-sm text-gray-700'>{event.description}</p>}

        {showJoinButton ? (
          <Button
            className='w-full'
            style={{ backgroundColor: '#0de1db', color: 'white' }}
            disabled={isJoinDisabled}
            onClick={handleJoinClick}
          >
            {joinButtonText}
          </Button>
        ) : (
          <div className='text-sm' style={{ color: '#0de1db' }}>
            クリックして参加希望者を確認
          </div>
        )}
      </CardContent>
    </Card>
  );
};
