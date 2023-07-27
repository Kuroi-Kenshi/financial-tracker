import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';
import { getCreditModalInfo } from './getCreditModalInfo';

describe('getCredits selector', () => {
  test('should return modalInfo', () => {
    const credit = {
      id: 1,
      name: 'Долг по кредитной карте',
      description: 'Долг по кредитной карте',
      amount: 5000,
      startDate: '2023-07-25T05:41:14.553Z',
      dueDate: '2023-07-25T05:41:14.553Z',
      status: CreditAndDebtStatus.ACTIVE,
      totalPayments: 0,
      currency: {
        id: 4,
        code: 'JPY',
        name: 'Japanese Yen',
        symbol: '¥',
      },
      creditor: {
        id: 1,
        name: 'Альфа-банк',
        description: 'Кредит',
      },
    };

    const modalInfo = {
      modalData: credit,
      modalIsOpened: true,
    };

    const state: DeepPartial<StateSchema> = {
      credits: {
        data: [],
        modalInfo,
      },
    };

    expect(getCreditModalInfo(state as StateSchema)).toEqual(modalInfo);
  });
});
