import { User } from '@/entities/User';

export interface LoginSchema {
  email: string;
  password: string;
  isLoading: boolean;
  error?: string;
}

//переделать ответ от сервера или структуру стейта
export interface AuthResponse {
  user: User;
  accessToken: string;
  isAuth: boolean;
}
