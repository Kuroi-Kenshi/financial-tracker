import { configureStore } from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { type StateSchema } from '@/shared/types/StateSchema';
import { counterpartReducer } from '@/entities/Counterpart';
import { creditReducer } from '@/entities/Credit';
import { currencyReducer } from '@/entities/Currency';
import { debtReducer } from '@/entities/Debt';
import { expenseReducer } from '@/entities/Expense';
import { expenseCategoriesReducer } from '@/entities/ExpenseCategory';
import { financialGoalReducer } from '@/entities/FinancialGoals';
import { incomeReducer } from '@/entities/Income';
import { incomeCategoriesReducer } from '@/entities/IncomeCategory';
import { userReducer } from '@/entities/User';
import { authReducer } from '@/features/Auth';

export function createReduxStore(initialState?: StateSchema) {
  const store = configureStore({
    reducer: {
      login: authReducer,
      user: userReducer,
      expenses: expenseReducer,
      expenseCategories: expenseCategoriesReducer,
      incomes: incomeReducer,
      incomeCategories: incomeCategoriesReducer,
      currencies: currencyReducer,
      debts: debtReducer,
      credits: creditReducer,
      counterpart: counterpartReducer,
      financialGoal: financialGoalReducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
          },
        },
      }),
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
