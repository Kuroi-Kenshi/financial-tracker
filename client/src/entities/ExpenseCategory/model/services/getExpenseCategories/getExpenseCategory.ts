import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { ExpenseCategorySchema } from '../../types/expenseCategoriesSchema';
import { expenseCategoriesActions } from '../../slice/expenseSlice';

export const getExpenseCategory = createAsyncThunk<
  ExpenseCategorySchema[],
  void,
  ThunkConfig<string>
>('entity/expenseCategory', async (_, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.get<ExpenseCategorySchema[]>('expense-category');
    if (!response.data) {
      throw new Error();
    }

    dispatch(expenseCategoriesActions.setExpenseCategories(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
