import { createSlice } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { checkAuth } from '../services/checkAuth/checkAuth';

const initialState: LoginSchema = {
  email: '',
  password: '',
  isLoading: false,
  error: '',
};

export const loginSlice = createSlice({
  name: 'login',
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

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
