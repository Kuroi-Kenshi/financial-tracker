import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Debt } from '@/entities/Debt';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteDebt = createAsyncThunk<Pick<Debt, 'id'>, number, ThunkConfig<string>>(
  'debt/delete',
  async (debtId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<Pick<Debt, 'id'>>(`debt/${debtId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
