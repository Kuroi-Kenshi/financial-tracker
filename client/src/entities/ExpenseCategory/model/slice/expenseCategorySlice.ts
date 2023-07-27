import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ExpenseCategory, ExpenseCategorySchema } from '../types/expenseCategoriesSchema';
import { getExpenseCategory } from '../services/getExpenseCategories/getExpenseCategory';
import { updateExpenseCategory } from '../services/updateExpenseCategory/updateExpenseCategory';
import { deleteExpenseCategory } from '../services/deleteExpenseCategory/deleteExpenseCategory';
import { createExpenseCategory } from '../services/createExpenseCategory/createExpenseCategory';

const initialState: ExpenseCategorySchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const expenseCategorySlice = createSlice({
  name: 'expenseCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getExpenseCategory.fulfilled, (state, action: PayloadAction<ExpenseCategory[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateExpenseCategory.fulfilled, (state, action: PayloadAction<ExpenseCategory>) => {
        state.isLoading = false;
        state.data = state.data.map((expenseCategory) => {
          if (expenseCategory.id === action.payload.id)
            return { ...expenseCategory, ...action.payload };
          return expenseCategory;
        });
      })
      .addCase(
        deleteExpenseCategory.fulfilled,
        (state, action: PayloadAction<Pick<ExpenseCategory, 'id'>>) => {
          state.isLoading = false;
          state.data = state.data.filter(
            (expenseCategory) => expenseCategory.id !== action.payload.id
          );
        }
      )
      .addCase(createExpenseCategory.fulfilled, (state, action: PayloadAction<ExpenseCategory>) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^expenseCategory\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^expenseCategory\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: expenseCategoriesActions, reducer: expenseCategoriesReducer } =
  expenseCategorySlice;
