import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { ExpenseCategory } from '../../types/expenseCategoriesSchema';
import { isAxiosError } from 'axios';
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
