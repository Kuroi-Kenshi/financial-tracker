import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { FinancialGoal } from '../../types/financialGoalSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteFinancialGoal = createAsyncThunk<FinancialGoal, number, ThunkConfig<string>>(
  'financialGoal/delete',
  async (financialGoalId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<FinancialGoal>(`financial-goal/${financialGoalId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
