import type { Event } from '@/lib/types/event-list';
import { EventCard } from './event-card';

interface EventListProps {
  events: Event[];
  onJoin?: (eventId: string) => void;
}

export const EventList = ({ events, onJoin }: EventListProps) => {
  if (!events.length) {
    return <div className='py-8 text-center text-gray-500'>イベントが見つかりませんでした</div>;
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onJoin={onJoin} showJoinButton={true} />
      ))}
    </div>
  );
};
