import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Expense } from '../../types/expenseSchema';
import { expenseActions } from '../../slice/expenseSlice';

export const getExpense = createAsyncThunk<
  Expense[],
  Record<string, string> | void,
  ThunkConfig<string>
>('entity/expense', async (queryObj, { extra, dispatch, rejectWithValue }) => {
  try {
    let query = null;

    if (queryObj) {
      query = new URLSearchParams(queryObj);
    }
    const response = await extra.api.get<Expense[]>(`expense?${query}`);
    if (!response.data) {
      throw new Error();
    }

    dispatch(expenseActions.setExpense(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
