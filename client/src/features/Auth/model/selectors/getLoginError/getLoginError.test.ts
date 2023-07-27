import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getLoginError } from './getLoginError';

describe('getLoginError selector', () => {
  test('should return error message', () => {
    const state: DeepPartial<StateSchema> = {
      auth: {
        error: 'test error',
      },
    };

    expect(getLoginError(state as StateSchema)).toBe('test error');
  });

  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {
      auth: {},
    };

    expect(getLoginError(state as StateSchema)).toBeUndefined();
  });
});
