import axios, { AxiosError } from 'axios';
import { createExpense } from './createExpense';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('createExpense thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('createExpense fulfilled', async () => {
    const data = {
      id: 2,
      name: 'Бензин',
      description: '',
      amount: 1000,
      date: '2023-07-12T19:00:09.731Z',
      categoryExpense: {
        id: 1,
        name: 'Транспорт',
        color: '#FFC300',
      },
      receipt: [
        {
          fileName: 'receipt2.jpg',
          filePath: '/static/uploads/receipts/receipt2.jpg',
        },
      ],
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
    const action = createExpense({
      name: 'test',
      description: '',
      amount: 1,
      date: '2023-07-22T18:38:45.608Z',
      currencyId: 4,
      categoryId: 1,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('createExpense server rejected', async () => {
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

    const action = createExpense({
      name: 'test',
      description: '',
      amount: 1,
      date: '2023-07-22T18:38:45.608Z',
      currencyId: 4,
      categoryId: 1,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
