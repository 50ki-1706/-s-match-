import { Badge } from '@/components/ui/badge';
import type { Event, EventStatus, Genre } from '@/lib/types/event-list';

export const getStatusBadge = (status: EventStatus) => {
  if (status === 'OPEN') {
    return <Badge style={{ backgroundColor: '#0de1db', color: 'white' }}>募集中</Badge>;
  }

  if (status === 'CLOSED') {
    return <Badge variant='secondary'>募集終了</Badge>;
  }

  if (status === 'CANCELLED') {
    return <Badge variant='destructive'>中止</Badge>;
  }

  return <Badge variant='outline'>{status}</Badge>;
};

export const getGenreLabel = (genre: Genre): string => {
  const genreMap: Record<Genre, string> = {
    POP: 'ポップス',
    ROCK: 'ロック',
    HIP_HOP: 'ヒップホップ',
    R_B: 'R&B',
    JAZZ: 'ジャズ',
    CLASSICAL: 'クラシック',
    EDM: 'EDM',
    FOLK: 'フォーク',
    COUNTRY: 'カントリー',
    BLUES: 'ブルース',
    REGGAE: 'レゲエ',
    PUNK: 'パンク',
    METAL: 'メタル',
    INDIE: 'インディー',
    ALTERNATIVE: 'オルタナティブ',
    ELECTRONIC: 'エレクトロニック',
    HOUSE: 'ハウス',
    TECHNO: 'テクノ',
    TRANCE: 'トランス',
    DUBSTEP: 'ダブステップ',
    DRUM_AND_BASS: 'ドラムンベース',
    AMBIENT: 'アンビエント',
    EXPERIMENTAL: 'エクスペリメンタル',
    WORLD: 'ワールドミュージック',
    LATIN: 'ラテン',
    AFRICAN: 'アフリカン',
    ASIAN: 'アジアン',
    MIDDLE_EASTERN: '中東音楽',
    CELTIC: 'ケルト',
    FLAMENCO: 'フラメンコ',
    BOSSA_NOVA: 'ボサノバ',
    SWING: 'スウィング',
    BEBOP: 'ビバップ',
    FUSION: 'フュージョン',
    SMOOTH_JAZZ: 'スムースジャズ',
    GOSPEL: 'ゴスペル',
    SPIRITUAL: 'スピリチュアル',
    OTHER: 'その他',
  };

  return genreMap[genre] || genre;
};

export const filterEventsByQuery = (events: Event[], query: string): Event[] => {
  if (!query.trim()) {
    return events;
  }

  const lowercaseQuery = query.toLowerCase();

  return events.filter((event) => {
    const titleMatch = event.title.toLowerCase().includes(lowercaseQuery);
    const genreMatch = event.genre.toLowerCase().includes(lowercaseQuery);

    return titleMatch || genreMatch;
  });
};

export const findEventById = (events: Event[], id: string): Event | undefined => {
  return events.find((event) => event.id === id);
};
