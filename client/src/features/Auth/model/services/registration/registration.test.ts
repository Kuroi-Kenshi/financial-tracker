import axios, { AxiosError } from 'axios';
import { registration } from './registration';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

jest.mock('@/shared/api/api', () => ({
  setupInterceptor: jest.fn(),
}));

describe('registration thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('registration fulfilled', async () => {
    const data = {
      user: {
        id: 1,
        email: 'user1@example.com',
        name: 'User 1',
        avatarPath: 'default-avatar.png',
        balance: 500,
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTY5MDMxMzA3MiwiZXhwIjoxNjkwMzEzOTcyfQ.iPCkeWvn0kpXXN6UgA-MDYowBVuBOSPHGCTVZo72NVo',
    };

    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        data,
      })
    );

    const action = registration({ email: 'test@mail.com', password: 'ALex123', name: 'Alex' });
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(undefined);
    expect(setupInterceptor).toHaveBeenCalled();
  });

  test('registration server rejected', async () => {
    const errorMessage = 'Нет доступа';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.post.mockRejectedValue(error);

    const action = registration({ email: 'test@mail.com', password: 'ALex123', name: 'Alex' });
    const result = await action(dispatch, getState, { api: axios });

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
