'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { UserProfile } from '@/lib/types/profile';
import { useState } from 'react';
import { BlogTab } from './blogTab';
import { EventsTab } from './eventsTab';
import Header from './header';
import { ProfileTab } from './profileTab';
import { ProfileTabs } from './tabs';
import UpperTabs from './upperTabs';
import UserIcon from './userIcon';

const PAGE_NAMES = ['profile', 'events', 'blog'] as const;

type PageType = (typeof PAGE_NAMES)[number];

const isPageType = (value: string): value is PageType => {
  return (PAGE_NAMES as readonly string[]).includes(value);
};

const ProfilePage = ({ profileData }: { profileData: UserProfile }) => {
  const { id, name, image } = profileData;
  const [activeTab, setActiveTab] = useState<PageType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userImage, setUserImage] = useState(image || '/placeholder.svg?height=128&width=128');
  const [userName, setUserName] = useState(name || 'unknown');
  const [userId, setUserId] = useState(id || '');

  return (
    <div className='relative min-h-screen' style={{ backgroundColor: '#fcfcff' }}>
      <Header />
      <UserIcon userImage={userImage} />
      <div className='px-4 pt-20 md:px-8'>
        <UpperTabs
          userName={userName}
          userId={userId}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <Tabs
          value={activeTab}
          onValueChange={(value: string) => {
            if (isPageType(value)) {
              setActiveTab(value);
            }
          }}
          className='w-full'
        >
          <ProfileTabs />
          <TabsContent value='profile'>
            <ProfileTab profileData={profileData} isEditing={isEditing} />
          </TabsContent>
          <TabsContent value='events'>
            <EventsTab />
          </TabsContent>
          <TabsContent value='blog'>
            <BlogTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
