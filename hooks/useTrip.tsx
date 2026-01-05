import { api } from "@/api";
import {
  RequestCreateType,
  ResponseTripListType,
  TripListItemType,
} from "@/types/tripType";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: RequestCreateType) => {
      const res = await api.post("/trips", body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-list"] });
    },
  });
};

export const useGetTripList = (): UseInfiniteQueryResult<{
  pages: ResponseTripListType[];
  pageParams: number[];
}> => {
  return useInfiniteQuery({
    queryKey: ["trip-list"],
    queryFn: async ({ pageParam }) => {
      const res = await api.get("/trips", {
        params: { page: pageParam },
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
  });
};

export const useGetTrip = (
  tripId: string
): UseQueryResult<TripListItemType> => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: async () => {
      const res = await api.get(`trips/${tripId}`);
      return res.data;
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: RequestCreateType & { tripId: string }) => {
      const res = await api.patch(`/trips/${body.tripId}`, {
        title: body.title,
        startDate: body.startDate,
        endDate: body.endDate,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trip-list"] });
    },
  });
};
