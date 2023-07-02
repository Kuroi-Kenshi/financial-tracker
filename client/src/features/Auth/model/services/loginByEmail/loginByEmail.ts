import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/loginSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';

interface LoginByEmail {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<UserSchema, LoginByEmail, ThunkConfig<string>>(
  'auth/loginByEmail',
  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<AuthResponse>('auth/login', authData);
      if (!response.data) {
        throw new Error();
      }

      dispatch(userActions.setUserData(response.data));
      setupInterceptor(response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
