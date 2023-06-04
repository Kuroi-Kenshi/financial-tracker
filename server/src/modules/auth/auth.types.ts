import { ReturnableUserDto } from './dto/returnable-user.dto';

export type AuthData = {
  refreshToken: string;
  accessToken: string;
  user: ReturnableUserDto;
};

export type Tokens = {
  refreshToken: string;
  accessToken: string;
};

export type JwtPayload = {
  id: number;
  email: string;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
