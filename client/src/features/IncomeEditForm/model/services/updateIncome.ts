import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '@/entities/Income';

export interface UpdateIncome extends Omit<Income, 'currency' | 'categoryIncome'> {
  categoryId: number;
  currencyId: number;
}

export const updateIncome = createAsyncThunk<Income, UpdateIncome, ThunkConfig<string>>(
  'entity/income/update',
  async (newIncomeData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Income>(`income/${newIncomeData.id}`, newIncomeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
