import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Debt, DebtSchema } from '../types/debtSchema';
import { getDebt } from '../services/getDebt/getDebt';
import { createDebt } from '../services/createDebt/createDebt';
import { updateDebt } from '../services/updateDebt/updateDebt';
import { deleteDebt } from '../services/deleteDebt/deleteDebt';

const initialState: DebtSchema = {
  data: [],
  isLoading: false,
  error: undefined,
  modalInfo: {
    modalData: null,
    modalIsOpened: false,
  },
};

export const debtSlice = createSlice({
  name: 'debt',
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
      .addCase(getDebt.fulfilled, (state, action: PayloadAction<Debt[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateDebt.fulfilled, (state, action: PayloadAction<Debt>) => {
        state.isLoading = false;
        state.data = state.data.map((credit) => {
          if (credit.id === action.payload.id) return action.payload;
          return credit;
        });
      })
      .addCase(deleteDebt.fulfilled, (state, action: PayloadAction<Pick<Debt, 'id'>>) => {
        state.isLoading = false;
        state.data = state.data.filter((credit) => credit.id !== action.payload.id);
      })
      .addCase(createDebt.fulfilled, (state, action: PayloadAction<Debt>) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^debt\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^debt\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: debtActions, reducer: debtReducer } = debtSlice;
