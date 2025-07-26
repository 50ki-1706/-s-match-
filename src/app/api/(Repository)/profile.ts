import { prisma } from '@/lib/prisma';
import { UserProfile, UserProfileUpdate } from '../(type)/profile';

// プロフィール取得
export const getProfile = async (userId: string): Promise<UserProfile> => {
  // User本体
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      gender: true,
      image: true,
      headerImage: true,
      age: true,
      bio: true,
      UserFavoriteGenre: {
        select: { genre: true },
      },
      UserFavoriteArtist: {
        select: { artist: true },
      },
      Event: {
        select: { id: true, title: true },
      },
      Blog: {
        select: { id: true, title: true },
      },
    },
  });

  if (!user) throw new Error('ユーザーが見つかりません');

  return user;
};

// プロフィール更新
export const updateProfile = async (profile: UserProfileUpdate, userId: string) => {
  // User本体の更新
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: profile.name,
      image: profile.image,
      headerImage: profile.headerImage,
      gender: profile.gender,
      age: profile.age,
      bio: profile.bio,
    },
  });

  // お気に入りジャンルの更新
  if (profile.UserFavoriteGenre) {
    // 既存削除→新規作成
    await prisma.userFavoriteGenre.deleteMany({ where: { userId } });
    await prisma.userFavoriteGenre.createMany({
      data: profile.UserFavoriteGenre.map((genre) => ({ userId, genre: genre.genre })),
    });
  }

  // お気に入りアーティストの更新
  if (profile.UserFavoriteArtist) {
    // 既存削除→新規作成
    await prisma.userFavoriteArtist.deleteMany({ where: { userId } });
    await prisma.userFavoriteArtist.createMany({
      data: profile.UserFavoriteArtist.map((artist) => ({ userId, artist: artist.artist })),
    });
  }
};
