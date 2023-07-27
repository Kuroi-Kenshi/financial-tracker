import { logout } from './model/services/logout/logout';
import { type AuthSchema, type AuthResponse } from './model/types/authSchema';
import { authReducer } from './model/slice/authSlice';
import { checkAuth } from './model/services/checkAuth/checkAuth';
import { getIsAuth } from './model/selectors/getIsAuth/getIsAuth';
import { getAuthIsLoading } from './model/selectors/getAuthIsLoading/getAuthIsLoading';

export {
  authReducer,
  type AuthSchema,
  type AuthResponse,
  checkAuth,
  getIsAuth,
  getAuthIsLoading,
  logout,
};
