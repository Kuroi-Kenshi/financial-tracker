import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type FinancialGoal } from '../../types/financialGoalSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getFinancialGoal = createAsyncThunk<
  FinancialGoal[],
  Record<string, string> | void,
  ThunkConfig<string>
>('financialGoal/get', async (queryObj, { extra, dispatch, rejectWithValue }) => {
  try {
    let query = null;
    if (queryObj) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query = new URLSearchParams(queryObj);
    }

    const response = await extra.api.get<FinancialGoal[]>('financial-goal');

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
