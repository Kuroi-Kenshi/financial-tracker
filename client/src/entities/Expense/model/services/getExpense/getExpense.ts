import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Expense } from '../../types/expenseSchema';
import { expenseActions } from '../../slice/expenseSlice';

export const getExpense = createAsyncThunk<Expense[], void, ThunkConfig<string>>(
  'entity/expense',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Expense[]>('expense');
      if (!response.data) {
        throw new Error();
      }

      dispatch(expenseActions.setExpense(response.data));

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
