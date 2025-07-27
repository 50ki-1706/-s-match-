import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

type JoiningEventProps = {
  participatingEvents: {
    id: number;
    name: string;
    date: string;
    location: string;
    organizer: string;
  }[];
};

const JoiningEvent = ({ participatingEvents }: JoiningEventProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className='text-lg font-semibold'>参加予定のイベント</h3>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {participatingEvents.map((event) => (
            <div key={event.id} className='rounded-lg border p-4'>
              <h4 className='font-medium'>{event.name}</h4>
              <div className='mt-2 flex items-center gap-4 text-sm text-gray-600'>
                <span className='flex items-center'>
                  <Calendar className='mr-1 size-4' />
                  {event.date}
                </span>
                <span className='flex items-center'>
                  <MapPin className='mr-1 size-4' />
                  {event.location}
                </span>
              </div>
              <p className='mt-1 text-sm text-gray-600'>主催者: {event.organizer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JoiningEvent;
