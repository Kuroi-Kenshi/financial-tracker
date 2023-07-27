import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { Expense } from '../../types/expenseSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteExpense = createAsyncThunk<Pick<Expense, 'id'>, number, ThunkConfig<string>>(
  'expense/delete',
  async (expenseId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<Pick<Expense, 'id'>>(`expense/${expenseId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
