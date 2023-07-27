import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type ExpenseCategory } from '../../types/expenseCategoriesSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteExpenseCategory = createAsyncThunk<
  Pick<ExpenseCategory, 'id'>,
  number,
  ThunkConfig<string>
>('expenseCategory/delete', async (expenseCategoryId, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.delete<Pick<ExpenseCategory, 'id'>>(
      `expense-category/${expenseCategoryId}`
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
