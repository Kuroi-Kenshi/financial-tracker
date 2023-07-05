import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/loginSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';
import { loginActions } from '../../slice/loginSlice';

export const checkAuth = createAsyncThunk<UserSchema, void, ThunkConfig<string>>(
  'auth/refresh',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      dispatch(loginActions.setLoading(true));
      const response = await extra.api.get('auth/refresh', {
        withCredentials: true,
      });

      if (!response?.data) {
        dispatch(loginActions.setLoading(false));
        throw new Error();
      }
      dispatch(loginActions.setLoading(false));
      dispatch(userActions.setUserData({ ...response.data, isAuth: true }));
      setupInterceptor(response.data.accessToken);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error');
    }
  }
);
