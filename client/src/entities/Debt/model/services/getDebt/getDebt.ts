import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Debt } from '../../types/debtSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getDebt = createAsyncThunk<Debt[], Record<string, string> | void, ThunkConfig<string>>(
  'debt/get',
  async (queryObj, { extra, dispatch, rejectWithValue }) => {
    try {
      let query = null;

      if (queryObj) {
        query = new URLSearchParams(queryObj);
      }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const response = await extra.api.get<Debt[]>(`debt?${query}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
