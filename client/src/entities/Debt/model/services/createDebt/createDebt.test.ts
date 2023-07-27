import axios, { AxiosError } from 'axios';
import { createDebt } from './createDebt';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('createDebt thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('createDebt fulfilled', async () => {
    const data = {
      id: 3,
      name: 'Test',
      description: 'test',
      amount: 1,
      createdAt: '2023-07-22T18:16:07.593Z',
      updatedAt: '2023-07-22T18:16:07.593Z',
      startDate: '2023-07-22T18:15:50.975Z',
      dueDate: '2023-07-22T18:19:02.913Z',
      status: 'ACTIVE',
      totalPayments: 0,
      creditor: {
        id: 2,
        name: 'Джон Смит',
        description: 'В долг на 1 месяц',
        createdAt: '2023-07-12T19:00:10.126Z',
        updatedAt: '2023-07-12T19:00:10.126Z',
        userId: 1,
      },
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    };
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = createDebt({
      dueDate: '2023-07-22T18:19:02.913Z',
      startDate: '2023-07-22T18:15:50.975Z',
      currencyId: 4,
      name: 'Test',
      description: 'test',
      amount: 1,
      totalPayments: 0,
      status: CreditAndDebtStatus.ACTIVE,
      debtorId: 2,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('createDebt server rejected', async () => {
    const errorMessage = 'Долг с таким именем уже существует';
    const error = new AxiosError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(error);

    const action = createDebt({
      dueDate: '2023-07-22T18:19:02.913Z',
      startDate: '2023-07-22T18:15:50.975Z',
      currencyId: 4,
      name: 'Test',
      description: 'test',
      amount: 1,
      totalPayments: 0,
      status: CreditAndDebtStatus.ACTIVE,
      debtorId: 2,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
