import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { type Expense, type ExpenseReqParams, ExpenseReqType } from '../../types/expenseSchema';
import { expenseActions } from '../../slice/expenseSlice';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const getExpense = createAsyncThunk<Expense[], ExpenseReqParams | void, ThunkConfig<string>>(
  'expense/get',
  async (reqParams, { extra, dispatch, rejectWithValue }) => {
    try {
      let query: URLSearchParams | null = null;

      if (reqParams?.query) {
        query = new URLSearchParams(reqParams.query);
      }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const requestPath = query ? `expense?${query}` : 'expense';
      const response = await extra.api.get<Expense[]>(requestPath);

      if (reqParams?.mode === ExpenseReqType.NORMAL) {
        dispatch(expenseActions.setFilteredExpense(response.data));
      } else {
        dispatch(expenseActions.setLastExpense(response.data));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
