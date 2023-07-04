import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/loginSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';

interface LoginByEmail {
  email: string;
  password: string;
}

export const logout = createAsyncThunk<UserSchema, void, ThunkConfig<string>>(
  'auth/logout',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<AuthResponse>('auth/logout');
      if (!response.data) {
        throw new Error();
      }
      dispatch(userActions.logout());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
