import axios from 'axios';
import { getExpense } from './getExpense';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getExpense thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getExpense fulfilled', async () => {
    const data = [
      {
        id: 12,
        name: 'test',
        description: '',
        amount: 1,
        date: '2023-07-22T18:38:45.608Z',
        categoryExpense: null,
        receipt: [],
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
      },
      {
        id: 2,
        name: 'Бензин',
        description: '',
        amount: 1000,
        date: '2023-07-12T19:00:09.731Z',
        categoryExpense: {
          id: 2,
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
      },
    ];
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getExpense();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
