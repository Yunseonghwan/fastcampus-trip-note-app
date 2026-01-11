import { api } from "@/api";
import {
  RequestCreateTripDetailType,
  RequestUpdateTripDetailType,
  ResponseTripDetailList,
  TripDetailItemType,
} from "@/types/tripDetailType";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
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

export const useCreateTripDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: RequestCreateTripDetailType) => {
      const formData = new FormData();

      formData.append("tripId", body.tripId);
      formData.append("title", body.title);
      formData.append("content", body.content);
      formData.append("weather", body.weather);

      if (body.image) {
        const filename = body.image.fileName ?? "image.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("image", {
          uri: body.image.uri,
          name: filename,
          type,
        } as unknown as Blob);
      }

      const res = await api.post("/trip-items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-item-list"] });
    },
  });
};

export const useDeleteTripDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tripDetailId: string) => {
      const res = await api.delete(`/trip-items/${tripDetailId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trip-item-list"],
      });
    },
  });
};

export const useGetTripDetail = (
  tripDetailId: string
): UseQueryResult<TripDetailItemType> => {
  return useQuery({
    queryKey: ["trip-detail", tripDetailId],
    queryFn: async () => {
      const res = await api.get(`/trip-items/${tripDetailId}`);
      return res.data;
    },
  });
};

export const useUpdateTripDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: RequestUpdateTripDetailType) => {
      const formData = new FormData();

      formData.append("title", body.title);
      formData.append("content", body.content);
      formData.append("weather", body.weather);

      if (body.image) {
        const filename = body.image.fileName ?? "image.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("image", {
          uri: body.image.uri,
          name: filename,
          type,
        } as unknown as Blob);
      }

      const res = await api.patch(
        `/trip-items/${body.tripDetailId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-item-list"] });
    },
  });
};
