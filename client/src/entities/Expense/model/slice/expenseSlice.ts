import { createSlice } from '@reduxjs/toolkit';
import { ExpenseSchema } from '../types/expenseSchema';
import { getExpense } from '../services/getExpense/getExpense';

const initialState: ExpenseSchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    updateExpense(state, action) {},
    setExpense(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getExpense.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getExpense.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: expenseActions, reducer: expenseReducer } = expenseSlice;
