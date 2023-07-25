export interface ExpenseCategory {
  id: number;
  name: string;
  limitPerMonth: number | null;
  color: string;
  totalExpense: number;
}

export interface ExpenseCategorySchema {
  data: ExpenseCategory[];
  isLoading: boolean;
  error?: string;
}
