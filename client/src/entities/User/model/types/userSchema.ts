export interface User {
  id: number;
  email: string;
  name: string;
  avatarPath: string;
  balance: number;
}

export interface UserSchema {
  data?: User;
  accessToken?: string;
  isAuth: boolean;
}
