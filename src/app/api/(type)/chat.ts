import { z } from 'zod';

export const dmRoomListSchema = z.array(
  z.object({
    id: z.string(),
    participants: z.array(
      z.object({
        user: z.object({
          id: z.string(),
          name: z.string(),
        }),
      }),
    ),
  }),
);

export type DmRoomList = z.infer<typeof dmRoomListSchema>;
