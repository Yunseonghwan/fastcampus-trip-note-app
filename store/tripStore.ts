import { ResponseTripListType } from "@/types/tripType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const CACHE_DURATION = 1000 * 60 * 5;

interface TripCacheState {
  cachedTrips: ResponseTripListType | null;
  cachedAt: number | null;
  actions: {
    setCachedTrips: (data: ResponseTripListType) => void;
    clearCache: () => void;
    isCacheValid: () => void;
  };
}

export const useTripStore = create<TripCacheState>()(
  persist(
    (set, get) => ({
      cachedTrips: null,
      cachedAt: null,
      actions: {
        setCachedTrips: (data: ResponseTripListType) => {
          set({
            cachedTrips: data,
            cachedAt: Date.now(),
          });
        },
        clearCache: () => {
          set({
            cachedTrips: null,
            cachedAt: null,
          });
        },
        isCacheValid: () => {
          const { cachedAt } = get();
          if (!cachedAt) return false;
          return Date.now() - cachedAt < CACHE_DURATION;
        },
      },
    }),
    {
      name: "trip-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cachedTrips: state.cachedTrips,
        cachedAt: state.cachedAt,
      }),
    }
  )
);
