// store/userSlice.ts
import { create } from "zustand";
import { User } from "@/types/user";

interface UserState extends User {
  height: number | null;
  setHeight: (height: number) => void;
  setSelectedHeight: (height: number) => void;
  setChatId: (id: number) => void;
  setChatRoomId: (id: string | null) => void;
  setTelegramId: (id: string) => void;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  setFavorites: (items: string[]) => void;
  setKey: (key: string | null) => void;
  setFolder: (folder: string | null) => void;
  setSelectedAge: (age: number | null) => void;
  setCity: (city: string | null) => void;
  setImg1: (url: string | null) => void;
  setImg2: (url: string | null) => void;
  setImg3: (url: string | null) => void;
  setImg4: (url: string | null) => void;
  setToken: (token: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  chatId: null,
  chatRoomId: null,
  telegramId: "",
  name: "",
  bio: "",
  favorites: [],
  key: null,
  token: "",
  folder: null,
  selectedAge: null,
  selectedHeight: null,
  city: null,
  height: null,
  img1: null,
  img2: null,
  img3: null,
  img4: null,
  setHeight: (height) => set({ height }),
  setSelectedHeight: (height) => set({ selectedHeight: height }),
  setChatId: (id) => set({ chatId: id }),
  setChatRoomId: (id) => set({ chatRoomId: id }),
  setTelegramId: (id) => set({ telegramId: id }),
  setName: (name) => set({ name }),
  setBio: (bio) => set({ bio }),
  setFavorites: (items) => set({ favorites: items }),
  setKey: (key) => set({ key }),
  setFolder: (folder) => set({ folder }),
  setSelectedAge: (age) => set({ selectedAge: age }),
  setCity: (city) => set({ city }),
  setImg1: (url) => set({ img1: url }),
  setImg2: (url) => set({ img2: url }),
  setImg3: (url) => set({ img3: url }),
  setImg4: (url) => set({ img4: url }),
  setToken: (token) => set({ token }),
}));
