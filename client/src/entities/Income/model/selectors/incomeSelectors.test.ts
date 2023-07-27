import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getIncomes } from './getIncomes';
import { getIncomeError } from './getIncomeError';
import { getIncomeModalInfo } from './getIncomeModalInfo';

describe('getIncomeList selector', () => {
  test('should return income list', () => {
    const incomeListTest = [
      {
        id: 1,
        name: 'Зарплата',
        description: '',
        amount: 100000,
        date: '2023-07-25T05:41:14.558Z',
        categoryIncome: {
          id: 1,
          name: 'Зарплата',
          color: '#4CAF50',
        },
        currency: {
          id: 4,
          code: 'JPY',
          name: 'Japanese Yen',
          symbol: '¥',
        },
      },
      {
        id: 2,
        name: 'Подарок',
        description: '',
        amount: 10000,
        date: '2023-07-25T05:41:14.558Z',
        categoryIncome: {
          id: 2,
          name: 'Подарки',
          color: '#9C27B0',
        },
        currency: {
          id: 4,
          code: 'JPY',
          name: 'Japanese Yen',
          symbol: '¥',
        },
      },
    ];
    const state: DeepPartial<StateSchema> = {
      incomes: {
        data: incomeListTest,
      },
    };

    expect(getIncomes(state as StateSchema)).toEqual(incomeListTest);
  });

  test('should return income error', () => {
    const state: DeepPartial<StateSchema> = {
      incomes: {
        data: [],
        isLoading: false,
        error: 'Test error incomes',
      },
    };

    expect(getIncomeError(state as StateSchema)).toBe('Test error incomes');
  });

  test('should return income modalInfo', () => {
    const income = {
      id: 1,
      name: 'Зарплата',
      description: '',
      amount: 100000,
      date: '2023-07-25T05:41:14.558Z',
      categoryIncome: {
        id: 1,
        name: 'Зарплата',
        color: '#4CAF50',
      },
      currency: {
        id: 4,
        code: 'JPY',
        name: 'Japanese Yen',
        symbol: '¥',
      },
    };

    const modalInfo = {
      modalData: income,
      modalIsOpened: false,
    };
    const state: DeepPartial<StateSchema> = {
      incomes: {
        data: [],
        isLoading: false,
        modalInfo,
      },
    };

    expect(getIncomeModalInfo(state as StateSchema)).toEqual(modalInfo);
  });
});
