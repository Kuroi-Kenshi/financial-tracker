import { AxiosInstance } from 'axios';
import { ExpenseSchema } from '@/entities/Expense';
import { AuthSchema } from '@/features/Auth';
import { UserSchema } from '@/entities/User';
import { ExpenseCategorySchema } from '@/entities/ExpenseCategory';
import { CurrencySchema } from '@/entities/Currency/model/types/currency';
import { IncomeSchema } from '@/entities/Income';
import { IncomeCategorySchema } from '@/entities/IncomeCategory';
import { DebtSchema } from '@/entities/Debt';
import { CounterpartSchema } from '@/entities/Counterpart';
import { CreditSchema } from '@/entities/Credit';
import { FinancialGoalSchema } from '@/entities/FinancialGoals';
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';

export interface StateSchema {
  auth: AuthSchema;
  user: UserSchema;
  expenses: ExpenseSchema;
  incomes: IncomeSchema;
  expenseCategories: ExpenseCategorySchema;
  incomeCategories: IncomeCategorySchema;
  currencies: CurrencySchema;
  debts: DebtSchema;
  credits: CreditSchema;
  counterpart: CounterpartSchema;
  financialGoal: FinancialGoalSchema;
}

export interface ThunkExtraArgs {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArgs;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
