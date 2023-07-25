import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Debt } from '@/entities/Debt';
import { getDebt } from '../getDebt/getDebt';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteDebt = createAsyncThunk<Pick<Debt, 'id'>, number, ThunkConfig<string>>(
  'debt/delete',
  async (debtId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<Pick<Debt, 'id'>>(`debt/${debtId}`);

      dispatch(getDebt());

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
