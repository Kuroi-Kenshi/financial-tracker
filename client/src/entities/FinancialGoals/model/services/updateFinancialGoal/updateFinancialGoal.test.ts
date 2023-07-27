import axios, { AxiosError } from 'axios';
import { updateFinancialGoal } from './updateFinancialGoal';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('updateFinancialGoal thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  const data = {
    id: 5,
    deadline: '2023-07-22T18:55:35.977Z',
    currencyId: 4,
    name: 'test',
    description: '',
    amount: 1,
    totalAmount: 1,
  };

  test('updateFinancialGoal fulfilled', async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = updateFinancialGoal(data);
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('updateFinancialGoal rejected', async () => {
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

    const action = updateFinancialGoal(data);
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
