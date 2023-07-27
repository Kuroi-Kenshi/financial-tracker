import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';
import { getCurrencyList } from './getCurrencyList';

describe('getCurrencyList selector', () => {
  test('should return currency list', () => {
    const currencyList = [
      {
        id: 3,
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
        id: 4,
        code: 'JPY',
        name: 'Japanese Yen',
        symbol: '¥',
      },
      {
        id: 1,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
      {
        id: 2,
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
    ];
    const state: DeepPartial<StateSchema> = {
      currencies: {
        data: currencyList,
      },
    };

    expect(getCurrencyList(state as StateSchema)).toEqual(currencyList);
  });
});
