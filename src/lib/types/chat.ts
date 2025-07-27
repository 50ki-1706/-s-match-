export interface Message {
  id: string;
  content: string;
  createdAt: string; // ISO 8601 datetime string
  sender: { id: string; name: string; image: string | null };
}

export interface User {
  id: string;
  name: string;
  image: string | null;
}

export interface DmRoomWithMessages {
  id: string;
  participants: { user: User }[];
  messages: Message[];
}
