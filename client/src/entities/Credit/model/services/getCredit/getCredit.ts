import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Credit } from '../../types/creditSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getCredit = createAsyncThunk<
  Credit[],
  Record<string, string> | void,
  ThunkConfig<string>
>('credit/get', async (queryObj, { extra, dispatch, rejectWithValue }) => {
  try {
    let query = null;

    if (queryObj) {
      query = new URLSearchParams(queryObj);
    }
    const response = await extra.api.get<Credit[]>(`credit?${query}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
