import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Counterpart } from '../../types/counterpartSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const updateCounterpart = createAsyncThunk<Counterpart, Counterpart, ThunkConfig<string>>(
  'counterpart/update',
  async (newCounterpart, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.patch<Counterpart>(
        `counterpart/${newCounterpart.id}`,
        newCounterpart
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
