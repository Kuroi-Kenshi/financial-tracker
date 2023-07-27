import axios from 'axios';
import { getDebt } from './getDebt';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getDebt thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getDebt fulfilled', async () => {
    const data = [
      {
        id: 3,
        name: 'test',
        description: 'tset',
        amount: 3333,
        createdAt: '2023-07-17T19:04:18.363Z',
        updatedAt: '2023-07-22T18:10:53.611Z',
        startDate: '2023-07-17T18:58:28.212Z',
        dueDate: '2023-07-17T18:58:28.212Z',
        status: 'ACTIVE',
        totalPayments: 0,
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
        debtor: {
          id: 2,
          name: 'Джон Смит',
          description: 'В долг на 1 месяц',
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
    const action = getDebt();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
