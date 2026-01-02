import { api } from "@/api";
import { RequestCreateType, ResponseTripListType } from "@/types/tripType";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: async (body: RequestCreateType) => {
      const res = await api.post("/trips", body);
      return res.data;
    },
  });
};

export const useGetTripList = (): UseQueryResult<ResponseTripListType> => {
  return useQuery({
    queryKey: ["trip-list"],
    queryFn: async () => {
      const res = await api.get("/trips");
      return res.data;
    },
  });
};
