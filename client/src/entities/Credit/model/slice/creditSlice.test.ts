import { creditReducer } from './creditSlice';
import { Credit, CreditSchema } from '../types/creditSchema';
import { getCredit } from '../services/getCredit/getCredit';
import { UpdateCredit, updateCredit } from '../services/updateCredit/updateCredit';
import { deleteCredit } from '../services/deleteCredit/deleteCredit';
import { CreateCredit, createCredit } from '../services/createCredit/createCredit';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

describe('creditSlice', () => {
  const initialState: CreditSchema = {
    data: [],
    isLoading: false,
    error: undefined,
    modalInfo: {
      modalData: null,
      modalIsOpened: false,
    },
  };

  const credit1 = {
    id: 1,
    name: 'Test',
    description: 'test',
    amount: 1,
    startDate: '2023-07-22T18:15:50.975Z',
    dueDate: '2023-07-22T18:19:02.913Z',
    status: CreditAndDebtStatus.ACTIVE,
    totalPayments: 0,
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
    creditor: {
      id: 2,
      name: 'Джон Смит',
      description: 'В долг на 1 месяц',
    },
  };
  const credit2 = {
    id: 2,
    name: 'Долг по кредитной карте',
    description: 'Долг по кредитной карте',
    amount: 4000,
    startDate: '2023-07-12T19:00:09.720Z',
    dueDate: '2023-07-12T19:00:09.720Z',
    status: CreditAndDebtStatus.ACTIVE,
    totalPayments: 0,
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
    creditor: {
      id: 1,
      name: 'Альфа-банк',
      description: 'Кредит',
    },
  };

  test('getCredit.fulfilled', () => {
    const creditList = [
      {
        id: 1,
        name: 'Долг по кредитной карте',
        description: 'Долг по кредитной карте',
        amount: 5000,
        createdAt: '2023-07-12T19:00:10.140Z',
        updatedAt: '2023-07-12T19:00:10.140Z',
        startDate: '2023-07-12T19:00:09.720Z',
        dueDate: '2023-07-12T19:00:09.720Z',
        status: CreditAndDebtStatus.ACTIVE,
        totalPayments: 0,
        currency: {
          id: 4,
          code: 'RUB',
          name: 'Russian Ruble',
          symbol: '₽',
        },
        creditor: {
          id: 1,
          name: 'Альфа-банк',
          description: 'Кредит',
          createdAt: '2023-07-12T19:00:10.126Z',
          updatedAt: '2023-07-12T19:00:10.126Z',
          userId: 1,
        },
      },
    ];
    const action = getCredit.fulfilled(creditList, '');

    const newState = creditReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual(creditList);
    expect(newState.error).toBeUndefined();
  });

  test('updateCredit.fulfilled', () => {
    const initialState: CreditSchema = {
      data: [credit1, credit2],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { creditor, currency, ...rest } = credit2;
    const updatedCredit: UpdateCredit = {
      ...rest,
      description: 'Updated credit 2',
      currencyId: 4,
      creditorId: 1,
    };
    const returnedCredit: Credit = {
      id: 2,
      name: 'Долг по кредитной карте',
      description: 'Updated credit 2',
      amount: 4000,
      startDate: '2023-07-12T19:00:09.720Z',
      dueDate: '2023-07-12T19:00:09.720Z',
      status: CreditAndDebtStatus.ACTIVE,
      totalPayments: 0,
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
      creditor: {
        id: 1,
        name: 'Альфа-банк',
        description: 'Кредит',
      },
    };
    const action = updateCredit.fulfilled(returnedCredit, '', updatedCredit);
    const newState = creditReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([credit1, returnedCredit]);
    expect(newState.error).toBeUndefined();
  });

  test('deleteCredit.fulfilled', () => {
    const initialState: CreditSchema = {
      data: [credit1, credit2],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const action = deleteCredit.fulfilled({ id: 1 }, '', 1);

    const newState = creditReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([credit2]);
    expect(newState.error).toBeUndefined();
  });

  test('createCredit.fulfilled', () => {
    const initialState: CreditSchema = {
      data: [credit1],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { creditor, currency, id, ...rest } = credit2;
    const newCredit: CreateCredit = {
      ...rest,
      currencyId: 4,
      creditorId: 1,
    };

    const action = createCredit.fulfilled(credit2, '', newCredit);
    const newState = creditReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([credit2, credit1]);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'credit/get/pending' };

    const newState = creditReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'credit/get/rejected', payload: 'Test error' };

    const newState = creditReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
