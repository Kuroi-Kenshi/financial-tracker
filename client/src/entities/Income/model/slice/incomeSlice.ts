import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Income, IncomeSchema } from '../types/incomeSchema';
import { getIncome } from '../services/getIncome/getIncome';
import { updateIncome } from '../services/updateIncome/updateIncome';
import { deleteIncome } from '../services/deleteIncome/deleteIncome';
import { createIncome } from '../services/createIncome/createIncome';

const initialState: IncomeSchema = {
  data: [],
  isLoading: false,
  error: undefined,
  modalInfo: {
    modalData: null,
    modalIsOpened: false,
  },
};

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    openEditModal(state, action) {
      state.modalInfo = {
        modalData: action.payload,
        modalIsOpened: true,
      };
    },
    closeEditModal(state) {
      state.modalInfo = {
        modalData: null,
        modalIsOpened: false,
      };
    },
  },
  extraReducers(builder) {
    const { actions } = incomeSlice;
    builder
      .addCase(getIncome.fulfilled, (state, action: PayloadAction<Income[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateIncome.fulfilled, (state, action: PayloadAction<Income>) => {
        state.isLoading = false;
        state.data = state.data.map((income) => {
          if (income.id === action.payload.id) return { ...income, ...action.payload };
          return income;
        });
      })
      .addCase(deleteIncome.fulfilled, (state, action: PayloadAction<Income>) => {
        state.isLoading = false;
        state.data = state.data.filter((income) => income.id !== action.payload.id);
      })
      .addCase(createIncome.fulfilled, (state, action: PayloadAction<Income>) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^income\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^income\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: incomeActions, reducer: incomeReducer } = incomeSlice;
