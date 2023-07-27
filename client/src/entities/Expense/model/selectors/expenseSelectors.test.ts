import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getFilteredExpenses } from './getFilteredExpenses';
import { getExpenseError } from './getExpenseError';
import { getExpenseIsLoading } from './getExpenseIsLoading';
import { getExpenseModalInfo } from './getExpenseModalInfo';
import { getLastExpenses } from './getLastExpenses';

describe('getExpenseList selector', () => {
  test('should return expense list', () => {
    const expenseListTest = [
      {
        id: 12,
        name: 'test',
        description: '',
        amount: 1,
        date: '2023-07-22T18:38:45.608Z',
        categoryExpense: {
          id: 1,
          name: 'Test',
          color: '#FFC300',
        },
        receipt: [],
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
      },
      {
        id: 2,
        name: 'Бензин',
        description: '',
        amount: 1000,
        date: '2023-07-12T19:00:09.731Z',
        categoryExpense: {
          id: 2,
          name: 'Транспорт',
          color: '#FFC300',
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
      },
    ];
    const state: DeepPartial<StateSchema> = {
      expenses: {
        data: {
          filtered: expenseListTest,
          last: expenseListTest.slice(1),
        },
      },
    };

    expect(getFilteredExpenses(state as StateSchema)).toEqual(expenseListTest);
    expect(getLastExpenses(state as StateSchema)).toEqual(expenseListTest.slice(1));
  });

  test('should return expense error', () => {
    const state: DeepPartial<StateSchema> = {
      expenses: {
        data: {
          filtered: [],
          last: [],
        },
        isLoading: false,
        error: 'Test error',
      },
    };

    expect(getExpenseError(state as StateSchema)).toBe('Test error');
  });

  test('should return expense loading true', () => {
    const state: DeepPartial<StateSchema> = {
      expenses: {
        data: {
          filtered: [],
          last: [],
        },
        isLoading: true,
        error: 'Test error',
      },
    };

    expect(getExpenseIsLoading(state as StateSchema)).toBeTruthy();
  });

  test('should return expense loading false', () => {
    const state: DeepPartial<StateSchema> = {
      expenses: {
        data: {
          filtered: [],
          last: [],
        },
        isLoading: false,
        error: 'Test error',
      },
    };

    expect(getExpenseIsLoading(state as StateSchema)).toBeFalsy();
  });

  test('should return expense modalInfo', () => {
    const state: DeepPartial<StateSchema> = {
      expenses: {
        data: {
          filtered: [],
          last: [],
        },
        isLoading: false,
        error: 'Test error',
        modalInfo: {
          modalData: null,
          modalIsOpened: false,
        },
      },
    };

    expect(getExpenseModalInfo(state as StateSchema)).toEqual({
      modalData: null,
      modalIsOpened: false,
    });
  });
});
