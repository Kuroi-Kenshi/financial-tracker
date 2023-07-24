import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '../../types/incomeSchema';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getIncome = createAsyncThunk<
  Income[],
  Record<string, string> | void,
  ThunkConfig<string>
>('income/get', async (queryObj, { extra, dispatch, rejectWithValue }) => {
  try {
    let query = null;
    if (queryObj) {
      query = new URLSearchParams(queryObj);
    }

    const response = await extra.api.get<Income[]>(`income?${query}`);

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
