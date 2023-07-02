import { Currency } from '@/entities/Currency';
import { IncomeCategory } from '@/entities/IncomeCategory';

export interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  description: string;
  categoryIncome: IncomeCategory;
  currency: Currency;
}

export interface IncomeSchema {
  data: Income[];
  isLoading: boolean;
  error?: string;
}
