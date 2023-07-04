import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Expense } from '@/entities/Expense';
import { getExpense } from '../getExpense/getExpense';

export interface UpdateExpense extends Omit<Expense, 'currency' | 'categoryExpense'> {
  categoryId: number;
  currencyId: number;
}

export const updateExpense = createAsyncThunk<Expense, UpdateExpense, ThunkConfig<string>>(
  'entity/expense/update',
  async (newExpenseData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Expense>(
        `expense/${newExpenseData.id}`,
        newExpenseData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
