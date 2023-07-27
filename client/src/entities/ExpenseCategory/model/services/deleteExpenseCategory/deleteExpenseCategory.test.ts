import axios, { AxiosError } from 'axios';
import { deleteExpenseCategory } from './deleteExpenseCategory';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('deleteExpenseCategory thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('deleteExpenseCategory fulfilled', async () => {
    const data = {
      id: 1,
    };
    mockedAxios.delete.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = deleteExpenseCategory(1);
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.delete).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('deleteExpenseCategory rejected', async () => {
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
    mockedAxios.delete.mockRejectedValue(error);

    const action = deleteExpenseCategory(1);
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
