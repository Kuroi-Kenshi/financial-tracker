import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { IncomeCategory } from '../../types/incomeCategoriesSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const createIncomeCategory = createAsyncThunk<
  IncomeCategory,
  Omit<IncomeCategory, 'id'>,
  ThunkConfig<string>
>('incomeCategory/create', async (newIncomeCategory, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.post<IncomeCategory>('income-category', newIncomeCategory);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
