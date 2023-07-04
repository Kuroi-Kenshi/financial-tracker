import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Expense } from '@/entities/Expense';
import { getExpense } from '../getExpense/getExpense';

export interface CreateExpense extends Omit<Expense, 'id' | 'currency' | 'categoryExpense'> {
  categoryId: number;
  currencyId: number;
}

export const createExpense = createAsyncThunk<Expense, CreateExpense, ThunkConfig<string>>(
  'entity/expense/create',
  async (newExpenseData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Expense>('expense', newExpenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(getExpense());

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
