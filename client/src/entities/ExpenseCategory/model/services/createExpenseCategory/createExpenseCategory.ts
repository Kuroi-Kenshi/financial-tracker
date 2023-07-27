import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { ExpenseCategory } from '../../types/expenseCategoriesSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const createExpenseCategory = createAsyncThunk<
  ExpenseCategory,
  Omit<ExpenseCategory, 'id' | 'totalExpense'>,
  ThunkConfig<string>
>('expenseCategory/create', async (newExpenseCategory, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.post<ExpenseCategory>('expense-category', newExpenseCategory);

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
