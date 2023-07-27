import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Credit, type CreditSchema } from '../types/creditSchema';
import { getCredit } from '../services/getCredit/getCredit';
import { updateCredit } from '../services/updateCredit/updateCredit';
import { deleteCredit } from '../services/deleteCredit/deleteCredit';
import { createCredit } from '../services/createCredit/createCredit';

const initialState: CreditSchema = {
  data: [],
  isLoading: false,
  error: undefined,
  modalInfo: {
    modalData: null,
    modalIsOpened: false,
  },
};

export const creditSlice = createSlice({
  name: 'credit',
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
      .addCase(getCredit.fulfilled, (state, action: PayloadAction<Credit[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateCredit.fulfilled, (state, action: PayloadAction<Credit>) => {
        state.isLoading = false;
        state.data = state.data.map((credit) => {
          if (credit.id === action.payload.id) return action.payload;
          return credit;
        });
      })
      .addCase(deleteCredit.fulfilled, (state, action: PayloadAction<Pick<Credit, 'id'>>) => {
        state.isLoading = false;
        state.data = state.data.filter((credit) => credit.id !== action.payload.id);
      })
      .addCase(createCredit.fulfilled, (state, action: PayloadAction<Credit>) => {
        state.isLoading = false;
        state.data.unshift(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^credit\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^credit\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: creditActions, reducer: creditReducer } = creditSlice;
