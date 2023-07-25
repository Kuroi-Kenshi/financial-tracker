import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Debt } from '../../types/debtSchema';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface CreateDebt extends Omit<Debt, 'id' | 'currency' | 'debtor'> {
  debtorId: number;
  currencyId: number;
}

export const createDebt = createAsyncThunk<Debt, CreateDebt, ThunkConfig<string>>(
  'debt/create',
  async (newDebtData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<Debt>('debt', newDebtData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
