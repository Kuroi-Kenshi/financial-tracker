import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';
import { getDebtModalInfo } from './getDebtModalInfo';

describe('getDebtModalInfo selector', () => {
  test('should return debt modalInfo', () => {
    const debt = {
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
    };

    const modalInfo = {
      modalData: debt,
      modalIsOpened: true,
    };

    const state: DeepPartial<StateSchema> = {
      debts: {
        data: [],
        modalInfo,
      },
    };

    expect(getDebtModalInfo(state as StateSchema)).toEqual(modalInfo);
  });
});
