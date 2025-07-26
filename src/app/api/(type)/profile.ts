import { Gender, MusicGenre } from '@prisma/client';
import { z } from 'zod';

export const UserFavoriteGenreSchema = z.array(z.object({ genre: z.nativeEnum(MusicGenre) }));

export const UserFavoriteArtistSchema = z.array(z.object({ artist: z.string() }));

export const EventSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
  }),
);

export const BlogSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
  }),
);

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable(),
  headerImage: z.string().nullable(),
  gender: z.nativeEnum(Gender),
  age: z.number(),
  bio: z.string().nullable(),
  UserFavoriteGenre: UserFavoriteGenreSchema,
  UserFavoriteArtist: UserFavoriteArtistSchema,
  Event: EventSchema,
  Blog: BlogSchema,
});

export const UserProfileUpdateSchema = z.object({
  name: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  image: z.string().nullable().optional(),
  headerImage: z.string().nullable(),
  age: z.number().min(0).optional(),
  bio: z.string().nullable().optional(),
  UserFavoriteGenre: UserFavoriteGenreSchema.optional(),
  UserFavoriteArtist: UserFavoriteArtistSchema.optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserProfileUpdate = z.infer<typeof UserProfileUpdateSchema>;
