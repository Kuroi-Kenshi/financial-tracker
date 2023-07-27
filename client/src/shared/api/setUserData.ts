import { userActions } from '@/entities/User';
import { type AuthResponse } from '@/features/Auth';
import { useDispatch } from 'react-redux';

export const setUserData = (userData: AuthResponse) => {
  const dispatch = useDispatch();
  return dispatch(userActions.setUserData(userData));
};
