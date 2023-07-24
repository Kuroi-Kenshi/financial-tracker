import axios, { AxiosError } from 'axios';
import { createIncome } from './createIncome';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('createIncome thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('createIncome fulfilled', async () => {
    const data = {
      categoryIncome: {
        id: 10,
        name: 'test',
        color: '#fff',
        userId: 1,
      },
      currency: {
        id: 1,
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      amount: 500000,
      date: '2023-07-22T18:56:44.145Z',
      description: '',
      id: 5,
      name: 'Доход от продаж криптовалюты',
    };
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = createIncome({
      name: 'Доход от продаж криптовалюты',
      description: '',
      amount: 500000,
      date: '2023-07-22T18:56:44.145Z',
      currencyId: 1,
      categoryId: 10,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('createIncome server rejected', async () => {
    const errorMessage = 'Расход с таким именем уже существует';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(error);

    const action = createIncome({
      name: 'Доход от продаж криптовалюты',
      description: '',
      amount: 500000,
      date: '2023-07-22T18:56:44.145Z',
      currencyId: 1,
      categoryId: 10,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
