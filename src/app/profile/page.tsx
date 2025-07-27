import Profile from '@/components/profile/profile';
import { headers } from 'next/headers';

export default async function Server() {
  try {
    const headersList = headers();
    const cookie = (await headersList).get('cookie') || '';
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    });

    const profileData = await response.json();

    return <Profile profileData={profileData} />;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return <div>プロフィールデータの取得に失敗しました</div>;
  }
}
