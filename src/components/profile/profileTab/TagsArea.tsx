import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MusicGenre } from '@prisma/client';
import { Music, Plus } from 'lucide-react';

interface TagsAreaProps {
  genres: MusicGenre[];
  artists: string[];
  newTag: string;
  setNewTag: (value: string) => void;
  isEditing: boolean;
  addTag: (type: 'genre' | 'artist', value: string) => void;
  removeTag: (type: 'genre' | 'artist', index: number) => void;
}

const TagsArea = ({
  genres,
  artists,
  newTag,
  setNewTag,
  isEditing,
  addTag,
  removeTag,
}: TagsAreaProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className='flex items-center text-lg font-semibold'>
          <Music className='mr-2 size-5' style={{ color: '#0de1db' }} />
          好きな音楽ジャンル・アーティスト
        </h3>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <h4 className='mb-2 font-medium'>ジャンル</h4>
          <div className='mb-2 flex flex-wrap gap-2'>
            {genres.map((genre: MusicGenre, index: number) => (
              <Badge
                key={index}
                variant='secondary'
                className='cursor-pointer'
                style={{ backgroundColor: '#0de1db', color: 'white' }}
                onClick={() => isEditing && removeTag('genre', index)}
              >
                {genre} {isEditing && '×'}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className='flex gap-2'>
              <Input
                placeholder='新しいジャンルを追加'
                value={newTag}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === 'Enter' && addTag('genre', newTag)
                }
              />
              <Button onClick={() => addTag('genre', newTag)} size='sm'>
                <Plus className='size-4' />
              </Button>
            </div>
          )}
        </div>

        <div>
          <h4 className='mb-2 font-medium'>アーティスト</h4>
          <div className='mb-2 flex flex-wrap gap-2'>
            {artists.map((artist: string, index: number) => (
              <Badge
                key={index}
                variant='outline'
                className='cursor-pointer'
                onClick={() => isEditing && removeTag('artist', index)}
              >
                {artist} {isEditing && '×'}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className='flex gap-2'>
              <Input
                placeholder='新しいアーティストを追加'
                value={newTag}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === 'Enter' && addTag('artist', newTag)
                }
              />
              <Button onClick={() => addTag('artist', newTag)} size='sm'>
                <Plus className='size-4' />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsArea;
