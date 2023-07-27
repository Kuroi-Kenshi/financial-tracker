import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Credit } from '@/entities/Credit';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface CreateCredit extends Omit<Credit, 'id' | 'currency' | 'creditor'> {
  creditorId: number;
  currencyId: number;
}

export const createCredit = createAsyncThunk<Credit, CreateCredit, ThunkConfig<string>>(
  'credit/create',
  async (newCreditData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Credit>('credit', newCreditData);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
