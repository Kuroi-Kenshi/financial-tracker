import { incomeActions, incomeReducer } from './incomeSlice';
import { Income, IncomeSchema } from '../types/incomeSchema';
import { UpdateIncome, updateIncome } from '../services/updateIncome/updateIncome';
import { deleteIncome } from '../services/deleteIncome/deleteIncome';
import { CreateIncome, createIncome } from '../services/createIncome/createIncome';
import { configureStore } from '@reduxjs/toolkit';
import { getIncome } from '../services/getIncome/getIncome';

describe('incomeSlice', () => {
  const store = configureStore({
    reducer: {
      income: incomeReducer,
    },
  });
  const initialState: IncomeSchema = {
    data: [],
    isLoading: false,
    error: undefined,
    modalInfo: {
      modalData: null,
      modalIsOpened: false,
    },
  };

  const income1 = {
    id: 1,
    name: 'Зарплата',
    description: '',
    amount: 10000,
    date: '2023-07-12T19:00:09.728Z',
    categoryIncome: {
      id: 1,
      name: 'Зарплата',
      color: '#4CAF50',
    },
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
  };
  const income2 = {
    id: 2,
    name: 'Подарок',
    description: '',
    amount: 10000,
    date: '2023-06-12T19:00:09.728Z',
    categoryIncome: {
      id: 2,
      name: 'Подарки',
      color: '#9C27B0',
    },
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
  };

  test('getIncome.fulfilled', () => {
    const incomeList: Income[] = [
      {
        id: 1,
        name: 'Зарплата',
        description: '',
        amount: 10000,
        date: '2023-07-12T19:00:09.728Z',
        categoryIncome: {
          id: 1,
          name: 'Зарплата',
          color: '#4CAF50',
        },
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
      },
    ];

    const action = getIncome.fulfilled(incomeList, '');
    const newState = incomeReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual(incomeList);
    expect(newState.error).toBeUndefined();
  });

  test('updateIncome.fulfilled', () => {
    const initialState: IncomeSchema = {
      data: [income1, income2],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { currency, categoryIncome, ...rest } = income2;
    const updatedIncome: UpdateIncome = {
      ...rest,
      description: 'Updated income 2',
      currencyId: 4,
      categoryId: 1,
    };
    const returnedIncome: Income = {
      id: 2,
      name: 'Подарок',
      description: 'Updated income 2',
      amount: 10000,
      date: '2023-06-12T19:00:09.728Z',
      categoryIncome: {
        id: 2,
        name: 'Подарки',
        color: '#9C27B0',
      },
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    };
    const action = updateIncome.fulfilled(returnedIncome, '', updatedIncome);
    const newState = incomeReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([income1, returnedIncome]);
    expect(newState.error).toBeUndefined();
  });

  test('deleteIncome.fulfilled', () => {
    const initialState: IncomeSchema = {
      data: [income1, income2],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const action = deleteIncome.fulfilled({ id: 1 }, '', 1);

    const newState = incomeReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([income2]);
    expect(newState.error).toBeUndefined();
  });

  test('createIncome.fulfilled', () => {
    const initialState: IncomeSchema = {
      data: [income1],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { categoryIncome, currency, id, ...rest } = income2;
    const newIncome: CreateIncome = {
      ...rest,
      currencyId: 4,
      categoryId: 1,
    };

    const action = createIncome.fulfilled(income2, '', newIncome);
    const newState = incomeReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([income2, income1]);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'income/get/pending' };

    const newState = incomeReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'income/get/rejected', payload: 'Test error' };

    const newState = incomeReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
