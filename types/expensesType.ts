export type ExpensesCategoryType =
  | "FOOD"
  | "TRANSPORT"
  | "LODGING"
  | "ACTIVITY";

export interface CreateExpenseRequestType {
  tripId: string;
  amount: number;
  category: ExpensesCategoryType;
  memo?: string;
}
