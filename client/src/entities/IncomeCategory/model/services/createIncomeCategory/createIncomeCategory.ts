import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { IncomeCategory, IncomeCategorySchema } from '../../types/incomeCategoriesSchema';
import { incomeCategoriesActions } from '../../slice/incomeCategorySlice';
import { getIncomeCategory } from '../getIncomeCategories/getIncomeCategory';

export const createIncomeCategory = createAsyncThunk<
  IncomeCategory,
  Omit<IncomeCategory, 'id'>,
  ThunkConfig<string>
>(
  'entity/incomeCategory/create',
  async (newIncomeCategory, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<IncomeCategory>('income-category', newIncomeCategory);
      if (!response.data) {
        throw new Error();
      }

      dispatch(getIncomeCategory());

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
