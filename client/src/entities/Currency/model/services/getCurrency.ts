import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Currency } from '../types/currency';
import { currencyActions } from '../slice/currencySlice';

export const getCurrency = createAsyncThunk<Currency[], void, ThunkConfig<string>>(
  'entity/currency',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Currency[]>('currency');

      if (!response.data) {
        throw new Error();
      }

      dispatch(currencyActions.setCurrency(response.data));

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
