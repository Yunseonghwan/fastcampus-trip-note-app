import { api } from "@/api";
import { MetaType } from "@/types/commonType";
import {
  CreateExpenseRequestType,
  ResponseExpensesList,
} from "@/types/expensesType";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreateExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateExpenseRequestType) => {
      const res = await api.post("/expenses", body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useGetExpenses = (
  tripId: string
): UseInfiniteQueryResult<{
  pages: ResponseExpensesList[];
  pageParams: MetaType;
  totalAmount: number;
}> => {
  return useInfiniteQuery({
    queryKey: ["expenses", tripId],
    queryFn: async ({ pageParam }) => {
      const res = await api.get("/expenses", {
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
  });
};
