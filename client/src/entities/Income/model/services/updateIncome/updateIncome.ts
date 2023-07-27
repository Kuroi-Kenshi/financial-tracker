import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '@/entities/Income';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface UpdateIncome extends Omit<Income, 'currency' | 'categoryIncome'> {
  categoryId: number;
  currencyId: number;
}

export const updateIncome = createAsyncThunk<Income, UpdateIncome, ThunkConfig<string>>(
  'income/update',
  async (newIncomeData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.patch<Income>(`income/${newIncomeData.id}`, newIncomeData);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
