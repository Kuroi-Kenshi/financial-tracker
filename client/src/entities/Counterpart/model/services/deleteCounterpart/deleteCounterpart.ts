import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Counterpart } from '../../types/counterpartSchema';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteCounterpart = createAsyncThunk<Counterpart, number, ThunkConfig<string>>(
  'counterpart/delete',
  async (counterpartId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<Counterpart>(`counterpart/${counterpartId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
