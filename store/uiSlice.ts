import { create } from "zustand";
import { UIState } from "@/types/ui";

interface UIStore extends UIState {
  setIsAgeOpen: (state: boolean) => void;
  setIsCityOpen: (state: boolean) => void;
  setTheme: (theme: "light" | "dark") => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAgeOpen: false,
  isCityOpen: false,
  theme: "light", // Default theme
  isLoading: false, // Default loading state

  setIsAgeOpen: (state) => set({ isAgeOpen: state }),
  setIsCityOpen: (state) => set({ isCityOpen: state }),
  setTheme: (theme) => set({ theme }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
