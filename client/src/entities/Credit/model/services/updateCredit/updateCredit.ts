import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Credit } from '@/entities/Credit';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface UpdateCredit extends Omit<Credit, 'currency' | 'creditor'> {
  creditorId: number;
  currencyId: number;
}

export const updateCredit = createAsyncThunk<Credit, UpdateCredit, ThunkConfig<string>>(
  'credit/update',
  async (newCreditData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.patch<Credit>(`credit/${newCreditData.id}`, newCreditData);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
