import { api } from "@/api";
import { RequestCreateType } from "@/types/tripType";
import { useMutation } from "@tanstack/react-query";

export const useCreateTrip = () => {
  return useMutation({
    mutationFn: async (body: RequestCreateType) => {
      const res = await api.post("/trips", body);
      return res.data;
    },
  });
};
