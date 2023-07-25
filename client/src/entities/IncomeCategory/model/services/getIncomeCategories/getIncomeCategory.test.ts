import axios from 'axios';
import { getIncomeCategory } from './getIncomeCategory';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getIncomeCategory thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getIncomeCategory fulfilled', async () => {
    const data = [
      {
        id: 10,
        name: 'test',
        color: '#fff',
        userId: 1,
      },
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
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getIncomeCategory();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
