import { api } from "@/api";
import { ResponseTripDetailList } from "@/types/tripDetailType";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

export const useGetTripDetailList = (
  tripId: string
): UseInfiniteQueryResult<{
  pages: ResponseTripDetailList[];
  pageParams: number[];
}> => {
  return useInfiniteQuery({
    queryKey: ["trip-item-list", tripId],
    queryFn: async ({ pageParam }) => {
      const res = await api.get(`/trip-items`, {
        params: {
          page: pageParam,
          tripId,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
    enabled: !!tripId,
  });
};

export const useGetWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_APP_WEATHER_API_KEY}`
      );
      return res.data;
    },
  });
};
