import axios, { AxiosError } from 'axios';
import { createFinancialGoal } from './createFinancialGoal';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('createFinancialGoal thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('createFinancialGoal fulfilled', async () => {
    const data = {
      id: 5,
      name: 'test',
      description: '',
      amount: 1,
      totalAmount: 0,
      deadline: '2023-07-22T18:55:35.977Z',
      currencyId: 4,
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    };

    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = createFinancialGoal({
      deadline: '2023-07-22T18:55:35.977Z',
      currencyId: 4,
      name: 'test',
      description: '',
      amount: 1,
      totalAmount: 0,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('createFinancialGoal server rejected', async () => {
    const errorMessage = 'цель с таким именем уже существует';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(error);

    const action = createFinancialGoal({
      deadline: '2023-07-22T18:55:35.977Z',
      currencyId: 4,
      name: 'test',
      description: '',
      amount: 1,
      totalAmount: 0,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
