export interface ExpenseCategory {
  id: number;
  name: string;
  color: string;
}

export interface ExpenseCategorySchema {
  data: ExpenseCategory[];
  isLoading: boolean;
  error?: string;
}
