import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Debt } from '../../types/debtSchema';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getDebt = createAsyncThunk<Debt[], Record<string, string> | void, ThunkConfig<string>>(
  'debt/get',
  async (queryObj, { extra, dispatch, rejectWithValue }) => {
    try {
      let query = null;

      if (queryObj) {
        query = new URLSearchParams(queryObj);
      }
      const response = await extra.api.get<Debt[]>(`debt?${query}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
