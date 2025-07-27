'use client';

import { AppHeader } from '@/components/events-list/app-header';
import { EventList } from '@/components/events-list/event-list';
import { EventManagement } from '@/components/events-list/event-management';
import { SearchBar } from '@/components/events-list/search-bar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { eventList, myEvents, participants } from '@/data/mock-data';
import { filterEventsByQuery } from '@/utils/event-list-utils';
import { useMemo, useState } from 'react';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return filterEventsByQuery(eventList, searchQuery);
  }, [searchQuery]);

  const handleJoinEvent = (eventId: string) => {
    console.log('参加申請:', eventId);
    // TODO: 参加申請のロジックを実装
  };

  const handleCreateEvent = () => {
    console.log('新しいイベントを作成');
    // TODO: イベント作成のロジックを実装
  };

  const handleDM = (participantId: string) => {
    console.log('DM送信:', participantId);
    // TODO: DM機能を実装
  };

  const handleDeleteParticipant = (participantId: string) => {
    console.log('参加者削除:', participantId);
    // TODO: 参加者削除のロジックを実装
  };

  const handleInviteParticipant = (participantId: string) => {
    console.log('参加者招待:', participantId);
    // TODO: 参加者招待のロジックを実装
  };

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#fcfcff' }}>
      <AppHeader />

      <div className='container mx-auto px-4 py-6'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='mb-8 grid w-full grid-cols-2'>
            <TabsTrigger value='list'>イベント一覧</TabsTrigger>
            <TabsTrigger value='manage'>イベント管理</TabsTrigger>
          </TabsList>

          <TabsContent value='list' className='space-y-6'>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder='ジャンルやイベント名で検索...'
            />
            <EventList events={filteredEvents} onJoin={handleJoinEvent} />
          </TabsContent>

          <TabsContent value='manage' className='space-y-6'>
            <EventManagement
              events={myEvents}
              participants={participants}
              onCreateEvent={handleCreateEvent}
              onDM={handleDM}
              onDeleteParticipant={handleDeleteParticipant}
              onInviteParticipant={handleInviteParticipant}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
