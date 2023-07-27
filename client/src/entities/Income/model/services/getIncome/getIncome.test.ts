import axios, { AxiosError } from 'axios';
import { getIncome } from './getIncome';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getIncome thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  const data = [
    {
      id: 1,
      name: 'Зарплата',
      description: '',
      amount: 10000,
      date: '2023-07-12T19:00:09.728Z',
      categoryId: 1,
      currencyId: 4,
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
    {
      id: 2,
      name: 'Подарок',
      description: '',
      amount: 10000,
      date: '2023-06-12T19:00:09.728Z',
      categoryId: 2,
      currencyId: 4,
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
    },
  ];

  test('getIncome fulfilled', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getIncome();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('getIncome fulfilled with query', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const queryObj = { take: '10', limit: '20' };
    const action = getIncome(queryObj);
    const result = await action(dispatch, getState, { api: axios });
    const expectedQuery = new URLSearchParams(queryObj).toString();

    expect(mockedAxios.get).toHaveBeenCalledWith(`income?${expectedQuery}`);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('getIncome rejected', async () => {
    const errorMessage = 'Error';
    const error = new AxiosError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValue(error);

    const action = getIncome();
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
