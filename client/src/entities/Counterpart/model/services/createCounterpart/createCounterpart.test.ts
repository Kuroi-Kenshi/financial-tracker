import axios, { AxiosError } from 'axios';
import { createCounterpart } from './createCounterpart';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('createCounterpart thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('createCounterpart fulfilled', async () => {
    const data = {
      id: 1,
      name: 'Банк',
      description: 'Counterpart test',
    };
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = createCounterpart({ name: 'Банк', description: 'Counterpart test' });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('createCounterpart server rejected', async () => {
    const errorMessage = 'Контрагент с таким именем уже существует';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(error);

    const action = createCounterpart({ name: 'Банк', description: 'Counterpart test' });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
