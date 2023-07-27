import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type IncomeCategory } from '../../types/incomeCategoriesSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteIncomeCategory = createAsyncThunk<
  Pick<IncomeCategory, 'id'>,
  number,
  ThunkConfig<string>
>('incomeCategory/delete', async (incomeCategoryId, { extra, dispatch, rejectWithValue }) => {
  try {
    const response = await extra.api.delete<IncomeCategory>(`income-category/${incomeCategoryId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
