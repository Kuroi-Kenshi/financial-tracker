import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/loginSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const logout = createAsyncThunk<UserSchema, void, ThunkConfig<string>>(
  'auth/logout',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<AuthResponse>('auth/logout');

      dispatch(userActions.logout());
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
