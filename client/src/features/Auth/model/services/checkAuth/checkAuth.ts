import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/loginSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';

export const checkAuth = createAsyncThunk<UserSchema, void, ThunkConfig<string>>(
  'auth/refresh',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<AuthResponse>('auth/refresh', {
        withCredentials: true,
      });
      if (!response.data) {
        throw new Error();
      }

      dispatch(userActions.setUserData({ ...response.data, isAuth: true }));
      setupInterceptor(response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
