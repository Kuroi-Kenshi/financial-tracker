import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { IncomeCategorySchema } from '../../types/incomeCategoriesSchema';
import { incomeCategoriesActions } from '../../slice/incomeCategorySlice';

export const getIncomeCategory = createAsyncThunk<
  IncomeCategorySchema[],
  void,
  ThunkConfig<string>
>('entity/incomeCategory', async (_, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.get<IncomeCategorySchema[]>('income-category');
    if (!response.data) {
      throw new Error();
    }

    dispatch(incomeCategoriesActions.setIncomeCategories(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error');
  }
});
