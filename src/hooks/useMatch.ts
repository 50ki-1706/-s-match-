'use client';

export const useMatch = () => {
  // イベント参加申請（Like時）
  const joinEvent = async (id: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/{id}/apply`, {
        method: 'POST',
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'イベント参加申請に失敗しました');
      }

      return await res.json();
    } catch (error) {
      console.error('Join event error:', error);
      throw error;
    }
  };

  const getUserMatches = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/matches`);
      if (!res.ok) {
        throw new Error('マッチ一覧の取得に失敗しました');
      }
      return await res.json();
    } catch (error) {
      console.error('Get matches error:', error);
      throw error;
    }
  };
};
