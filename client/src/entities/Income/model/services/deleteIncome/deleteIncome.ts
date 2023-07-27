import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Income } from '@/entities/Income';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteIncome = createAsyncThunk<Pick<Income, 'id'>, number, ThunkConfig<string>>(
  'income/delete',
  async (incomeId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<Pick<Income, 'id'>>(`income/${incomeId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
