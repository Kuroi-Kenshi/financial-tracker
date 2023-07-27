import { type AxiosInstance } from 'axios';
import { type ExpenseSchema } from '@/entities/Expense';
import { type AuthSchema } from '@/features/Auth';
import { type UserSchema } from '@/entities/User';
import { type ExpenseCategorySchema } from '@/entities/ExpenseCategory';
import { type CurrencySchema } from '@/entities/Currency/model/types/currency';
import { type IncomeSchema } from '@/entities/Income';
import { type IncomeCategorySchema } from '@/entities/IncomeCategory';
import { type DebtSchema } from '@/entities/Debt';
import { type CounterpartSchema } from '@/entities/Counterpart';
import { type CreditSchema } from '@/entities/Credit';
import { type FinancialGoalSchema } from '@/entities/FinancialGoals';
import {
  type AnyAction,
  type CombinedState,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject,
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
