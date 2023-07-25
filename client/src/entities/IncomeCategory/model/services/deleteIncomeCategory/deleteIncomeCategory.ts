import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { IncomeCategory } from '../../types/incomeCategoriesSchema';
import { isAxiosError } from 'axios';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const deleteIncomeCategory = createAsyncThunk<IncomeCategory, number, ThunkConfig<string>>(
  'incomeCategory/delete',
  async (incomeCategoryId, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.delete<IncomeCategory>(
        `income-category/${incomeCategoryId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
