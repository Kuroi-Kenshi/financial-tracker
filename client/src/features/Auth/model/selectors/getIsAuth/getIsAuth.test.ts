import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';
import { getIsAuth } from './getIsAuth';

describe('getIsAuth selector', () => {
  test('should return false', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        isAuth: false,
      },
    };

    expect(getIsAuth(state as StateSchema)).toBeFalsy();
  });

  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        isAuth: true,
      },
    };

    expect(getIsAuth(state as StateSchema)).toBeTruthy();
  });
});
