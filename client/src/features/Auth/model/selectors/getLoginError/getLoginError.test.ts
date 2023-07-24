import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';
import { getLoginError } from './getLoginError';

describe('getLoginError selector', () => {
  test('should return error message', () => {
    const state: DeepPartial<StateSchema> = {
      login: {
        error: 'test error',
      },
    };

    expect(getLoginError(state as StateSchema)).toBe('test error');
  });

  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {
      login: {},
    };

    expect(getLoginError(state as StateSchema)).toBeUndefined();
  });
});
