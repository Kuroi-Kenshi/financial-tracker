import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse } from '../../types/authSchema';
import { ThunkConfig } from '@/shared/types/StateSchema';
import { getErrorMessage } from '@/shared/libs/utils/getErrorMessage/getErrorMessage';

export const logout = createAsyncThunk<void, void, ThunkConfig<string>>(
  'auth/logout',
  async (_, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.get<AuthResponse>('auth/logout');

      if (response.status === 200) {
        dispatch(userActions.logout());
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
