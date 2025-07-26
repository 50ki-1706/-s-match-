import { MusicGenre } from '@prisma/client';

export type CreateEventInput = {
  title: string;
  description: string;
  location: string;
  eventDate: string; // ISO string
  genre: MusicGenre; // enum
  fee?: number;
  ticketCount?: number;
  deadline?: string; // ISO string
  externalUrl?: string;
};

export type UpdateEventInput = {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  eventDate?: string;
  genre?: string;
  fee?: number;
  capacity?: number;
};

export const useEvent = () => {
  // ✅ 1. イベント作成
  const createEvent = async (data: CreateEventInput) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/event`;
    console.log('POST URL:', url);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        location: data.location,
        eventDate: data.eventDate,
        genre: data.genre,
        fee: data.fee,
      }),
    });

    if (!res.ok) {
      if (res.status === 404) throw new Error('イベントが存在しません');
      throw new Error('イベント作成に失敗しました');
    }

    return await res.json();
  };

  // ✅ 2. イベント更新
  const updateEvent = async (data: UpdateEventInput) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/dashboard/${data.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.status === 404) throw new Error('イベントが存在しません');
    if (res.status === 403) throw new Error('更新権限がありません');
    if (!res.ok) throw new Error('イベントの更新に失敗しました');

    return await res.json(); // message を返すはず
  };

  // ✅ 3. イベント削除
  const deleteEvent = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (res.status === 404) throw new Error('イベントが存在しません');
    if (res.status === 403) throw new Error('削除権限がありません');
    if (!res.ok) throw new Error('イベントの削除に失敗しました');

    return await res.json(); // message を返すはず
  };

  // ✅ 4. イベントキャンセル
  const cancelEvent = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/${id}/cancel`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('イベントのキャンセルに失敗しました');

    return;
  };

  // ✅ 5. イベント参加
  const joinEvent = async (eventId: string, feedback?: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, feedback }),
    });

    if (!res.ok) throw new Error('イベントへの参加に失敗しました');

    return await res.json(); // message を返すはず
  };

  // ✅ 6. イベント一覧取得
  const getEvents = async (): Promise<Event[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/list`);
    if (!res.ok) throw new Error('イベント取得に失敗しました');
    return await res.json();
  };

  // ✅ 7. イベント検索
  const searchEvents = async (id: string, query: string, category?: string): Promise<Event[]> => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category && category !== 'all') params.append('category', category);

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/${id}`);
    if (!res.ok) throw new Error('検索に失敗しました');
    return await res.json();
  };

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    cancelEvent,
    joinEvent,
    getEvents,
    searchEvents,
  };
};
