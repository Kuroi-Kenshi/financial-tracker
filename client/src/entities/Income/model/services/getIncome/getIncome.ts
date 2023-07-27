import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Income } from '../../types/incomeSchema';
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

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await extra.api.get<Income[]>(`income?${query}`);

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
