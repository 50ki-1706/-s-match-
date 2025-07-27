'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Heart,
  MapPin,
  MessageCircle,
  RotateCcw,
  Settings,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  deadline: string;
  capacity: number;
  participants: number;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  category: string;
  host: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

interface SwipeAction {
  eventId: string;
  action: 'like' | 'pass';
  timestamp: Date;
}

interface Match {
  id: string;
  event: Event;
  matchedAt: Date;
  status: 'pending' | 'accepted' | 'declined';
}

export default function Component() {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'プログラミング勉強会',
      description:
        '初心者向けのプログラミング勉強会です。JavaScriptの基礎から学びます。実際にWebアプリケーションを作成しながら学習します。楽しく学べる環境を提供します！',
      deadline: '2024-02-15',
      capacity: 20,
      participants: 12,
      image: '/placeholder.svg?height=400&width=300',
      price: 3500,
      rating: 4.8,
      reviewCount: 24,
      location: '渋谷区',
      category: 'テクノロジー',
      host: {
        name: '田中太郎',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      tags: ['初心者歓迎', 'JavaScript', '実践的', '少人数'],
    },
    {
      id: '2',
      title: 'UI/UXデザインワークショップ',
      description:
        'デザイン思考を学び、実際にアプリのUIを設計します。Figmaを使った実践的なワークショップです。プロのデザイナーが丁寧に指導します。',
      deadline: '2024-02-20',
      capacity: 15,
      participants: 8,
      image: '/placeholder.svg?height=400&width=300',
      price: 4200,
      rating: 4.9,
      reviewCount: 18,
      location: '新宿区',
      category: 'デザイン',
      host: {
        name: '佐藤美咲',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      tags: ['Figma', 'デザイン思考', '実践', 'プロ指導'],
    },
    {
      id: '3',
      title: '写真撮影テクニック講座',
      description:
        'プロカメラマンが教える写真撮影の基本から応用まで。実際に街を歩きながら撮影実習を行います。一眼レフからスマホまで対応。',
      deadline: '2024-02-25',
      capacity: 12,
      participants: 5,
      image: '/placeholder.svg?height=400&width=300',
      price: 5800,
      rating: 4.7,
      reviewCount: 31,
      location: '港区',
      category: 'アート',
      host: {
        name: '高橋健一',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      tags: ['プロ指導', '実習', '一眼レフ', '街歩き'],
    },
    {
      id: '4',
      title: '料理教室：和食の基本',
      description:
        '日本料理の基本を学ぶ料理教室です。だしの取り方から始まり、基本的な和食を作ります。食材はすべて用意されています。',
      deadline: '2024-03-01',
      capacity: 8,
      participants: 3,
      image: '/placeholder.svg?height=400&width=300',
      price: 6500,
      rating: 4.6,
      reviewCount: 12,
      location: '世田谷区',
      category: '料理',
      host: {
        name: '鈴木花子',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      tags: ['和食', '基本', 'だし', '食材込み'],
    },
    {
      id: '5',
      title: 'ヨガ＆瞑想セッション',
      description:
        '心と体をリフレッシュするヨガと瞑想のセッションです。初心者でも安心して参加できます。マットは貸し出し可能です。',
      deadline: '2024-02-28',
      capacity: 25,
      participants: 18,
      image: '/placeholder.svg?height=400&width=300',
      price: 2800,
      rating: 4.9,
      reviewCount: 45,
      location: '目黒区',
      category: 'ウェルネス',
      host: {
        name: '山田瞳',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      tags: ['初心者歓迎', 'リフレッシュ', 'マット貸出', '瞑想'],
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeActions, setSwipeActions] = useState<SwipeAction[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showMatch, setShowMatch] = useState<Event | null>(null);
  const [showMatches, setShowMatches] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentEvent = events[currentIndex];

  const handleSwipe = (action: 'like' | 'pass') => {
    if (!currentEvent) return;

    const swipeAction: SwipeAction = {
      eventId: currentEvent.id,
      action,
      timestamp: new Date(),
    };

    setSwipeActions([...swipeActions, swipeAction]);

    // マッチング判定（ランダムで50%の確率でマッチ）
    if (action === 'like' && Math.random() > 0.5) {
      const match: Match = {
        id: Date.now().toString(),
        event: currentEvent,
        matchedAt: new Date(),
        status: 'pending',
      };
      setMatches([...matches, match]);
      setShowMatch(currentEvent);
    }

    // 次のカードに移動
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const threshold = 100;

      if (Math.abs(dragOffset.x) > threshold) {
        if (dragOffset.x > 0) {
          handleSwipe('like');
        } else {
          handleSwipe('pass');
        }
      } else {
        setDragOffset({ x: 0, y: 0 });
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleTouchEnd = () => {
      const threshold = 100;

      if (Math.abs(dragOffset.x) > threshold) {
        if (dragOffset.x > 0) {
          handleSwipe('like');
        } else {
          handleSwipe('pass');
        }
      } else {
        setDragOffset({ x: 0, y: 0 });
      }

      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const getRotation = () => {
    return dragOffset.x * 0.1;
  };

  const getOpacity = () => {
    return Math.max(0.3, 1 - Math.abs(dragOffset.x) / 300);
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setSwipeActions([]);
    setDragOffset({ x: 0, y: 0 });
  };

  if (currentIndex >= events.length) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100'>
        <div className='space-y-6 text-center'>
          <div className='mx-auto flex size-24 items-center justify-center rounded-full bg-rose-100'>
            <Sparkles className='size-12 text-rose-500' />
          </div>
          <div>
            <h2 className='mb-2 text-2xl font-bold text-gray-800'>
              すべてのイベントを確認しました！
            </h2>
            <p className='mb-6 text-gray-600'>新しいイベントをもう一度見てみませんか？</p>
            <Button onClick={resetStack} className='bg-rose-500 hover:bg-rose-600'>
              <RotateCcw className='mr-2 size-4' />
              最初から見直す
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 to-rose-100'>
      {/* Header */}
      <div className='sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-pink-500'>
                <Heart className='size-5 text-white' />
              </div>
              <h1 className='bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent'>
                EventMatch
              </h1>
            </div>
            <div className='flex items-center gap-4'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setShowMatches(true)}
                className='relative hover:bg-rose-50'
              >
                <MessageCircle className='size-5 text-rose-500' />
                {matches.length > 0 && (
                  <div className='absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-rose-500'>
                    <span className='text-xs font-bold text-white'>{matches.length}</span>
                  </div>
                )}
              </Button>
              <Button variant='ghost' size='icon' className='hover:bg-rose-50'>
                <Settings className='size-5 text-rose-500' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-6 py-8'>
        <div className='mx-auto max-w-sm'>
          {/* Card Stack */}
          <div className='relative mb-8 h-[600px]'>
            {/* Background Cards */}
            {events.slice(currentIndex + 1, currentIndex + 3).map((event, index) => (
              <Card
                key={event.id}
                className='absolute inset-0 bg-white shadow-lg'
                style={{
                  transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 8}px)`,
                  zIndex: 10 - index,
                }}
              >
                <div className='h-full opacity-50'>
                  <img
                    src={event.image || '/placeholder.svg'}
                    alt={event.title}
                    className='h-2/3 w-full rounded-t-lg object-cover'
                  />
                </div>
              </Card>
            ))}

            {/* Current Card */}
            {currentEvent && (
              <Card
                ref={cardRef}
                className='absolute inset-0 cursor-grab select-none bg-white shadow-xl active:cursor-grabbing'
                style={{
                  transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${getRotation()}deg)`,
                  opacity: getOpacity(),
                  zIndex: 20,
                  transition: isDragging
                    ? 'none'
                    : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <div className='flex h-full flex-col'>
                  <div className='relative h-2/3'>
                    <img
                      src={currentEvent.image || '/placeholder.svg'}
                      alt={currentEvent.title}
                      className='size-full rounded-t-lg object-cover'
                    />
                    <div className='absolute left-4 top-4'>
                      <Badge className='bg-white/90 font-medium text-gray-700'>
                        {currentEvent.category}
                      </Badge>
                    </div>
                    <div className='absolute right-4 top-4'>
                      <Badge className='bg-rose-500 text-white'>
                        ¥{currentEvent.price.toLocaleString()}
                      </Badge>
                    </div>

                    {/* Swipe Indicators */}
                    {dragOffset.x > 50 && (
                      <div className='absolute inset-0 flex items-center justify-center rounded-t-lg bg-green-500/20'>
                        <div className='rotate-12 rounded-full bg-green-500 px-6 py-3 text-lg font-bold text-white'>
                          LIKE
                        </div>
                      </div>
                    )}
                    {dragOffset.x < -50 && (
                      <div className='absolute inset-0 flex items-center justify-center rounded-t-lg bg-red-500/20'>
                        <div className='-rotate-12 rounded-full bg-red-500 px-6 py-3 text-lg font-bold text-white'>
                          PASS
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className='flex-1 space-y-3 p-4'>
                    <div className='flex items-center gap-2'>
                      <div className='flex items-center gap-1'>
                        <Star className='size-4 fill-yellow-400 text-yellow-400' />
                        <span className='font-medium'>{currentEvent.rating}</span>
                        <span className='text-sm text-gray-500'>({currentEvent.reviewCount})</span>
                      </div>
                      <div className='flex items-center gap-1 text-gray-500'>
                        <MapPin className='size-4' />
                        <span className='text-sm'>{currentEvent.location}</span>
                      </div>
                    </div>

                    <h3 className='text-lg font-bold leading-tight'>{currentEvent.title}</h3>

                    <p className='line-clamp-2 text-sm text-gray-600'>{currentEvent.description}</p>

                    <div className='flex flex-wrap gap-1'>
                      {currentEvent.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant='secondary' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className='flex items-center justify-between pt-2'>
                      <div className='flex items-center gap-2'>
                        <Avatar className='size-8'>
                          <AvatarImage src={currentEvent.host.avatar || '/placeholder.svg'} />
                          <AvatarFallback>{currentEvent.host.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className='text-sm font-medium'>{currentEvent.host.name}</span>
                      </div>
                      <div className='flex items-center gap-1 text-gray-500'>
                        <Users className='size-4' />
                        <span className='text-sm'>
                          {currentEvent.participants}/{currentEvent.capacity}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex justify-center gap-6'>
            <Button
              size='lg'
              variant='outline'
              className='size-16 rounded-full border-2 border-red-200 bg-transparent hover:border-red-300 hover:bg-red-50'
              onClick={() => handleSwipe('pass')}
            >
              <X className='size-8 text-red-500' />
            </Button>
            <Button
              size='lg'
              className='size-16 rounded-full bg-rose-500 hover:bg-rose-600'
              onClick={() => handleSwipe('like')}
            >
              <Heart className='size-8 text-white' />
            </Button>
          </div>

          {/* Progress */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500'>
              {currentIndex + 1} / {events.length}
            </p>
            <div className='mt-2 h-1 w-full rounded-full bg-gray-200'>
              <div
                className='h-1 rounded-full bg-rose-500 transition-all duration-300'
                style={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      {showMatch && (
        <Dialog open={!!showMatch} onOpenChange={() => setShowMatch(null)}>
          <DialogContent className='max-w-sm'>
            <div className='space-y-4 text-center'>
              <div className='mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500'>
                <Sparkles className='size-10 text-white' />
              </div>
              <DialogHeader>
                <DialogTitle className='bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-2xl text-transparent'>
                  マッチしました！
                </DialogTitle>
                <DialogDescription className='text-base'>
                  「{showMatch.title}」の主催者があなたの参加を承認しました
                </DialogDescription>
              </DialogHeader>
              <div className='flex items-center justify-center gap-4 py-4'>
                <Avatar className='size-16'>
                  <AvatarImage src='/placeholder.svg?height=64&width=64' />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <Heart className='size-8 text-rose-500' />
                <Avatar className='size-16'>
                  <AvatarImage src={showMatch.host.avatar || '/placeholder.svg'} />
                  <AvatarFallback>{showMatch.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <Button className='w-full bg-rose-500 hover:bg-rose-600'>メッセージを送る</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Matches Modal */}
      {showMatches && (
        <Dialog open={showMatches} onOpenChange={setShowMatches}>
          <DialogContent className='max-w-md'>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <MessageCircle className='size-5 text-rose-500' />
                マッチ一覧
              </DialogTitle>
            </DialogHeader>
            <div className='max-h-96 space-y-3 overflow-y-auto'>
              {matches.length === 0 ? (
                <div className='py-8 text-center text-gray-500'>
                  <Heart className='mx-auto mb-4 size-12 text-gray-300' />
                  <p>まだマッチがありません</p>
                  <p className='text-sm'>イベントにいいねしてマッチを見つけましょう！</p>
                </div>
              ) : (
                matches.map((match) => (
                  <div
                    key={match.id}
                    className='flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50'
                  >
                    <img
                      src={match.event.image || '/placeholder.svg'}
                      alt={match.event.title}
                      className='size-12 rounded-lg object-cover'
                    />
                    <div className='flex-1'>
                      <h4 className='font-medium'>{match.event.title}</h4>
                      <p className='text-sm text-gray-500'>
                        {new Date(match.matchedAt).toLocaleDateString('ja-JP')}にマッチ
                      </p>
                    </div>
                    <Button size='sm' className='bg-rose-500 hover:bg-rose-600'>
                      チャット
                    </Button>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
