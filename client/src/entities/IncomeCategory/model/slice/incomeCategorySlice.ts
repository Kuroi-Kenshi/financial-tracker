import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type IncomeCategory, type IncomeCategorySchema } from '../types/incomeCategoriesSchema';
import { getIncomeCategory } from '../services/getIncomeCategories/getIncomeCategory';
import { updateIncomeCategory } from '../services/updateIncomeCategory/updateIncomeCategory';
import { deleteIncomeCategory } from '../services/deleteIncomeCategory/deleteIncomeCategory';
import { createIncomeCategory } from '../services/createIncomeCategory/createIncomeCategory';

const initialState: IncomeCategorySchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const incomeCategorySlice = createSlice({
  name: 'incomeCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIncomeCategory.fulfilled, (state, action: PayloadAction<IncomeCategory[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateIncomeCategory.fulfilled, (state, action: PayloadAction<IncomeCategory>) => {
        state.isLoading = false;
        state.data = state.data.map((incomeCategory) => {
          if (incomeCategory.id === action.payload.id) return action.payload;
          return incomeCategory;
        });
      })
      .addCase(
        deleteIncomeCategory.fulfilled,
        (state, action: PayloadAction<Pick<IncomeCategory, 'id'>>) => {
          state.isLoading = false;
          state.data = state.data.filter(
            (incomeCategory) => incomeCategory.id !== action.payload.id
          );
        }
      )
      .addCase(createIncomeCategory.fulfilled, (state, action: PayloadAction<IncomeCategory>) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^incomeCategory\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^incomeCategory\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: incomeCategoriesActions, reducer: incomeCategoriesReducer } =
  incomeCategorySlice;
