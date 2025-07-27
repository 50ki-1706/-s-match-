'use client';

import { UserProfile } from '@/lib/types/profile';
import { MusicGenre } from '@prisma/client';
import { useState } from 'react';
import BioArea from './BioArea';
import JoinedEvent from './JoinedEvent';
import TagsArea from './TagsArea';

type ProfileTabProps = {
  profileData: UserProfile;
  isEditing: boolean;
};

type newTagType = MusicGenre | string;

export const ProfileTab = ({ profileData, isEditing }: ProfileTabProps) => {
  const { bio, UserFavoriteGenre, UserFavoriteArtist } = profileData;
  const [genres, setGenres] = useState<MusicGenre[]>(UserFavoriteGenre);
  const [artists, setArtists] = useState(UserFavoriteArtist);
  const [newTag, setNewTag] = useState<newTagType>('');
  const [profileText, setProfileText] = useState(bio || 'よろしくお願いします');
  const [pastEvents, setPastEvents] = useState<{ date: string; name: string }[]>([]);

  const newTagTrim = (value: string) => {
    return value.trim();
  };

  const validGenre = (value: string): value is MusicGenre => {
    return (Object.values(MusicGenre) as readonly string[]).includes(value);
  };

  const addTag = (type: 'genre' | 'artist', value: newTagType) => {
    const newTag = newTagTrim(value);
    if (type === 'genre') {
      if (validGenre(newTag)) {
        setGenres([...genres, newTag]);
      }
    } else {
      setArtists([...artists, newTag]);
    }
    setNewTag('');
  };

  const removeTag = (type: 'genre' | 'artist', index: number) => {
    if (type === 'genre') {
      setGenres(genres.filter((_, i) => i !== index));
    } else {
      setArtists(artists.filter((_, i) => i !== index));
    }
  };

  return (
    <div className='space-y-6'>
      <BioArea profileText={profileText} setProfileText={setProfileText} isEditing={isEditing} />
      <TagsArea
        genres={genres}
        artists={artists}
        newTag={newTag}
        setNewTag={setNewTag}
        isEditing={isEditing}
        addTag={addTag}
        removeTag={removeTag}
      />
      <JoinedEvent pastEvents={pastEvents} isEditing={isEditing} />
    </div>
  );
};
