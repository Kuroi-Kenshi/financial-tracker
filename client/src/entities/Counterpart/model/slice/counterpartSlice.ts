import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Counterpart, type CounterpartSchema } from '../types/counterpartSchema';
import { getCounterpart } from '../services/getCounterpart/getCounterpart';
import { updateCounterpart } from '../services/updateCounterpart/updateCounterpart';
import { deleteCounterpart } from '../services/deleteCounterpart/deleteCounterpart';
import { createCounterpart } from '../services/createCounterpart/createCounterpart';

const initialState: CounterpartSchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const counterpartSlice = createSlice({
  name: 'counterpart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCounterpart.fulfilled, (state, action: PayloadAction<Counterpart[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateCounterpart.fulfilled, (state, action: PayloadAction<Counterpart>) => {
        state.isLoading = false;
        state.data = state.data.map((counterpart) => {
          if (counterpart.id === action.payload.id) return action.payload;
          return counterpart;
        });
      })
      .addCase(deleteCounterpart.fulfilled, (state, action: PayloadAction<Counterpart>) => {
        state.isLoading = false;
        state.data = state.data.filter((counterpart) => counterpart.id !== action.payload.id);
      })
      .addCase(createCounterpart.fulfilled, (state, action: PayloadAction<Counterpart>) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^counterpart\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^counterpart\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: counterpartActions, reducer: counterpartReducer } = counterpartSlice;
