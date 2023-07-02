import { currencyReducer } from '@/entities/Currency';
import { expenseReducer } from '@/entities/Expense';
import { expenseCategoriesReducer } from '@/entities/ExpenseCategory';
import { incomeReducer } from '@/entities/Income';
import { incomeCategoriesReducer } from '@/entities/IncomeCategory';
import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/Auth';
import { $api } from '@/shared/api/api';
import { StateSchema } from '@/shared/types/StateSchema';
import { configureStore } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export function createReduxStore(initialState?: StateSchema, navigate?: NavigateFunction) {
  const store = configureStore({
    reducer: {
      login: loginReducer,
      user: userReducer,
      expenses: expenseReducer,
      expenseCategories: expenseCategoriesReducer,
      incomes: incomeReducer,
      incomeCategories: incomeCategoriesReducer,
      currencies: currencyReducer,
    },
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
            navigate,
          },
        },
      }),
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
