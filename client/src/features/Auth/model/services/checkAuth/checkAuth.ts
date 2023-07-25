import { UserSchema, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { setupInterceptor } from '@/shared/api/api';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const checkAuth = createAsyncThunk<UserSchema, void, ThunkConfig<string>>(
  'auth/refresh',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get('auth/refresh', {
        withCredentials: true,
      });

      dispatch(userActions.setUserData({ ...response.data, isAuth: true }));
      setupInterceptor(response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
