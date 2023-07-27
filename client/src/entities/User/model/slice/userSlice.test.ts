import { configureStore } from '@reduxjs/toolkit';
import { userActions, userReducer } from './userSlice';

describe('authSlice', () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  const data = {
    user: {
      id: 1,
      email: 'user1@example.com',
      name: 'User 1',
      avatarPath: 'default-avatar.png',
      balance: 500,
    },
    accessToken: 'eyJhbGciOi.xNjkwMzEzOTcyfQ.iPCkeWvn0kpXXN6UgA-MDYowBVuBOSPHGCTVZo72NVo',
    isAuth: true,
  };

  test('setUserData', () => {
    store.dispatch(userActions.setUserData(data));

    expect(store.getState().user.accessToken).toBe(data.accessToken);
    expect(store.getState().user.data).toEqual(data.user);
    expect(store.getState().user.isAuth).toBeTruthy();
  });

  test('setUserData', () => {
    store.dispatch(userActions.logout());

    expect(store.getState().user.accessToken).toBeUndefined();
    expect(store.getState().user.data).toBeUndefined();
    expect(store.getState().user.isAuth).toBeFalsy();
  });
});
