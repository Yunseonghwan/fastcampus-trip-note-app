import { create } from "zustand";

interface TripInfoState {
  title: string;
  tripId: string;
  action: {
    setTripInfo: (tripId: string, title: string) => void;
  };
}

export const useTripInfoStore = create<TripInfoState>((set) => ({
  tripId: "",
  title: "",
  action: {
    setTripInfo: (tripId: string, title: string) => set({ title, tripId }),
  },
}));
