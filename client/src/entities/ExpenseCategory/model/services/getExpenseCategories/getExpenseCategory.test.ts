import axios from 'axios';
import { getExpenseCategory } from './getExpenseCategory';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getExpenseCategory thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getExpenseCategory fulfilled', async () => {
    const data = [
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
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getExpenseCategory();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
