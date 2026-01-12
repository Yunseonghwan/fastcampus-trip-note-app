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
  useQuery,
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

export const useDeleteExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expensesId: string) => {
      const res = await api.delete(`/expenses/${expensesId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};

export const useGetExpense = (expenseId: string) => {
  return useQuery({
    queryKey: ["expense", expenseId],
    queryFn: async () => {
      const res = await api.get(`/expenses/${expenseId}`);
      return res.data;
    },
  });
};

export const useUpdateExpenses = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      body: CreateExpenseRequestType & { expenseId: string }
    ) => {
      const res = await api.patch(`/expenses/${body.expenseId}`, {
        amount: body.amount,
        category: body.category,
        memo: body.memo,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
  });
};
