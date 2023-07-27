import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type ExpenseCategory } from '../../types/expenseCategoriesSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getExpenseCategory = createAsyncThunk<ExpenseCategory[], void, ThunkConfig<string>>(
  'expenseCategory/get',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<ExpenseCategory[]>('expense-category');

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
