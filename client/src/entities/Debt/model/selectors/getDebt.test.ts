import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getDebts } from './getDebts';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

describe('getCounterpartList selector', () => {
  test('should return counterpart list', () => {
    const debtList = [
      {
        id: 1,
        name: 'Одолжил денег на машину',
        description: 'Одолжил денег на машину',
        amount: 10000,
        startDate: '2023-07-25T05:41:14.556Z',
        dueDate: '2023-07-25T05:41:14.556Z',
        status: CreditAndDebtStatus.ACTIVE,
        totalPayments: 0,
        currency: {
          id: 4,
          code: 'JPY',
          name: 'Japanese Yen',
          symbol: '¥',
        },
        debtor: {
          id: 2,
          name: 'Джон Смит',
          description: 'В долг на 1 месяц',
        },
      },
    ];
    const state: DeepPartial<StateSchema> = {
      debts: {
        data: debtList,
      },
    };

    expect(getDebts(state as StateSchema)).toEqual(debtList);
  });
});
