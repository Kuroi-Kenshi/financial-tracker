import { incomeCategoriesReducer } from './incomeCategorySlice';
import { type IncomeCategory, type IncomeCategorySchema } from '../types/incomeCategoriesSchema';
import { updateIncomeCategory } from '../services/updateIncomeCategory/updateIncomeCategory';
import { deleteIncomeCategory } from '../services/deleteIncomeCategory/deleteIncomeCategory';
import { createIncomeCategory } from '../services/createIncomeCategory/createIncomeCategory';
import { getIncomeCategory } from '../services/getIncomeCategories/getIncomeCategory';

describe('incomeCategorySlice', () => {
  const initialState: IncomeCategorySchema = {
    data: [],
    isLoading: false,
    error: undefined,
  };

  const incomeCategory1 = {
    id: 1,
    name: 'Зарплата',
    color: '#4CAF50',
  };
  const incomeCategory2 = {
    id: 2,
    name: 'Подарки',
    color: '#9C27B0',
  };

  test('getIncomeCategory.fulfilled', () => {
    const incomeCategoryList: IncomeCategory[] = [
      {
        id: 10,
        name: 'test',
        color: '#fff',
      },
      {
        id: 1,
        name: 'Зарплата',
        color: '#4CAF50',
      },
      {
        id: 2,
        name: 'Подарки',
        color: '#9C27B0',
      },
    ];

    const action = getIncomeCategory.fulfilled(incomeCategoryList, '');
    const newState = incomeCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual(incomeCategoryList);
    expect(newState.error).toBeUndefined();
  });

  test('updateIncomeCategory.fulfilled', () => {
    const initialState: IncomeCategorySchema = {
      data: [incomeCategory1, incomeCategory2],
      isLoading: false,
      error: undefined,
    };

    const updatedIncomeCategory: IncomeCategory = {
      id: 2,
      name: 'Подарки',
      color: '#CECECE',
    };

    const action = updateIncomeCategory.fulfilled(updatedIncomeCategory, '', updatedIncomeCategory);
    const newState = incomeCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([incomeCategory1, updatedIncomeCategory]);
    expect(newState.error).toBeUndefined();
  });

  test('deleteIncomeCategory.fulfilled', () => {
    const initialState: IncomeCategorySchema = {
      data: [incomeCategory1, incomeCategory2],
      isLoading: false,
      error: undefined,
    };
    const action = deleteIncomeCategory.fulfilled({ id: 1 }, '', 1);

    const newState = incomeCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([incomeCategory2]);
    expect(newState.error).toBeUndefined();
  });

  test('createIncomeCategory.fulfilled', () => {
    const initialState: IncomeCategorySchema = {
      data: [incomeCategory1],
      isLoading: false,
      error: undefined,
    };

    const newIncomeCategory: Omit<IncomeCategory, 'id'> = {
      name: 'Инвестиции',
      color: '#CBCBCB',
    };

    const returnedIncomeCategory = {
      id: 20,
      name: 'Инвестиции',
      color: '#CBCBCB',
    };

    const action = createIncomeCategory.fulfilled(returnedIncomeCategory, '', newIncomeCategory);
    const newState = incomeCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([incomeCategory1, returnedIncomeCategory]);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'incomeCategory/get/pending' };

    const newState = incomeCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'incomeCategory/get/rejected', payload: 'Test error' };

    const newState = incomeCategoriesReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
