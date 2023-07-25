import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { ExpenseCategory } from '../../types/expenseCategoriesSchema';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteExpenseCategory = createAsyncThunk<ExpenseCategory, number, ThunkConfig<string>>(
  'expenseCategory/delete',
  async (expenseCategoryId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<ExpenseCategory>(
        `expense-category/${expenseCategoryId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
