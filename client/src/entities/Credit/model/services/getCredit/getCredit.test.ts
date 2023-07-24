import axios from 'axios';
import { getCredit } from './getCredit';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getCredit thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getCredit fulfilled', async () => {
    const data = [
      {
        id: 1,
        name: 'Долг по кредитной карте',
        description: 'Долг по кредитной карте',
        amount: 5000,
        createdAt: '2023-07-12T19:00:10.140Z',
        updatedAt: '2023-07-12T19:00:10.140Z',
        startDate: '2023-07-12T19:00:09.720Z',
        dueDate: '2023-07-12T19:00:09.720Z',
        status: 'ACTIVE',
        totalPayments: 0,
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
        creditor: {
          id: 1,
          name: 'Альфа-банк',
          description: 'Кредит',
          createdAt: '2023-07-12T19:00:10.126Z',
          updatedAt: '2023-07-12T19:00:10.126Z',
          userId: 1,
        },
      },
    ];
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getCredit();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
