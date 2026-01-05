import { create } from "zustand";

interface TripTitleState {
  title: string;
  action: {
    setTitle: (title: string) => void;
  };
}

export const useTripTitleStore = create<TripTitleState>((set) => ({
  title: "",
  action: {
    setTitle: (title: string) => set({ title }),
  },
}));
