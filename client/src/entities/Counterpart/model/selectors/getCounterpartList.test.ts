import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getCounterpartList } from './getCounterpartList';

describe('getCounterpartList selector', () => {
  test('should return counterpart list', () => {
    const counterpartListTest = [
      {
        id: 1,
        name: 'Банк',
        description: 'Counterpart test',
      },
    ];
    const state: DeepPartial<StateSchema> = {
      counterpart: {
        data: counterpartListTest,
      },
    };

    expect(getCounterpartList(state as StateSchema)).toEqual(counterpartListTest);
  });
});
