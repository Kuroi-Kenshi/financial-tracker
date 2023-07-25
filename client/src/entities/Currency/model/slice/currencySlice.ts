import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Currency, CurrencySchema } from '../types/currency';
import { getCurrency } from '../services/getCurrency/getCurrency';

const initialState: CurrencySchema = {
  data: [],
  isLoading: false,
  error: '',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCurrency.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getCurrency.fulfilled, (state, action: PayloadAction<Currency[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: currencyActions, reducer: currencyReducer } = currencySlice;
