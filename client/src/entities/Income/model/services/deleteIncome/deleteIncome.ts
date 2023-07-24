import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '@/entities/Income';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteIncome = createAsyncThunk<Income, number, ThunkConfig<string>>(
  'income/delete',
  async (incomeId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<Income>(`income/${incomeId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
