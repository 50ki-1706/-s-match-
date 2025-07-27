'use client';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Clock,
  Filter,
  Heart,
  MapPin,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Star,
  UserCheck,
  Users,
  UserX,
} from 'lucide-react';
import { useState } from 'react';

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
}

interface Participant {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'テクノロジー', 'デザイン', 'アート', '料理', 'スポーツ', '音楽'];

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

  const updateEventStatus = (eventId: string, status: Event['status']) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, status } : event)));
  };

  const updateParticipantStatus = (
    eventId: string,
    participantId: string,
    status: Participant['status'],
  ) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              participants: event.participants.map((p) =>
                p.id === participantId ? { ...p, status } : p,
              ),
            }
          : event,
      ),
    );
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

  const getParticipantStatusBadge = (status: Participant['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant='outline'>審査中</Badge>;
      case 'approved':
        return <Badge className='bg-green-100 text-green-800'>承認済み</Badge>;
      case 'rejected':
        return <Badge className='bg-red-100 text-red-800'>拒否</Badge>;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='sticky top-0 z-50 border-b bg-white'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-8'>
              <h1 className='text-2xl font-bold text-rose-500'>μ&apos;s MATCH!</h1>
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
                    <Plus className='mr-2 size-4' />
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
              <Button variant='ghost' size='icon'>
                <Heart className='size-5' />
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
      <div className='container mx-auto p-6'>
        <div className='mb-8 flex flex-col gap-4 md:flex-row'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400' />
            <Input
              placeholder='体験を検索...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='h-12 border-gray-300 pl-10'
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className='h-12 w-full md:w-48'>
              <Filter className='mr-2 size-4' />
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
              </div>
              <CardContent className='p-4'>
                <div className='mb-2 flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                    <Star className='size-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm font-medium'>{event.rating}</span>
                    <span className='text-sm text-gray-500'>({event.reviewCount})</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500'>
                    <MapPin className='size-4' />
                    <span className='text-sm'>{event.location}</span>
                  </div>
                </div>
                <h3 className='mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-rose-500'>
                  {event.title}
                </h3>
                <p className='mb-3 line-clamp-2 text-sm text-gray-600'>{event.description}</p>
                <div className='mb-3 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='size-6'>
                      <AvatarImage src={event.host.avatar || '/placeholder.svg'} />
                      <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className='text-sm text-gray-600'>{event.host.name}</span>
                  </div>
                  <div className='flex items-center gap-1 text-gray-500'>
                    <Users className='size-4' />
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
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setSelectedEvent(event)}
                    className='hover:border-rose-200 hover:bg-rose-50'
                  >
                    管理
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className='py-12 text-center'>
            <div className='mb-4 text-gray-400'>
              <Search className='mx-auto size-16' />
            </div>
            <h3 className='mb-2 text-xl font-semibold text-gray-600'>体験が見つかりません</h3>
            <p className='text-gray-500'>検索条件を変更してお試しください</p>
          </div>
        )}
      </div>

      {/* Event Management Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className='max-h-[80vh] max-w-4xl overflow-y-auto'>
            <DialogHeader>
              <div className='flex items-start gap-4'>
                <img
                  src={selectedEvent.image || '/placeholder.svg'}
                  alt={selectedEvent.title}
                  className='size-24 rounded-lg object-cover'
                />
                <div className='flex-1'>
                  <DialogTitle className='mb-2 text-xl'>{selectedEvent.title}</DialogTitle>
                  <div className='flex items-center gap-4 text-sm text-gray-600'>
                    <div className='flex items-center gap-1'>
                      <MapPin className='size-4' />
                      {selectedEvent.location}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Calendar className='size-4' />
                      締切: {new Date(selectedEvent.deadline).toLocaleDateString('ja-JP')}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Users className='size-4' />
                      {
                        selectedEvent.participants.filter((p) => p.status === 'approved').length
                      } / {selectedEvent.capacity}名
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreHorizontal className='size-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    {selectedEvent.status === 'active' ? (
                      <DropdownMenuItem
                        onClick={() => updateEventStatus(selectedEvent.id, 'paused')}
                      >
                        <Pause className='mr-2 size-4' />
                        募集を一時停止
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => updateEventStatus(selectedEvent.id, 'active')}
                      >
                        <Play className='mr-2 size-4' />
                        募集を再開
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => updateEventStatus(selectedEvent.id, 'closed')}>
                      <Clock className='mr-2 size-4' />
                      募集を締切
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogHeader>
            <Tabs defaultValue='participants' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='participants'>参加者管理</TabsTrigger>
                <TabsTrigger value='settings'>設定</TabsTrigger>
              </TabsList>
              <TabsContent value='participants' className='space-y-4'>
                {selectedEvent.participants.length === 0 ? (
                  <div className='py-8 text-center text-gray-500'>
                    <Users className='mx-auto mb-4 size-12 text-gray-300' />
                    <p>まだ参加申請がありません</p>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    {selectedEvent.participants.map((participant) => (
                      <div
                        key={participant.id}
                        className='flex items-center justify-between rounded-lg border bg-white p-4'
                      >
                        <div className='flex items-center gap-3'>
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&query=${participant.name}`}
                            />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className='font-medium'>{participant.name}</p>
                            <p className='text-sm text-gray-500'>{participant.email}</p>
                            <p className='text-xs text-gray-400'>
                              申請日: {new Date(participant.appliedAt).toLocaleDateString('ja-JP')}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          {getParticipantStatusBadge(participant.status)}
                          {participant.status === 'pending' && (
                            <div className='flex gap-1'>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() =>
                                  updateParticipantStatus(
                                    selectedEvent.id,
                                    participant.id,
                                    'approved',
                                  )
                                }
                                className='border-green-200 text-green-600 hover:bg-green-50'
                              >
                                <UserCheck className='size-4' />
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() =>
                                  updateParticipantStatus(
                                    selectedEvent.id,
                                    participant.id,
                                    'rejected',
                                  )
                                }
                                className='border-red-200 text-red-600 hover:bg-red-50'
                              >
                                <UserX className='size-4' />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value='settings' className='space-y-4'>
                <div className='grid gap-4'>
                  <div>
                    <Label>募集状態</Label>
                    <Select
                      value={selectedEvent.status}
                      onValueChange={(value: Event['status']) =>
                        updateEventStatus(selectedEvent.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='active'>募集中</SelectItem>
                        <SelectItem value='paused'>一時停止</SelectItem>
                        <SelectItem value='closed'>締切</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>締切日</Label>
                      <Input type='date' defaultValue={selectedEvent.deadline} />
                    </div>
                    <div>
                      <Label>定員</Label>
                      <Input type='number' defaultValue={selectedEvent.capacity} />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label>料金（円）</Label>
                      <Input type='number' defaultValue={selectedEvent.price} />
                    </div>
                    <div>
                      <Label>場所</Label>
                      <Input defaultValue={selectedEvent.location} />
                    </div>
                  </div>
                  <Button className='w-fit bg-rose-500 hover:bg-rose-600'>
                    <Settings className='mr-2 size-4' />
                    設定を更新
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
