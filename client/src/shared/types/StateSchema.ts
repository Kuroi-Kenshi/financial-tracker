import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { ExpenseSchema } from '@/entities/Expense';
import { LoginSchema } from '@/features/Auth';
import { UserSchema } from '@/entities/User';
import { ExpenseCategorySchema } from '@/entities/ExpenseCategory';
import { CurrencySchema } from '@/entities/Currency/model/types/currency';
import { IncomeSchema } from '@/entities/Income';
import { IncomeCategorySchema } from '@/entities/IncomeCategory';

export interface StateSchema {
  login: LoginSchema;
  user: UserSchema;
  expenses: ExpenseSchema;
  incomes: IncomeSchema;
  expenseCategories: ExpenseCategorySchema;
  incomeCategories: IncomeCategorySchema;
  currencies: CurrencySchema;
}

export interface ThunkExtraArgs {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArgs;
}
