import { debtReducer } from './debtSlice';
import { Debt, DebtSchema } from '../types/debtSchema';
import { getDebt } from '../services/getDebt/getDebt';
import { UpdateDebt, updateDebt } from '../services/updateDebt/updateDebt';
import { deleteDebt } from '../services/deleteDebt/deleteDebt';
import { CreateDebt, createDebt } from '../services/createDebt/createDebt';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

describe('debtSlice', () => {
  const initialState: DebtSchema = {
    data: [],
    isLoading: false,
    error: undefined,
    modalInfo: {
      modalData: null,
      modalIsOpened: false,
    },
  };

  const debt1 = {
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
    debtor: {
      id: 2,
      name: 'Джон Смит',
      description: 'В долг на 1 месяц',
    },
  };
  const debt2 = {
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
    debtor: {
      id: 1,
      name: 'Альфа-банк',
      description: 'Кредит',
    },
  };

  test('getDebt.fulfilled', () => {
    const debtList = [
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
        debtor: {
          id: 1,
          name: 'Альфа-банк',
          description: 'Кредит',
          createdAt: '2023-07-12T19:00:10.126Z',
          updatedAt: '2023-07-12T19:00:10.126Z',
          userId: 1,
        },
      },
    ];
    const action = getDebt.fulfilled(debtList, '');

    const newState = debtReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual(debtList);
    expect(newState.error).toBeUndefined();
  });

  test('updateDebt.fulfilled', () => {
    const initialState: DebtSchema = {
      data: [debt1, debt2],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { debtor, currency, ...rest } = debt2;
    const updatedDebt: UpdateDebt = {
      ...rest,
      description: 'Updated debt 2',
      currencyId: 4,
      debtorId: 1,
    };
    const returnedDebt: Debt = {
      id: 2,
      name: 'Долг по кредитной карте',
      description: 'Updated debt 2',
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
      debtor: {
        id: 1,
        name: 'Альфа-банк',
        description: 'Кредит',
      },
    };
    const action = updateDebt.fulfilled(returnedDebt, '', updatedDebt);
    const newState = debtReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([debt1, returnedDebt]);
    expect(newState.error).toBeUndefined();
  });

  test('deleteDebt.fulfilled', () => {
    const initialState: DebtSchema = {
      data: [debt1, debt2],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const action = deleteDebt.fulfilled({ id: 1 }, '', 1);

    const newState = debtReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([debt2]);
    expect(newState.error).toBeUndefined();
  });

  test('createDebt.fulfilled', () => {
    const initialState: DebtSchema = {
      data: [debt1],
      isLoading: false,
      error: undefined,
      modalInfo: {
        modalData: null,
        modalIsOpened: false,
      },
    };
    const { debtor, currency, id, ...rest } = debt2;
    const newDebt: CreateDebt = {
      ...rest,
      currencyId: 4,
      debtorId: 1,
    };

    const action = createDebt.fulfilled(debt2, '', newDebt);
    const newState = debtReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([debt2, debt1]);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'debt/get/pending' };

    const newState = debtReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'debt/get/rejected', payload: 'Test error' };

    const newState = debtReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
