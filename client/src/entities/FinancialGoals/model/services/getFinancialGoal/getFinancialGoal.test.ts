import axios from 'axios';
import { getFinancialGoal } from './getFinancialGoal';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getFinancialGoal thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getFinancialGoal fulfilled', async () => {
    const data = [
      {
        id: 1,
        name: 'Покупка машины',
        description: 'Коплю денег на покупку Audi RS7',
        deadline: '2023-07-12T19:00:09.714Z',
        amount: 12000000,
        totalAmount: 6000000,
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
      },
      {
        id: 5,
        name: 'test',
        description: '',
        deadline: '2023-07-22T18:55:35.977Z',
        amount: 1,
        totalAmount: 0,
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
    const action = getFinancialGoal();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
