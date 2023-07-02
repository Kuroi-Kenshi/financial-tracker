import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '../../types/incomeSchema';
import { incomeActions } from '../../slice/incomeSlice';

export const getIncome = createAsyncThunk<Income[], void, ThunkConfig<string>>(
  'entity/income',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Income[]>('income');
      if (!response.data) {
        throw new Error();
      }

      dispatch(incomeActions.setIncome(response.data));

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
