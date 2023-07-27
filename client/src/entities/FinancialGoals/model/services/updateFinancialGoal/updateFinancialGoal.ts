import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { FinancialGoal } from '../../types/financialGoalSchema';
import { getFinancialGoal } from '../getFinancialGoal/getFinancialGoal';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface UpdateFinancialGoal extends Omit<FinancialGoal, 'currency'> {
  currencyId: number;
}

export const updateFinancialGoal = createAsyncThunk<
  FinancialGoal,
  UpdateFinancialGoal,
  ThunkConfig<string>
>('financialGoal/update', async (newFinancialGoalData, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.patch<FinancialGoal>(
      `financial-goal/${newFinancialGoalData.id}`,
      newFinancialGoalData
    );

    if (!response.data) {
      throw new Error();
    }

    dispatch(getFinancialGoal());

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
