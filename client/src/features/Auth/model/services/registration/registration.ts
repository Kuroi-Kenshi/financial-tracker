import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/authSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

interface Registration {
  email: string;
  password: string;
  name: string;
  avatarPath?: string;
}

export const registration = createAsyncThunk<void, Registration, ThunkConfig<string>>(
  'auth/registration',
  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post<AuthResponse>('auth/registration', authData);

      dispatch(userActions.setUserData(response.data));
      setupInterceptor(response.data.accessToken);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
