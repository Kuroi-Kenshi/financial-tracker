import axios, { AxiosError } from 'axios';
import { createExpenseCategory } from './createExpenseCategory';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('createExpenseCategory thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('createExpenseCategory fulfilled', async () => {
    const data = {
      id: 12,
      name: 'test',
      limitPerMonth: 3333,
      color: '#b51616',
    };
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = createExpenseCategory({
      color: '#b51616',
      name: 'test',
      limitPerMonth: 3333,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('createExpenseCategory server rejected', async () => {
    const errorMessage = 'Расход с таким именем уже существует';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(error);

    const action = createExpenseCategory({
      color: '#b51616',
      name: 'test',
      limitPerMonth: 3333,
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
