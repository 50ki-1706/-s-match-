import { Card, CardContent, CardHeader } from '@/components/ui/card';

type JoinedEventProps = {
  pastEvents: { date: string; name: string }[];
  isEditing: boolean;
};

const JoinedEvent = ({ pastEvents, isEditing }: JoinedEventProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className='text-lg font-semibold'>参加したイベント</h3>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {pastEvents.map((event) => (
            <div key={event.date}>
              <h1 className='font-semibold'>{event.name}</h1>
              <p className='text-sm text-muted-foreground'>{event.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinedEvent;
