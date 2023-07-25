import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Credit } from '@/entities/Credit';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteCredit = createAsyncThunk<Pick<Credit, 'id'>, number, ThunkConfig<string>>(
  'credit/delete',
  async (creditId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<Pick<Credit, 'id'>>(`credit/${creditId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
