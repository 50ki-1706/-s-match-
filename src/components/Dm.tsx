'use client';
import { useDm } from '@/hooks/useDm';
import { Message, User } from '@/lib/types/dm';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
const Dm = ({
  userId,
  supabaseUrl,
  supabaseKey,
}: {
  userId: string | undefined;
  supabaseUrl: string;
  supabaseKey: string;
}) => {
  const { id: dmId } = useParams();
  const { messageState, handleSendMessage, otherUser } = useDm({
    dmId: dmId as string,
    userId: userId,
    supabaseUrl,
    supabaseKey,
  });

  return (
    <div className='flex h-screen flex-col bg-gray-50'>
      <Header otherUser={otherUser} />
      <MessageList messages={messageState} userId={userId} />
      <MessageInput sendMessage={handleSendMessage} />
    </div>
  );
};

const Header = ({ otherUser }: { otherUser: User }) => {
  return (
    <div className='min-h-14 border-b border-gray-200 bg-white px-6 py-4 shadow-sm'>
      <div className='flex items-center space-x-3'>
        <Image
          src={otherUser.image || '/user.jpeg'}
          alt={otherUser.name}
          width={32}
          height={32}
          className='shrink-0 rounded-full object-cover'
        />
        <p>{otherUser.name}</p>
      </div>
    </div>
  );
};

const MessageList = ({ messages, userId }: { messages: Message[]; userId: string | undefined }) => {
  return (
    <div className='flex-1 space-y-6 overflow-y-auto px-4 py-6'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender.id === userId ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`flex max-w-xs lg:max-w-md ${message.sender.id === userId ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}
          >
            <Image
              src={message.sender.image || '/user.jpeg'}
              alt={message.sender.name}
              width={32}
              height={32}
              className='shrink-0 rounded-full object-cover'
            />
            <div className={`${message.sender.id === userId ? 'mr-2' : 'ml-2'}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.sender.id === userId
                    ? 'rounded-br-sm bg-blue-500 text-white'
                    : 'rounded-bl-sm border border-gray-200 bg-white text-gray-900'
                }`}
              >
                <p className='text-sm leading-relaxed'>{message.content}</p>
              </div>
              <p
                className={`mt-1 text-xs text-gray-500 ${message.sender.id === userId ? 'text-right' : 'text-left'}`}
              >
                {message.createdAt}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MessageInput = ({
  sendMessage,
}: {
  sendMessage: (messageContent: string) => Promise<void>;
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className='border-t border-gray-200 bg-white p-4'>
      <form onSubmit={handleSendMessage} className='flex items-center space-x-3'>
        <div className='flex-1'>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='メッセージを入力...'
            className='w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
        </div>
        <button
          type='submit'
          disabled={!newMessage.trim()}
          className='shrink-0 rounded-full bg-blue-500 p-3 text-white transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300'
        >
          <svg className='size-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default Dm;
