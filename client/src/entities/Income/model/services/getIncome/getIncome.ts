import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Income } from '../../types/incomeSchema';
import { incomeActions } from '../../slice/incomeSlice';

export const getIncome = createAsyncThunk<
  Income[],
  Record<string, string> | void,
  ThunkConfig<string>
>('entity/income', async (queryObj, { extra, dispatch, rejectWithValue }) => {
  try {
    let query = null;
    if (queryObj) {
      query = new URLSearchParams(queryObj);
    }

    const response = await extra.api.get<Income[]>(`income?${query}`);
    if (!response.data) {
      throw new Error();
    }

    dispatch(incomeActions.setIncome(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
