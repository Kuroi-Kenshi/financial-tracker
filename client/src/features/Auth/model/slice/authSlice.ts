import { createSlice } from '@reduxjs/toolkit';
import { type AuthSchema } from '../types/authSchema';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { checkAuth } from '../services/checkAuth/checkAuth';
import { logout } from '../services/logout/logout';

const initialState: AuthSchema = {
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginByEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addMatcher(
        (action) => {
          const regex = /^auth\/.+\/pending$/;
          return regex.test(action.type);
        },
        (state) => {
          state.error = undefined;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
          const regex = /^auth\/.+\/rejected$/;
          return regex.test(action.type);
        },
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
