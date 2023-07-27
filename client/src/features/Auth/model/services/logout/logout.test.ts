import axios, { AxiosError } from 'axios';
import { logout } from './logout';
import { type Dispatch } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('logout thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('logout fulfilled', async () => {
    const response = {
      status: 200,
    };

    mockedAxios.get.mockReturnValue(Promise.resolve(response));

    const action = logout();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(undefined);
  });

  test('logout server rejected', async () => {
    const errorMessage = 'Нет доступа';
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

    const action = logout();
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
