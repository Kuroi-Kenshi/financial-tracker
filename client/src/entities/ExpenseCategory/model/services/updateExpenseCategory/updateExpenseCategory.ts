import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { ExpenseCategory } from '../../types/expenseCategoriesSchema';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const updateExpenseCategory = createAsyncThunk<
  ExpenseCategory,
  Omit<ExpenseCategory, 'totalExpense'>,
  ThunkConfig<string>
>('expenseCategory/update', async (newExpenseCategory, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.patch<ExpenseCategory>(
      `expense-category/${newExpenseCategory.id}`,
      newExpenseCategory
    );

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
