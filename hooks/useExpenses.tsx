import { api } from "@/api";
import { CreateExpenseRequestType } from "@/types/expensesType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
