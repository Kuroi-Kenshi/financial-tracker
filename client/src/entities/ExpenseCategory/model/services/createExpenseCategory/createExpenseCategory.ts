import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { ExpenseCategory } from '../../types/expenseCategoriesSchema';
import { getExpenseCategory } from '../getExpenseCategories/getExpenseCategory';

export const createExpenseCategory = createAsyncThunk<
  ExpenseCategory,
  Omit<ExpenseCategory, 'id'>,
  ThunkConfig<string>
>(
  'entity/expenseCategory/create',
  async (newExpenseCategory, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<ExpenseCategory>(
        'expense-category',
        newExpenseCategory
      );
      if (!response.data) {
        throw new Error();
      }

      dispatch(getExpenseCategory);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
