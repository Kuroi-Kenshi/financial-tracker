import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Expense } from '@/entities/Expense';
import { getExpense } from '../getExpense/getExpense';
import { isAxiosError } from 'axios';
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
      const response = await extra.api.post<Expense>('expense', newExpenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
