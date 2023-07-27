import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/userSchema';
import { AuthResponse } from '@/features/Auth';

const initialState: UserSchema = {
  data: undefined,
  accessToken: undefined,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<AuthResponse>) => {
      state.data = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.data = undefined;
      state.isAuth = false;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
