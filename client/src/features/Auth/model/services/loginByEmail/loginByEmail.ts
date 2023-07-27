import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type AuthResponse } from '../../types/authSchema';
import { type ThunkConfig } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

interface LoginByEmail {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<void, LoginByEmail, ThunkConfig<string>>(
  'auth/loginByEmail',
  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<AuthResponse>('auth/login', authData);

      dispatch(userActions.setUserData(response.data));
      setupInterceptor(response.data.accessToken);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
