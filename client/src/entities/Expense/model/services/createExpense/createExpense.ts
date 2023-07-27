import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Expense } from '@/entities/Expense';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';
export interface CreateExpense
  extends Omit<Expense, 'id' | 'currency' | 'categoryExpense' | 'receipt'> {
  categoryId: number;
  currencyId: number;
  receipt?: File[];
}

export const createExpense = createAsyncThunk<Expense, CreateExpense, ThunkConfig<string>>(
  'expense/create',
  async (newExpenseData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Expense>('expense', newExpenseData);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
