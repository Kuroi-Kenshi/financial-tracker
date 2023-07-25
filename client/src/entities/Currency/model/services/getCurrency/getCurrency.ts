import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Currency } from '../../types/currency';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getCurrency = createAsyncThunk<Currency[], void, ThunkConfig<string>>(
  'currency/get',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Currency[]>('currency');

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
