import { createSlice } from '@reduxjs/toolkit';
import { ExpenseCategorySchema } from '../types/expenseCategoriesSchema';

const initialState: ExpenseCategorySchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const expenseCategorySlice = createSlice({
  name: 'expenseCategory',
  initialState,
  reducers: {
    setExpenseCategories(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { actions: expenseCategoriesActions, reducer: expenseCategoriesReducer } =
  expenseCategorySlice;
