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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Filter,
  Heart,
  MapPin,
  MessageCircle,
  Plus,
  Search,
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
  status: 'active' | 'paused' | 'closed';
  participants: Participant[];
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

interface Participant {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
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
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'プログラミング勉強会',
      description:
        '初心者向けのプログラミング勉強会です。JavaScriptの基礎から学びます。実際にWebアプリケーションを作成しながら学習します。',
      deadline: '2024-02-15',
      capacity: 20,
      status: 'active',
      image: '/placeholder.svg?height=200&width=300',
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
      participants: [
        {
          id: '1',
          name: '田中太郎',
          email: 'tanaka@example.com',
          status: 'approved',
          appliedAt: '2024-01-10',
        },
        {
          id: '2',
          name: '佐藤花子',
          email: 'sato@example.com',
          status: 'pending',
          appliedAt: '2024-01-12',
        },
        {
          id: '3',
          name: '鈴木一郎',
          email: 'suzuki@example.com',
          status: 'approved',
          appliedAt: '2024-01-14',
        },
      ],
    },
    {
      id: '2',
      title: 'UI/UXデザインワークショップ',
      description:
        'デザイン思考を学び、実際にアプリのUIを設計します。Figmaを使った実践的なワークショップです。',
      deadline: '2024-02-20',
      capacity: 15,
      status: 'active',
      image: '/placeholder.svg?height=200&width=300',
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
      participants: [
        {
          id: '4',
          name: '山田次郎',
          email: 'yamada@example.com',
          status: 'approved',
          appliedAt: '2024-01-08',
        },
      ],
    },
    {
      id: '3',
      title: '写真撮影テクニック講座',
      description:
        'プロカメラマンが教える写真撮影の基本から応用まで。実際に街を歩きながら撮影実習を行います。',
      deadline: '2024-02-25',
      capacity: 12,
      status: 'active',
      image: '/placeholder.svg?height=200&width=300',
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
      participants: [],
    },
    {
      id: '4',
      title: '料理教室：和食の基本',
      description:
        '日本料理の基本を学ぶ料理教室です。だしの取り方から始まり、基本的な和食を作ります。',
      deadline: '2024-03-01',
      capacity: 8,
      status: 'paused',
      image: '/placeholder.svg?height=200&width=300',
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
      participants: [],
    },
    {
      id: '5',
      title: 'ヨガ＆瞑想セッション',
      description:
        '心と体をリフレッシュするヨガと瞑想のセッションです。初心者でも安心して参加できます。',
      deadline: '2024-02-28',
      capacity: 25,
      status: 'active',
      image: '/placeholder.svg?height=200&width=300',
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
      participants: [],
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    deadline: '',
    capacity: '',
    price: '',
    location: '',
    category: '',
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Swipe functionality states
  const [showSwipeMode, setShowSwipeMode] = useState(false);
  const [swipeEvents, setSwipeEvents] = useState<Event[]>([]);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  const [swipeActions, setSwipeActions] = useState<SwipeAction[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showMatch, setShowMatch] = useState<Event | null>(null);
  const [showMatches, setShowMatches] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const categories = [
    'all',
    'テクノロジー',
    'デザイン',
    'アート',
    '料理',
    'スポーツ',
    '音楽',
    'ウェルネス',
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.deadline && newEvent.capacity) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description,
        deadline: newEvent.deadline,
        capacity: Number.parseInt(newEvent.capacity),
        price: Number.parseInt(newEvent.price) || 0,
        location: newEvent.location,
        category: newEvent.category,
        status: 'active',
        image: '/placeholder.svg?height=200&width=300',
        rating: 0,
        reviewCount: 0,
        host: {
          name: 'あなた',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        tags: [],
        participants: [],
      };
      setEvents([...events, event]);
      setNewEvent({
        title: '',
        description: '',
        deadline: '',
        capacity: '',
        price: '',
        location: '',
        category: '',
      });
      setIsCreateDialogOpen(false);
    }
  };

  const handleCardClick = (clickedEvent: Event) => {
    // クリックされたイベントから始まるスワイプリストを作成
    const clickedIndex = events.findIndex((e) => e.id === clickedEvent.id);
    const reorderedEvents = [...events.slice(clickedIndex), ...events.slice(0, clickedIndex)];
    setSwipeEvents(reorderedEvents);
    setCurrentSwipeIndex(0);
    setShowSwipeMode(true);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleSwipe = (action: 'like' | 'pass') => {
    const currentEvent = swipeEvents[currentSwipeIndex];
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
      setCurrentSwipeIndex(currentSwipeIndex + 1);
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

  const closeSwipeMode = () => {
    setShowSwipeMode(false);
    setCurrentSwipeIndex(0);
    setDragOffset({ x: 0, y: 0 });
  };

  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'active':
        return <Badge className='border-green-200 bg-green-100 text-green-800'>募集中</Badge>;
      case 'paused':
        return <Badge className='border-yellow-200 bg-yellow-100 text-yellow-800'>一時停止</Badge>;
      case 'closed':
        return <Badge className='border-red-200 bg-red-100 text-red-800'>締切</Badge>;
    }
  };

  const currentSwipeEvent = swipeEvents[currentSwipeIndex];

  // Swipe Mode UI
  if (showSwipeMode) {
    if (currentSwipeIndex >= swipeEvents.length) {
      return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100'>
          <div className='space-y-6 text-center'>
            <div className='mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-100'>
              <Sparkles className='h-12 w-12 text-rose-500' />
            </div>
            <div>
              <h2 className='mb-2 text-2xl font-bold text-gray-800'>
                すべてのイベントを確認しました！
              </h2>
              <p className='mb-6 text-gray-600'>他のイベントも見てみませんか？</p>
              <Button onClick={closeSwipeMode} className='bg-rose-500 hover:bg-rose-600'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                イベント一覧に戻る
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='fixed inset-0 z-50 bg-gradient-to-br from-pink-50 to-rose-100'>
        {/* Swipe Mode Header */}
        <div className='border-b bg-white/80 backdrop-blur-sm'>
          <div className='container mx-auto px-6 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={closeSwipeMode}
                  className='hover:bg-rose-50'
                >
                  <ArrowLeft className='h-5 w-5 text-rose-500' />
                </Button>
                <div className='flex items-center gap-2'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-pink-500'>
                    <Heart className='h-5 w-5 text-white' />
                  </div>
                  <h1 className='bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent'>
                    EventMatch
                  </h1>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setShowMatches(true)}
                  className='relative hover:bg-rose-50'
                >
                  <MessageCircle className='h-5 w-5 text-rose-500' />
                  {matches.length > 0 && (
                    <div className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500'>
                      <span className='text-xs font-bold text-white'>{matches.length}</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe Content */}
        <div className='container mx-auto px-6 py-8'>
          <div className='mx-auto max-w-sm'>
            {/* Card Stack */}
            <div className='relative mb-8 h-[600px]'>
              {/* Background Cards */}
              {swipeEvents
                .slice(currentSwipeIndex + 1, currentSwipeIndex + 3)
                .map((event, index) => (
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
              {currentSwipeEvent && (
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
                        src={currentSwipeEvent.image || '/placeholder.svg'}
                        alt={currentSwipeEvent.title}
                        className='h-full w-full rounded-t-lg object-cover'
                      />
                      <div className='absolute left-4 top-4'>
                        <Badge className='bg-white/90 font-medium text-gray-700'>
                          {currentSwipeEvent.category}
                        </Badge>
                      </div>
                      <div className='absolute right-4 top-4'>
                        <Badge className='bg-rose-500 text-white'>
                          ¥{currentSwipeEvent.price.toLocaleString()}
                        </Badge>
                      </div>

                      {/* Swipe Indicators */}
                      {dragOffset.x > 50 && (
                        <div className='absolute inset-0 flex items-center justify-center rounded-t-lg bg-green-500/20'>
                          <div className='rotate-12 transform rounded-full bg-green-500 px-6 py-3 text-lg font-bold text-white'>
                            LIKE
                          </div>
                        </div>
                      )}
                      {dragOffset.x < -50 && (
                        <div className='absolute inset-0 flex items-center justify-center rounded-t-lg bg-red-500/20'>
                          <div className='-rotate-12 transform rounded-full bg-red-500 px-6 py-3 text-lg font-bold text-white'>
                            PASS
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className='flex-1 space-y-3 p-4'>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1'>
                          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                          <span className='font-medium'>{currentSwipeEvent.rating}</span>
                          <span className='text-sm text-gray-500'>
                            ({currentSwipeEvent.reviewCount})
                          </span>
                        </div>
                        <div className='flex items-center gap-1 text-gray-500'>
                          <MapPin className='h-4 w-4' />
                          <span className='text-sm'>{currentSwipeEvent.location}</span>
                        </div>
                      </div>

                      <h3 className='text-lg font-bold leading-tight'>{currentSwipeEvent.title}</h3>

                      <p className='line-clamp-2 text-sm text-gray-600'>
                        {currentSwipeEvent.description}
                      </p>

                      <div className='flex flex-wrap gap-1'>
                        {currentSwipeEvent.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant='secondary' className='text-xs'>
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className='flex items-center justify-between pt-2'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={currentSwipeEvent.host.avatar || '/placeholder.svg'}
                            />
                            <AvatarFallback>{currentSwipeEvent.host.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className='text-sm font-medium'>{currentSwipeEvent.host.name}</span>
                        </div>
                        <div className='flex items-center gap-1 text-gray-500'>
                          <Users className='h-4 w-4' />
                          <span className='text-sm'>
                            {
                              currentSwipeEvent.participants.filter((p) => p.status === 'approved')
                                .length
                            }
                            /{currentSwipeEvent.capacity}
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
                className='h-16 w-16 rounded-full border-2 border-red-200 bg-transparent hover:border-red-300 hover:bg-red-50'
                onClick={() => handleSwipe('pass')}
              >
                <X className='h-8 w-8 text-red-500' />
              </Button>
              <Button
                size='lg'
                className='h-16 w-16 rounded-full bg-rose-500 hover:bg-rose-600'
                onClick={() => handleSwipe('like')}
              >
                <Heart className='h-8 w-8 text-white' />
              </Button>
            </div>

            {/* Progress */}
            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-500'>
                {currentSwipeIndex + 1} / {swipeEvents.length}
              </p>
              <div className='mt-2 h-1 w-full rounded-full bg-gray-200'>
                <div
                  className='h-1 rounded-full bg-rose-500 transition-all duration-300'
                  style={{ width: `${((currentSwipeIndex + 1) / swipeEvents.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Airbnb-style UI
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='sticky top-0 z-50 border-b bg-white'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-8'>
              <h1 className='text-2xl font-bold text-rose-500'>EventHub</h1>
              <div className='hidden items-center gap-6 md:flex'>
                <Button variant='ghost' className='text-gray-700'>
                  体験
                </Button>
                <Button variant='ghost' className='text-gray-700'>
                  オンライン体験
                </Button>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className='bg-rose-500 hover:bg-rose-600'>
                    <Plus className='mr-2 h-4 w-4' />
                    体験を作成
                  </Button>
                </DialogTrigger>
                <DialogContent className='max-w-md'>
                  <DialogHeader>
                    <DialogTitle>新しい体験を作成</DialogTitle>
                    <DialogDescription>体験の詳細を入力してください</DialogDescription>
                  </DialogHeader>
                  <div className='space-y-4'>
                    <div>
                      <Label htmlFor='title'>体験名</Label>
                      <Input
                        id='title'
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder='体験名を入力'
                      />
                    </div>
                    <div>
                      <Label htmlFor='description'>説明</Label>
                      <Textarea
                        id='description'
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder='体験の詳細を入力'
                        rows={3}
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='price'>料金（円）</Label>
                        <Input
                          id='price'
                          type='number'
                          value={newEvent.price}
                          onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                          placeholder='料金'
                        />
                      </div>
                      <div>
                        <Label htmlFor='capacity'>定員</Label>
                        <Input
                          id='capacity'
                          type='number'
                          value={newEvent.capacity}
                          onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                          placeholder='定員'
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor='location'>場所</Label>
                      <Input
                        id='location'
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        placeholder='開催場所'
                      />
                    </div>
                    <div>
                      <Label htmlFor='category'>カテゴリ</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='カテゴリを選択' />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='deadline'>締切日</Label>
                      <Input
                        id='deadline'
                        type='date'
                        value={newEvent.deadline}
                        onChange={(e) => setNewEvent({ ...newEvent, deadline: e.target.value })}
                      />
                    </div>
                    <div className='flex gap-2 pt-4'>
                      <Button
                        onClick={handleCreateEvent}
                        className='flex-1 bg-rose-500 hover:bg-rose-600'
                      >
                        作成
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() => setIsCreateDialogOpen(false)}
                        className='flex-1'
                      >
                        キャンセル
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setShowMatches(true)}
                className='relative hover:bg-rose-50'
              >
                <Heart className='h-5 w-5 text-rose-500' />
                {matches.length > 0 && (
                  <div className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500'>
                    <span className='text-xs font-bold text-white'>{matches.length}</span>
                  </div>
                )}
              </Button>
              <Avatar>
                <AvatarImage src='/placeholder.svg?height=32&width=32' />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className='container mx-auto px-6 py-6'>
        <div className='mb-8 flex flex-col gap-4 md:flex-row'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400' />
            <Input
              placeholder='体験を検索...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='h-12 border-gray-300 pl-10'
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className='h-12 w-full md:w-48'>
              <Filter className='mr-2 h-4 w-4' />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>すべてのカテゴリ</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className='group cursor-pointer border-0 shadow-sm transition-all duration-300 hover:shadow-lg'
              onClick={() => handleCardClick(event)}
            >
              <div className='relative'>
                <img
                  src={event.image || '/placeholder.svg'}
                  alt={event.title}
                  className='h-48 w-full rounded-t-lg object-cover'
                />
                <div className='absolute right-3 top-3'>{getStatusBadge(event.status)}</div>
                <div className='absolute left-3 top-3'>
                  <Badge variant='secondary' className='bg-white/90 text-gray-700'>
                    {event.category}
                  </Badge>
                </div>
                <div className='absolute inset-0 flex items-center justify-center rounded-t-lg bg-black/0 transition-all duration-300 group-hover:bg-black/10'>
                  <div className='opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <div className='flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 backdrop-blur-sm'>
                      <Heart className='h-4 w-4 text-rose-500' />
                      <span className='text-sm font-medium'>スワイプして選ぶ</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className='p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm font-medium'>{event.rating}</span>
                    <span className='text-sm text-gray-500'>({event.reviewCount})</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500'>
                    <MapPin className='h-4 w-4' />
                    <span className='text-sm'>{event.location}</span>
                  </div>
                </div>
                <h3 className='mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-rose-500'>
                  {event.title}
                </h3>
                <p className='mb-3 line-clamp-2 text-sm text-gray-600'>{event.description}</p>
                <div className='mb-3 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-6 w-6'>
                      <AvatarImage src={event.host.avatar || '/placeholder.svg'} />
                      <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-gray-600'>{event.host.name}</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500'>
                    <Users className='h-4 w-4' />
                    <span className='text-sm'>
                      {event.participants.filter((p) => p.status === 'approved').length}/
                      {event.capacity}
                    </span>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <span className='text-lg font-bold'>¥{event.price.toLocaleString()}</span>
                    <span className='text-sm text-gray-500'> / 人</span>
                  </div>
                  <Badge variant='outline' className='border-rose-200 text-rose-500'>
                    タップしてマッチ
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className='py-12 text-center'>
            <div className='mb-4 text-gray-400'>
              <Search className='mx-auto h-16 w-16' />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-gray-600'>体験が見つかりません</h3>
            <p className='text-gray-500'>検索条件を変更してお試しください</p>
          </div>
        )}
      </div>

      {/* Match Modal */}
      {showMatch && (
        <Dialog open={!!showMatch} onOpenChange={() => setShowMatch(null)}>
          <DialogContent className='max-w-sm'>
            <div className='space-y-4 text-center'>
              <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500'>
                <Sparkles className='h-10 w-10 text-white' />
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
                <Avatar className='h-16 w-16'>
                  <AvatarImage src='/placeholder.svg?height=64&width=64' />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <Heart className='h-8 w-8 text-rose-500' />
                <Avatar className='h-16 w-16'>
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
                <MessageCircle className='h-5 w-5 text-rose-500' />
                マッチ一覧
              </DialogTitle>
            </DialogHeader>
            <div className='max-h-96 space-y-3 overflow-y-auto'>
              {matches.length === 0 ? (
                <div className='py-8 text-center text-gray-500'>
                  <Heart className='mx-auto mb-4 h-12 w-12 text-gray-300' />
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
                      className='h-12 w-12 rounded-lg object-cover'
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
