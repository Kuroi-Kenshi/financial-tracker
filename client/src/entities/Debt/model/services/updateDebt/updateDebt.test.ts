import axios, { AxiosError } from 'axios';
import { updateDebt } from './updateDebt';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('updateDebt thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  const data = {
    id: 1,
    dueDate: '2023-07-12T19:00:09.720Z',
    startDate: '2023-07-12T19:00:09.720Z',
    currencyId: 4,
    name: 'Долг по кредитной карте',
    description: 'Долг по кредитной карте',
    amount: 4000,
    totalPayments: 0,
    status: CreditAndDebtStatus.ACTIVE,
    debtorId: 1,
  };

  test('updateDebt fulfilled', async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = updateDebt(data);
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('updateDebt rejected', async () => {
    const errorMessage = 'Не существует такой записи';
    const error = new AxiosError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.patch.mockRejectedValue(error);

    const action = updateDebt(data);
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
