import { authActions, authReducer } from './authSlice';
import { AuthSchema } from '../types/authSchema';
import { configureStore } from '@reduxjs/toolkit';
import { checkAuth } from '../services/checkAuth/checkAuth';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { logout } from '../services/logout/logout';

describe('authSlice', () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  const initialState: AuthSchema = {
    isLoading: false,
    error: undefined,
  };

  test('checkAuth.fulfilled', () => {
    const initialState: AuthSchema = {
      isLoading: false,
      error: undefined,
    };

    const action = checkAuth.fulfilled(undefined, '');
    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  test('loginByEmail.fulfilled', () => {
    const initialState: AuthSchema = {
      isLoading: false,
      error: undefined,
    };

    const action = loginByEmail.fulfilled(undefined, '', {
      email: 'alex@mail.ru',
      password: '123123',
    });
    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  test('logout.fulfilled', () => {
    const initialState: AuthSchema = {
      isLoading: false,
      error: undefined,
    };

    const action = logout.fulfilled(undefined, '');
    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'auth/registration/pending' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'auth/logout/pending' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'auth/loginByEmail/pending' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'auth/checkAuth/pending' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'auth/registration/rejected', payload: 'Test error' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });

  test('matcher for rejected action', () => {
    const action = { type: 'auth/logout/rejected', payload: 'Test error' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });

  test('matcher for rejected action', () => {
    const action = { type: 'auth/loginByEmail/rejected', payload: 'Test error' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });

  test('matcher for rejected action', () => {
    const action = { type: 'auth/checkAuth/rejected', payload: 'Test error' };

    const newState = authReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
