import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Credit } from '../../types/creditSchema';
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
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await extra.api.get<Credit[]>(`credit?${query}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
