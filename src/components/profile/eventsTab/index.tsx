'use client';
import JoiningEvent from './JoiningEvent';
import RecruitingEvent from './RecruitingEvent';

export const EventsTab = () => {
  const recruitingEvents = [
    {
      id: 1,
      name: 'Autumn Rock Festival',
      date: '2024-10-15',
      location: '幕張メッセ',
      needed: 5,
      current: 3,
    },
    {
      id: 2,
      name: 'Christmas Jazz Concert',
      date: '2024-12-24',
      location: 'サントリーホール',
      needed: 8,
      current: 6,
    },
  ];

  const participatingEvents = [
    { id: 1, name: 'New Year Live', date: '2024-12-31', location: '武道館', organizer: '田中太郎' },
    {
      id: 2,
      name: 'Spring Concert',
      date: '2025-03-20',
      location: 'オーチャードホール',
      organizer: '佐藤花子',
    },
  ];

  return (
    <div className='space-y-6'>
      <RecruitingEvent recruitingEvents={recruitingEvents} />
      <JoiningEvent participatingEvents={participatingEvents} />
    </div>
  );
};
