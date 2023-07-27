import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Counterpart } from '../../types/counterpartSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getCounterpart = createAsyncThunk<Counterpart[], void, ThunkConfig<string>>(
  'counterpart/get',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Counterpart[]>('counterpart');

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
