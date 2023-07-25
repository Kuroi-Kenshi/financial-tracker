import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Expense, ExpenseSchema } from '../types/expenseSchema';
import { getExpense } from '../services/getExpense/getExpense';
import { updateExpense } from '../services/updateExpense/updateExpense';
import { createExpense } from '../services/createExpense/createExpense';
import { deleteExpense } from '../services/deleteExpense/deleteExpense';

const initialState: ExpenseSchema = {
  data: {
    last: [],
    filtered: [],
  },
  isLoading: false,
  error: undefined,
  modalInfo: {
    modalData: null,
    modalIsOpened: false,
  },
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setFilteredExpense(state, action) {
      state.data.filtered = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    setLastExpense(state, action) {
      state.data.last = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    setExpenseError(state, action) {
      state.error = action.payload;
    },
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
      .addCase(updateExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
        state.isLoading = false;
        state.data.filtered = state.data.filtered.map((expense) => {
          if (expense.id === action.payload.id) return { ...expense, ...action.payload };
          return expense;
        });
        state.data.last = state.data.last.map((expense) => {
          if (expense.id === action.payload.id) return { ...expense, ...action.payload };
          return expense;
        });
      })
      .addCase(deleteExpense.fulfilled, (state, action: PayloadAction<Pick<Expense, 'id'>>) => {
        state.isLoading = false;
        state.error = undefined;
        state.data.filtered = state.data.filtered.filter(
          (expense) => expense.id !== action.payload.id
        );
        state.data.last = state.data.last.filter((expense) => expense.id !== action.payload.id);
      })
      .addCase(createExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
        state.isLoading = false;
        state.data.filtered.unshift(action.payload);
      })
      .addMatcher(
        (action) => {
          const regex = /^expense\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^expense\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: expenseActions, reducer: expenseReducer } = expenseSlice;
