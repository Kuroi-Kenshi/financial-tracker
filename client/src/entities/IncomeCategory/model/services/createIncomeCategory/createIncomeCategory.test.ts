import axios, { AxiosError } from 'axios';
import { createIncomeCategory } from './createIncomeCategory';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('createIncomeCategory thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('createIncomeCategory fulfilled', async () => {
    const data = {
      id: 12,
      name: 'Трейдинг',
      color: '#fff',
      userId: 1,
    };
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = createIncomeCategory({
      color: '#fff',
      name: 'Трейдинг',
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('createIncomeCategory server rejected', async () => {
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

    const action = createIncomeCategory({
      color: '#fff',
      name: 'Трейдинг',
    });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
