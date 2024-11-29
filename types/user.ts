// types/user.ts
export interface User {
  chatId: number | null;
  chatRoomId: string | null;
  telegramId: string;
  name: string;
  bio: string;
  favorites: string[];
  token: string;
  key: string | null;
  folder: string | null;
  selectedAge: number | null;
  selectedHeight: number | null;
  city: string | null;
  img1: string | null;
  img2: string | null;
  img3: string | null;
  img4: string | null;
}
