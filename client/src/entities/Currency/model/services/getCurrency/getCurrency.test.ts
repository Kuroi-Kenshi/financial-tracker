import axios from 'axios';
import { getCurrency } from './getCurrency';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getCurrency thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getCurrency fulfilled', async () => {
    const data = [
      {
        id: 2,
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
      },
      {
        id: 5,
        code: 'GBP',
        name: 'British Pound',
        symbol: '£',
      },
      {
        id: 3,
        code: 'JPY',
        name: 'Japanese Yen',
        symbol: '¥',
      },
      {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
      {
        id: 1,
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
    ];
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getCurrency();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
