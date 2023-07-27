import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type FinancialGoal, type FinancialGoalSchema } from '../types/financialGoalSchema';
import { getFinancialGoal } from '../services/getFinancialGoal/getFinancialGoal';
import { updateFinancialGoal } from '../services/updateFinancialGoal/updateFinancialGoal';
import { deleteFinancialGoal } from '../services/deleteFinancialGoal/deleteFinancialGoal';
import { createFinancialGoal } from '../services/createFinancialGoal/createFinancialGoal';

const initialState: FinancialGoalSchema = {
  data: [],
  isLoading: false,
  error: undefined,
  modalInfo: {
    modalData: null,
    modalIsOpened: false,
  },
};

export const financialGoalSlice = createSlice({
  name: 'financialGoal',
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
    builder
      .addCase(getFinancialGoal.fulfilled, (state, action: PayloadAction<FinancialGoal[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateFinancialGoal.fulfilled, (state, action: PayloadAction<FinancialGoal>) => {
        state.isLoading = false;
        state.data = state.data.map((financialGoal) => {
          if (financialGoal.id === action.payload.id)
            return { ...financialGoal, ...action.payload };
          return financialGoal;
        });
      })
      .addCase(deleteFinancialGoal.fulfilled, (state, action: PayloadAction<FinancialGoal>) => {
        state.isLoading = false;
        state.data = state.data.filter((financialGoal) => financialGoal.id !== action.payload.id);
      })
      .addCase(createFinancialGoal.fulfilled, (state, action: PayloadAction<FinancialGoal>) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^financialGoal\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^financialGoal\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: financialGoalActions, reducer: financialGoalReducer } = financialGoalSlice;
