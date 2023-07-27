import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getFinancialGoalList } from './getFinancialGoalList';
import { getFinancialGoalModalInfo } from './getFinancialGoalModalInfo';

describe('getFinancialGoalList selector', () => {
  test('should return financialGoal list', () => {
    const financialGoalListTest = [
      {
        id: 1,
        name: 'Покупка машины',
        description: 'Коплю денег на покупку Audi RS7',
        deadline: '2023-07-25T05:41:14.549Z',
        amount: 12000000,
        totalAmount: 5660000,
        currency: {
          id: 4,
          code: 'JPY',
          name: 'Japanese Yen',
          symbol: '¥',
        },
      },
    ];
    const state: DeepPartial<StateSchema> = {
      financialGoal: {
        data: financialGoalListTest,
      },
    };

    expect(getFinancialGoalList(state as StateSchema)).toEqual(financialGoalListTest);
  });

  test('should return financialGoal modalInfo', () => {
    const financialGoal = {
      id: 1,
      name: 'Покупка машины',
      description: 'Коплю денег на покупку Audi RS7',
      deadline: '2023-07-25T05:41:14.549Z',
      amount: 12000000,
      totalAmount: 5660000,
      currency: {
        id: 4,
        code: 'JPY',
        name: 'Japanese Yen',
        symbol: '¥',
      },
    };

    const modalInfo = {
      modalData: financialGoal,
      modalIsOpened: true,
    };
    const state: DeepPartial<StateSchema> = {
      financialGoal: {
        data: [],
        isLoading: false,
        modalInfo,
      },
    };

    expect(getFinancialGoalModalInfo(state as StateSchema)).toEqual(modalInfo);
  });
});
