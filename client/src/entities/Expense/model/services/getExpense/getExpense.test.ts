import axios, { AxiosError } from 'axios';
import { getExpense } from './getExpense';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { ExpenseReqType } from '../../types/expenseSchema';
import { expenseActions } from '../../slice/expenseSlice';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getExpense thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  const data = [
    {
      id: 12,
      name: 'test',
      description: '',
      amount: 1,
      date: '2023-07-22T18:38:45.608Z',
      categoryExpense: null,
      receipt: [],
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    },
    {
      id: 2,
      name: 'Бензин',
      description: '',
      amount: 1000,
      date: '2023-07-12T19:00:09.731Z',
      categoryExpense: {
        id: 2,
        name: 'Транспорт',
        color: '#FFC300',
      },
      receipt: [
        {
          fileName: 'receipt2.jpg',
          filePath: '/static/uploads/receipts/receipt2.jpg',
        },
      ],
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    },
  ];

  test('getExpense fulfilled', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getExpense({ mode: ExpenseReqType.NORMAL });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(expenseActions.setFilteredExpense(data));
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('getExpense fulfilled LastExpenses', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getExpense({ mode: ExpenseReqType.LAST_EXPENSES });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(expenseActions.setLastExpense(data));
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('getExpense fulfilled with query', async () => {
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const queryObj = { take: '10', limit: '20' };
    const action = getExpense({ mode: ExpenseReqType.NORMAL, query: queryObj });
    const result = await action(dispatch, getState, { api: axios });
    const expectedQuery = new URLSearchParams(queryObj).toString();

    expect(mockedAxios.get).toHaveBeenCalledWith(`expense?${expectedQuery}`);
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('getExpense rejected', async () => {
    const errorMessage = 'Error';
    const error = new AxiosError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockRejectedValue(error);

    const action = getExpense({ mode: ExpenseReqType.LAST_EXPENSES });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
