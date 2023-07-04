import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '@/entities/Income';
import { getIncome } from '../getIncome/getIncome';

export interface CreateIncome extends Omit<Income, 'id' | 'currency' | 'categoryIncome'> {
  categoryId: number;
  currencyId: number;
}

export const createIncome = createAsyncThunk<Income, CreateIncome, ThunkConfig<string>>(
  'entity/income/create',
  async (newIncomeData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Income>('income', newIncomeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(getIncome());

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
