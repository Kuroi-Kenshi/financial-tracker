import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '@/entities/Income';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface CreateIncome extends Omit<Income, 'id' | 'currency' | 'categoryIncome'> {
  categoryId: number;
  currencyId: number;
}

export const createIncome = createAsyncThunk<Income, CreateIncome, ThunkConfig<string>>(
  'income/create',
  async (newIncomeData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Income>('income', newIncomeData);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
