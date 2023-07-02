import { createSlice } from '@reduxjs/toolkit';
import { IncomeCategorySchema } from '../types/incomeCategoriesSchema';

const initialState: IncomeCategorySchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const incomeCategorySlice = createSlice({
  name: 'incomeCategory',
  initialState,
  reducers: {
    setIncomeCategories(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { actions: incomeCategoriesActions, reducer: incomeCategoriesReducer } =
  incomeCategorySlice;
