import { type DeepPartial } from '@reduxjs/toolkit';
import { type StateSchema } from '@/shared/types/StateSchema';
import { getAuthIsLoading } from './getAuthIsLoading';

describe('getAuthIsLoading selector', () => {
  test('should return false', () => {
    const state: DeepPartial<StateSchema> = {
      auth: {
        isLoading: false,
      },
    };

    expect(getAuthIsLoading(state as StateSchema)).toBeFalsy();
  });

  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      auth: {
        isLoading: true,
      },
    };

    expect(getAuthIsLoading(state as StateSchema)).toBeTruthy();
  });
});
