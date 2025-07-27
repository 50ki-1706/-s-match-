import { z } from 'zod';

export const chatRoomWithMessagesSchema = z.object({
  id: z.string(),
  participants: z.array(
    z.object({
      user: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string().nullable(),
      }),
    }),
  ),
  messages: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      createdAt: z.string().datetime(),
      sender: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string().nullable(),
      }),
    }),
  ),
});

export const postReqSchema = z.object({
  content: z.string(),
});

export const messageCreatedSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  sender: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
  }),
  content: z.string(),
  createdAt: z.string().datetime(),
});

export const patchReqSchema = z.object({
  messageId: z.string(),
  content: z.string(),
});

export type ChatRoomWithMessages = z.infer<typeof chatRoomWithMessagesSchema>;

export type MessageCreated = z.infer<typeof messageCreatedSchema>;
