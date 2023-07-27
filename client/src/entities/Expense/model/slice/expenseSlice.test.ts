import { expenseActions, expenseReducer } from './expenseSlice';
import { type Expense, type ExpenseSchema } from '../types/expenseSchema';
import { type UpdateExpense, updateExpense } from '../services/updateExpense/updateExpense';
import { deleteExpense } from '../services/deleteExpense/deleteExpense';
import { type CreateExpense, createExpense } from '../services/createExpense/createExpense';
import { configureStore } from '@reduxjs/toolkit';

describe('expenseSlice', () => {
  const store = configureStore({
    reducer: {
      expense: expenseReducer,
    },
  });
  const initialState: ExpenseSchema = {
    data: {
      filtered: [],
      last: [],
    },
    isLoading: false,
    error: undefined,
    modalInfo: {
      modalData: null,
      modalIsOpened: false,
    },
  };

  const expense1 = {
    id: 1,
    name: 'test',
    description: '',
    amount: 1,
    date: '2023-07-22T18:38:45.608Z',
    categoryExpense: {
      id: 3,
      name: 'test',
      color: '#FFC300',
      limitPerMonth: 1000,
      totalExpense: 0,
    },
    receipt: [],
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
  };
  const expense2 = {
    id: 2,
    name: 'Бензин',
    description: '',
    amount: 1000,
    date: '2023-07-12T19:00:09.731Z',
    categoryExpense: {
      id: 2,
      name: 'Транспорт',
      color: '#FFC300',
      limitPerMonth: 5000,
      totalExpense: 1000,
    },
    receipt: [
      {
        fileName: 'receipt2.jpg',
        filePath: '/static/uploads/receipts/receipt2.jpg',
      },
    ],
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
  };

  test('getExpense.fulfilled', () => {
    const expenseList: Expense[] = [
      {
        id: 1,
        name: 'test',
        description: '',
        amount: 1,
        date: '2023-07-22T18:38:45.608Z',
        categoryExpense: {
          id: 3,
          name: 'test',
          color: '#FFC300',
          limitPerMonth: 1000,
          totalExpense: 0,
        },
        receipt: [],
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
      },
    ];

    store.dispatch(expenseActions.setFilteredExpense(expenseList));

    expect(store.getState().expense.isLoading).toBe(false);
    expect(store.getState().expense.data).toEqual({ filtered: expenseList, last: [] });
    expect(store.getState().expense.error).toBeUndefined();
  });

  test('updateExpense.fulfilled', () => {
    const initialState: ExpenseSchema = {
      data: {
        filtered: [expense1, expense2],
        last: [],
      },
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { currency, categoryExpense, receipt, ...rest } = expense2;
    const updatedExpense: UpdateExpense = {
      ...rest,
      description: 'Updated expense 2',
      currencyId: 4,
      categoryId: 1,
    };
    const returnedExpense: Expense = {
      id: 2,
      name: 'Бензин',
      description: 'Updated expense 2',
      amount: 1000,
      date: '2023-07-12T19:00:09.731Z',
      categoryExpense: {
        id: 2,
        name: 'Транспорт',
        color: '#FFC300',
        limitPerMonth: 5000,
        totalExpense: 1000,
      },
      receipt: [
        {
          fileName: 'receipt2.jpg',
          filePath: '/static/uploads/receipts/receipt2.jpg',
        },
      ],
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    };
    const action = updateExpense.fulfilled(returnedExpense, '', updatedExpense);
    const newState = expenseReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual({ filtered: [expense1, returnedExpense], last: [] });
    expect(newState.error).toBeUndefined();
  });

  test('deleteExpense.fulfilled', () => {
    const initialState: ExpenseSchema = {
      data: {
        filtered: [expense1, expense2],
        last: [],
      },
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const action = deleteExpense.fulfilled({ id: 1 }, '', 1);

    const newState = expenseReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual({ filtered: [expense2], last: [] });
    expect(newState.error).toBeUndefined();
  });

  test('createExpense.fulfilled', () => {
    const initialState: ExpenseSchema = {
      data: {
        filtered: [expense1],
        last: [],
      },
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { categoryExpense, currency, id, receipt, ...rest } = expense2;
    const newExpense: CreateExpense = {
      ...rest,
      currencyId: 4,
      categoryId: 1,
    };

    const action = createExpense.fulfilled(expense2, '', newExpense);
    const newState = expenseReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual({ filtered: [expense2, expense1], last: [] });
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'expense/get/pending' };

    const newState = expenseReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'expense/get/rejected', payload: 'Test error' };

    const newState = expenseReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
