'use client';

import { ChatRoomWithMessages } from '@/app/api/(type)/message';
import { Message, User } from '@/lib/types/dm';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useChat = ({
  chatId,
  userId,
  supabaseUrl,
  supabaseKey,
}: {
  chatId: string;
  userId: string | undefined;
  supabaseUrl: string;
  supabaseKey: string;
}) => {
  const [messageState, setMessageState] = useState<Message[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | undefined>(undefined);
  const [otherUser, setOtherUser] = useState<User>({
    id: '',
    name: '',
    image: null,
  });

  const handleChangeMessage = (message: Message) => {
    setMessageState((prev) => [...(prev || []), message]);
  };

  const handleSendMessage = async (messageContent: string): Promise<void> => {
    //バックエンドにメッセージを送信
    const newMessage = await sendMessage(chatId, messageContent);

    //websocketで相手にメッセージを送信
    broadcastMessage(newMessage);

    //フロントエンドのstateを更新
    handleChangeMessage(newMessage);
  };

  const broadcastMessage = async (message: Message) => {
    if (!channel) return;

    channel.send({
      type: 'broadcast',
      event: 'shout',
      payload: message,
    });
  };

  //websocketに関する処理
  useEffect(() => {
    //websoketチャンネルを作成
    const supabase = createClient(supabaseUrl, supabaseKey);
    const newChannel = supabase.channel('test-channel');
    setChannel(newChannel);

    //メッセージを受信したらhandleChangeMessageを呼び出す
    newChannel
      .on<Message>('broadcast', { event: 'shout' }, (message) => {
        handleChangeMessage(message.payload);
      })
      .subscribe();

    //ページを閉じたら、チャンネルを閉じる
    return () => {
      newChannel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchChatRoomWithMessages(chatId).then((res) => {
      setMessageState(res.messages);

      const otherUser = res.participants.find((p) => p.user.id !== userId)?.user;
      if (otherUser) {
        setOtherUser(otherUser);
      }
    });
  }, [chatId]);

  return { messageState, handleSendMessage, otherUser };
};

const fetchChatRoomWithMessages = async (chatId: string): Promise<ChatRoomWithMessages> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/chat/${chatId}/message`);
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const sendMessage = async (chatId: string, messageContent: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/chat/${chatId}/message`, {
      method: 'POST',
      body: JSON.stringify({ content: messageContent }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateMessage = async (chatId: string, messageId: string, messageContent: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/chat/${chatId}/message`, {
      method: 'PATCH',
      body: JSON.stringify({ messageId, content: messageContent }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteMessage = async (chatId: string, messageId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/chat/${chatId}/message`, {
      method: 'DELETE',
      body: JSON.stringify({ messageId }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
