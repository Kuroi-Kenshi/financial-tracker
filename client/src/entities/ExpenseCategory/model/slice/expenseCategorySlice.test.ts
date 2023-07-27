import { expenseCategoriesReducer } from './expenseCategorySlice';
import { ExpenseCategory, ExpenseCategorySchema } from '../types/expenseCategoriesSchema';
import { updateExpenseCategory } from '../services/updateExpenseCategory/updateExpenseCategory';
import { deleteExpenseCategory } from '../services/deleteExpenseCategory/deleteExpenseCategory';
import { createExpenseCategory } from '../services/createExpenseCategory/createExpenseCategory';
import { getExpenseCategory } from '../services/getExpenseCategories/getExpenseCategory';

describe('expenseCategorySlice', () => {
  const initialState: ExpenseCategorySchema = {
    data: [],
    isLoading: false,
    error: undefined,
  };

  const expenseCategory1 = {
    id: 1,
    name: 'Еда',
    limitPerMonth: 20000,
    color: '#FF5733',
    totalExpense: 360,
  };
  const expenseCategory2 = {
    id: 2,
    name: 'Транспорт',
    limitPerMonth: 2000,
    color: '#FFC300',
    totalExpense: 666,
  };

  test('getExpenseCategory.fulfilled', () => {
    const expenseCategoryList: ExpenseCategory[] = [
      {
        id: 1,
        name: 'Еда',
        limitPerMonth: 20000,
        color: '#FF5733',
        totalExpense: 360,
      },
      {
        id: 2,
        name: 'Транспорт',
        limitPerMonth: 2000,
        color: '#FFC300',
        totalExpense: 666,
      },
    ];

    const action = getExpenseCategory.fulfilled(expenseCategoryList, '');
    const newState = expenseCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual(expenseCategoryList);
    expect(newState.error).toBeUndefined();
  });

  test('updateExpenseCategory.fulfilled', () => {
    const initialState: ExpenseCategorySchema = {
      data: [expenseCategory1, expenseCategory2],
      isLoading: false,
      error: undefined,
    };

    const updatedExpenseCategory: Omit<ExpenseCategory, 'totalExpense'> = {
      id: 2,
      name: 'Подарки',
      limitPerMonth: null,
      color: '#CECECE',
    };

    const returnedExpenseCategory: ExpenseCategory = {
      id: 2,
      name: 'Подарки',
      limitPerMonth: null,
      color: '#CECECE',
      totalExpense: 1000,
    };

    const action = updateExpenseCategory.fulfilled(
      returnedExpenseCategory,
      '',
      updatedExpenseCategory
    );
    const newState = expenseCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([expenseCategory1, returnedExpenseCategory]);
    expect(newState.error).toBeUndefined();
  });

  test('deleteExpenseCategory.fulfilled', () => {
    const initialState: ExpenseCategorySchema = {
      data: [expenseCategory1, expenseCategory2],
      isLoading: false,
      error: undefined,
    };
    const action = deleteExpenseCategory.fulfilled({ id: 1 }, '', 1);

    const newState = expenseCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([expenseCategory2]);
    expect(newState.error).toBeUndefined();
  });

  test('createExpenseCategory.fulfilled', () => {
    const initialState: ExpenseCategorySchema = {
      data: [expenseCategory1],
      isLoading: false,
      error: undefined,
    };

    const newExpenseCategory: Omit<ExpenseCategory, 'id'> = {
      name: 'Инвестиции',
      limitPerMonth: 1000,
      color: '#CBCBCB',
      totalExpense: 1000,
    };

    const returnedExpenseCategory = {
      id: 20,
      name: 'Инвестиции',
      limitPerMonth: 1000,
      color: '#CBCBCB',
      totalExpense: 1000,
    };

    const action = createExpenseCategory.fulfilled(returnedExpenseCategory, '', newExpenseCategory);
    const newState = expenseCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([returnedExpenseCategory, expenseCategory1]);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'expenseCategory/get/pending' };

    const newState = expenseCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'expenseCategory/get/rejected', payload: 'Test error' };

    const newState = expenseCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
