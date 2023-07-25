import axios from 'axios';
import { getCounterpart } from './getCounterpart';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('getCounterpart thunk tests', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test('getCounterpart fulfilled', async () => {
    const data = [
      {
        id: 1,
        name: 'Альфа-банк',
        description: 'Кредит',
      },
      {
        id: 2,
        name: 'Джон Смит',
        description: 'В долг на 1 месяц',
      },
    ];
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data,
      })
    );
    const action = getCounterpart();
    const result = await action(dispatch, getState, { api: axios });

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
