import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Debt } from '@/entities/Debt';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface UpdateDebt extends Omit<Debt, 'currency' | 'debtor'> {
  debtorId: number;
  currencyId: number;
}

export const updateDebt = createAsyncThunk<Debt, UpdateDebt, ThunkConfig<string>>(
  'debt/update',
  async (newDebtData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.patch<Debt>(`debt/${newDebtData.id}`, newDebtData, {
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
