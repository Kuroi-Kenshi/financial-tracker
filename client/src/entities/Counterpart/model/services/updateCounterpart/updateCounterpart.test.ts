import axios, { AxiosError } from 'axios';
import { updateCounterpart } from './updateCounterpart';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('updateCounterpart thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  const data = {
    id: 1,
    name: 'Альфа-банк',
    description: 'Кредит',
  };

  test('updateCounterpart fulfilled', async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = updateCounterpart(data);
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('updateCounterpart rejected', async () => {
    const errorMessage = 'Не существует такой записи';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.patch.mockRejectedValue(error);

    const action = updateCounterpart(data);
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
