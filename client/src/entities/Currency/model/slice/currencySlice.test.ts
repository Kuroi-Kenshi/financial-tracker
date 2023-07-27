import { currencyReducer } from './currencySlice';
import { getCurrency } from '../services/getCurrency/getCurrency';
import { type CurrencySchema } from '../types/currency';

describe('currencySlice', () => {
  const initialState: CurrencySchema = {
    data: [],
    isLoading: false,
    error: undefined,
  };

  test('getCurrency.fulfilled', () => {
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
    const action = getCurrency.fulfilled(data, '');

    const newState = currencyReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual(data);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = getCurrency.pending('');
    const newState = currencyReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'currency/get/rejected', payload: 'Test error' };
    const newState = currencyReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
