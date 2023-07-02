import { Currency } from '@/entities/Currency';
import { ExpenseCategory } from '@/entities/ExpenseCategory';

export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
  description: string;
  categoryExpense: ExpenseCategory;
  currency: Currency;
}

export interface ExpenseSchema {
  data: Expense[];
  isLoading: boolean;
  error?: string;
}
