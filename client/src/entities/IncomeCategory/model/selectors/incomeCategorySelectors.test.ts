import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getIncomeCategoryList } from './getIncomeCategoryList';
import { getIncomeCategoryError } from './getIncomeCategoryError';

describe('incomeCategory selectors tests', () => {
  test('should return incomeCategory list', () => {
    const incomeCategoryList = [
      {
        id: 1,
        name: 'Зарплата',
        color: '#4CAF50',
        userId: 1,
      },
      {
        id: 2,
        name: 'Подарки',
        color: '#9C27B0',
        userId: 1,
      },
    ];
    const state: DeepPartial<StateSchema> = {
      incomeCategories: {
        data: incomeCategoryList,
      },
    };

    expect(getIncomeCategoryList(state as StateSchema)).toEqual(incomeCategoryList);
  });

  test('should return incomeCategory list', () => {
    const state: DeepPartial<StateSchema> = {
      incomeCategories: {
        data: [],
        error: 'Test error income',
      },
    };

    expect(getIncomeCategoryError(state as StateSchema)).toEqual('Test error income');
  });
});
