import { createAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const setAccessTokenAction = createAction('user/setAccessToken', (accessToken) => {
  return { payload: accessToken };
});

export const setAccessToken = (accessToken: string) => {
  const dispatch = useDispatch();
  dispatch(setAccessTokenAction(accessToken));
};
