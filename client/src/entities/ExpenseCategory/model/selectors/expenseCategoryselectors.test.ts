import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';
import { getExpenseCategoryList } from './getExpenseCategoryList';
import { getExpenseCategoryError } from './getExpenseCategoryError';
import { getExpenseCategoryWithLimits } from './getExpenseCategoryWithLImits';

describe('expenseCategory selectors tests', () => {
  test('should return expenseCategory list', () => {
    const expenseCategoryList = [
      {
        id: 1,
        name: 'Еда',
        limitPerMonth: 20000,
        color: '#FF5733',
        totalExpense: 350,
      },
      {
        id: 2,
        name: 'Транспорт',
        limitPerMonth: 2000,
        color: '#FFC300',
        totalExpense: 1100,
      },
    ];
    const state: DeepPartial<StateSchema> = {
      expenseCategories: {
        data: expenseCategoryList,
      },
    };

    expect(getExpenseCategoryList(state as StateSchema)).toEqual(expenseCategoryList);
  });

  test('should return expenseCategory list with limits', () => {
    const expenseCategoryList = [
      {
        id: 1,
        name: 'Еда',
        limitPerMonth: null,
        color: '#FF5733',
        totalExpense: 350,
      },
      {
        id: 2,
        name: 'Транспорт',
        limitPerMonth: 2000,
        color: '#FFC300',
        totalExpense: 1100,
      },
    ];
    const state: DeepPartial<StateSchema> = {
      expenseCategories: {
        data: expenseCategoryList,
      },
    };

    expect(getExpenseCategoryWithLimits(state as StateSchema)).toEqual([
      {
        id: 2,
        name: 'Транспорт',
        limitPerMonth: 2000,
        color: '#FFC300',
        totalExpense: 1100,
      },
    ]);
  });

  test('should return expenseCategory list', () => {
    const state: DeepPartial<StateSchema> = {
      expenseCategories: {
        data: [],
        error: 'Test error',
      },
    };

    expect(getExpenseCategoryError(state as StateSchema)).toEqual('Test error');
  });
});
