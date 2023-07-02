import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/loginSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';

interface Registration {
  email: string;
  password: string;
  name: string;
  avatarPath?: string;
}

export const registration = createAsyncThunk<UserSchema, Registration, ThunkConfig<string>>(
  'auth/registration',
  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      console.log('authData', authData);

      const response = await extra.api.post<AuthResponse>('auth/registration', authData);
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
