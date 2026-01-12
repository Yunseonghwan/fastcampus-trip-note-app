import { MetaType } from "./commonType";

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

export interface ExpensesItemType {
  id: string;
  amount: number;
  category: ExpensesCategoryType;
  createdAt: string | Date;
}

export interface ResponseExpensesList {
  data: ExpensesItemType[];
  meta: MetaType;
  totalAmount: number;
}
