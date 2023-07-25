import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { FinancialGoal } from '../../types/financialGoalSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export interface CreateFinancialGoal extends Omit<FinancialGoal, 'id' | 'currency'> {
  currencyId: number;
}

export const createFinancialGoal = createAsyncThunk<
  FinancialGoal,
  CreateFinancialGoal,
  ThunkConfig<string>
>('financialGoal/create', async (newFinancialGoalData, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.post<FinancialGoal>('financial-goal', newFinancialGoalData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
