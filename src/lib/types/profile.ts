import { Event, MusicGenre } from '@prisma/client';

export type apiRes = {
  message: string;
  data?: unknown | object;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  gender: string;
  age: number;
  bio: string | null;
  UserFavoriteGenre: MusicGenre[];
  UserFavoriteArtist: string[];
  Event: Event[];
};
