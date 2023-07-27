import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type IncomeCategory } from '../../types/incomeCategoriesSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const updateIncomeCategory = createAsyncThunk<
  IncomeCategory,
  IncomeCategory,
  ThunkConfig<string>
>('incomeCategory/update', async (newIncomeCategory, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.patch<IncomeCategory>(
      `income-category/${newIncomeCategory.id}`,
      newIncomeCategory
    );

    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return rejectWithValue(errorMessage);
  }
});
