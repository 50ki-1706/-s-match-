export type Genre =
  | 'POP'
  | 'ROCK'
  | 'HIP_HOP'
  | 'R_B'
  | 'JAZZ'
  | 'CLASSICAL'
  | 'EDM'
  | 'FOLK'
  | 'COUNTRY'
  | 'BLUES'
  | 'REGGAE'
  | 'PUNK'
  | 'METAL'
  | 'INDIE'
  | 'ALTERNATIVE'
  | 'ELECTRONIC'
  | 'HOUSE'
  | 'TECHNO'
  | 'TRANCE'
  | 'DUBSTEP'
  | 'DRUM_AND_BASS'
  | 'AMBIENT'
  | 'EXPERIMENTAL'
  | 'WORLD'
  | 'LATIN'
  | 'AFRICAN'
  | 'ASIAN'
  | 'MIDDLE_EASTERN'
  | 'CELTIC'
  | 'FLAMENCO'
  | 'BOSSA_NOVA'
  | 'SWING'
  | 'BEBOP'
  | 'FUSION'
  | 'SMOOTH_JAZZ'
  | 'GOSPEL'
  | 'SPIRITUAL'
  | 'OTHER';

export type EventStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';

export type Event = {
  id: string;
  title: string;
  status: EventStatus;
  deadline: string | null;
  eventDate: string;
  genre: Genre;
  organizer: {
    id: string;
    name: string;
  };
  location?: string;
  description?: string;
  maxParticipants?: number;
  currentParticipants?: number;
};

export type EventList = Event[];

export type Participant = {
  id: string;
  name: string;
  avatar?: string;
  appliedAt: string;
  message?: string;
};
