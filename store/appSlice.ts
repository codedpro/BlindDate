import { create } from "zustand";
import { App } from "@/types/app";
import { citiesData } from "@/data/bataCities";
import { provincesData } from "@/data/provinces";

interface AppState extends App {
  setCities: (cities: typeof citiesData) => void;
  setProvinces: (provinces: typeof provincesData) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cities: citiesData,
  provinces: provincesData,
  appData: undefined,
  setCities: (cities) => set({ cities }),
  setProvinces: (provinces) => set({ provinces }),
}));
