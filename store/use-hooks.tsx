import { create } from "zustand";
import { citiesData } from "../data/bataCities";
import { provincesData } from "../data/provinces";

// Define types for the state
interface StoreState {
  cities: typeof citiesData;
  telegramId: string;
  appData: string | undefined;
  chatId: string | null;
  chatRoomId: string | null;
  favorites: string[];
  jobs: string[];
  gender: string;
  token: string;
  provinces: typeof provincesData;
  province: string | null;
  query: string;
  age: number | null;
  selectedAge: string;
  height: number | null;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  selectedHeight: number | null;
  bio: string;
  city: string;
  name: string;
  isAgeOpen: boolean;
  isCityOpen: boolean;
  key: string | null;
  inDate: string | null;
  currentTime: string;
  user2ChatId: string | null;
  user2key: string | null;
  user2img1: string;
  user2img2: string;
  user2img3: string;
  user2img4: string;
  voted: boolean;
  roomkey: string | null; // Added missing property
  setRoomKey: (key: string) => void; // Added missing setter for roomkey

  setAge: (num: number) => void;
  setSelectedAge: (num: string) => void;
  setGender: (gender: string) => void;
  setCities: (cities: typeof citiesData) => void;
  setHeight: (num: number) => void;
  setSelectedHeight: (num: number) => void;
  setProvinces: (provinces: typeof provincesData) => void;
  setFavorites: (items: string[]) => void;
  setJobs: (items: string[] | ((prev: string[]) => string[])) => void;

  setProvince: (province: string) => void;
  setQuery: (query: string) => void;
  setBio: (bio: string) => void;
  setCity: (city: string) => void;
  setName: (name: string) => void;
  setIsAgeOpen: (state: boolean) => void;
  setIsCityOpen: (state: boolean) => void;
  setImg1: (url: string) => void;
  setImg2: (url: string) => void;
  setImg3: (url: string) => void;
  setImg4: (url: string) => void;
  setuser2Img1: (url: string) => void;
  setuser2Img2: (url: string) => void;
  setuser2Img3: (url: string) => void;
  setuser2Img4: (url: string) => void;
  setuser2key: (num: string) => void;
  setuser2chatId: (num: string) => void;
  setKey: (num: string) => void;
  setInDate: (state: string) => void;
  setToken: (key: string) => void;
  setChatRoomID: (id: string) => void;
  setCurrentTime: (num: string) => void;
  setVoted: (state: boolean) => void;
  setTelegramId: (id: string) => void;
}

// Function to parse URL params
function parseUrlParams(url: string) {
  let params = new URLSearchParams(url);
  let result: { [key: string]: any } = {};

  for (let [key, value] of params.entries()) {
    if (key === "user" || key === "tgWebAppThemeParams") {
      result[key] = JSON.parse(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// If the code is running on the client side, get the hash from the URL
let parsed: Record<string, any> | undefined;
let appData: string | undefined;

if (typeof window !== "undefined") {
  const hash = window?.location.hash.substring(1) || "";
  parsed = parseUrlParams(decodeURIComponent(hash));
  appData = window.location.href.split("#")[1];
}

// Default empty favorites array
const favorites: string[] = [];
const jobs: string[] = [];

// Zustand store creation with initial state and setters
export const useStore = create<StoreState>((set) => ({
  cities: citiesData,
  telegramId: "",
  appData: appData,
  chatId: parsed?.user?.id ?? null,
  chatRoomId: null,
  favorites,
  jobs,
  gender: "",
  token: "",
  provinces: provincesData,
  province: null,
  query: "",
  age: null,
  selectedAge: "",
  height: null,
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  selectedHeight: null,
  bio: "",
  city: "",
  name: "",
  isAgeOpen: false,
  isCityOpen: false,
  key: null,
  inDate: null,
  currentTime: "",
  user2ChatId: null,
  user2key: null,
  user2img1: "",
  user2img2: "",
  user2img3: "",
  user2img4: "",
  voted: false,
  roomkey: null, // Initial state for roomkey
  setRoomKey: (key: string) => set(() => ({ roomkey: key })), // Setter for roomkey

  setAge: (num) => set((state) => ({ age: num })),
  setSelectedAge: (num) => set((state) => ({ selectedAge: num })),
  setGender: (gender) => set(() => ({ gender: `${gender}` })),
  setCities: (cities) => set(() => ({ cities })),
  setHeight: (num) => set(() => ({ height: num })),
  setSelectedHeight: (num) => set(() => ({ selectedHeight: num })),
  setProvinces: (provinces) => set(() => ({ provinces })),
  setFavorites: (items) => set(() => ({ favorites: items })),
  setJobs: (items) =>
    set((state) => ({
      jobs: typeof items === "function" ? items(state.jobs) : items,
    })),
  setProvince: (province) => set(() => ({ province })),
  setQuery: (query) => set(() => ({ query })),
  setBio: (bio) => set(() => ({ bio })),
  setCity: (city) => set(() => ({ city })),
  setName: (name) => set(() => ({ name })),
  setIsAgeOpen: (state) => set(() => ({ isAgeOpen: state })),
  setIsCityOpen: (state) => set(() => ({ isCityOpen: state })),
  setImg1: (url) => set(() => ({ img1: url })),
  setImg2: (url) => set(() => ({ img2: url })),
  setImg3: (url) => set(() => ({ img3: url })),
  setImg4: (url) => set(() => ({ img4: url })),
  setuser2Img1: (url) => set(() => ({ user2img1: url })),
  setuser2Img2: (url) => set(() => ({ user2img2: url })),
  setuser2Img3: (url) => set(() => ({ user2img3: url })),
  setuser2Img4: (url) => set(() => ({ user2img4: url })),
  setuser2key: (num) => set(() => ({ user2key: num })),
  setuser2chatId: (num) => set(() => ({ user2ChatId: num })),
  setKey: (num) => set(() => ({ key: num })),
  setInDate: (state) => set(() => ({ inDate: state })),
  setToken: (key) => set(() => ({ token: key })),
  setChatRoomID: (id) => set(() => ({ chatRoomId: id })),
  setCurrentTime: (num) => set(() => ({ currentTime: num })),
  setVoted: (state) => set(() => ({ voted: state })),
  setTelegramId: (id) => set(() => ({ telegramId: id })),
}));