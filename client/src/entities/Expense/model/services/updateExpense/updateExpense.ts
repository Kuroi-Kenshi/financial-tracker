import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Expense } from '../../types/expenseSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface UpdateExpense extends Omit<Expense, 'currency' | 'categoryExpense' | 'receipt'> {
  categoryId: number;
  currencyId: number;
  receipt?: File[];
}

export const updateExpense = createAsyncThunk<Expense, UpdateExpense, ThunkConfig<string>>(
  'expense/update',
  async (newExpenseData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.patch<Expense>(
        `expense/${newExpenseData.id}`,
        newExpenseData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
