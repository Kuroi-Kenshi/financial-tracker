import axios, { AxiosError } from 'axios';
import { updateIncome } from './updateIncome';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('updateIncome thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

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

  test('updateIncome fulfilled', async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = updateIncome({
      categoryId: 10,
      currencyId: 1,
      amount: 500000,
      date: '2023-07-22T18:56:44.145Z',
      description: '',
      id: 5,
      name: 'Доход от продаж криптовалюты',
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('updateIncome rejected', async () => {
    const errorMessage = 'Не существует такой записи';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.patch.mockRejectedValue(error);

    const action = updateIncome({
      categoryId: 10,
      currencyId: 1,
      amount: 500000,
      date: '2023-07-22T18:56:44.145Z',
      description: '',
      id: 5,
      name: 'Доход от продаж криптовалюты',
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
