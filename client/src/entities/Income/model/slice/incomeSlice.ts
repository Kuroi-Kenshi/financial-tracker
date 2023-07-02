import { createSlice } from '@reduxjs/toolkit';
import { IncomeSchema } from '../types/incomeSchema';
import { getIncome } from '../services/getIncome/getIncome';

const initialState: IncomeSchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncome(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getIncome.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getIncome.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: incomeActions, reducer: incomeReducer } = incomeSlice;
