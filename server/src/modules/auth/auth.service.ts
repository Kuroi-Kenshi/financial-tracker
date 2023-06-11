import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { ReturnableUserDto } from './dto/returnable-user.dto';
import { UserService } from '../user/user.service';
import { AuthData, Tokens } from './auth.types';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}
  async registration(dto: AuthDto, response: Response): Promise<Response> {
    const newUser = await this.userService.create(dto);
    const tokens = await this.generateTokens(newUser.id, newUser.email);
    await this.userService.updateRefreshToken(newUser.id, tokens.refreshToken);

    const responseData = {
      user: this.returnUserData(newUser),
      ...tokens,
    };
    return this.setAuthCookie(response, responseData);
  }

  async login(dto: LoginDto, response: Response): Promise<Response> {
    const user = await this.validateUser(dto);
    const tokens = await this.generateTokens(user.id, user.email);
    this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    const responseData = {
      user: this.returnUserData(user),
      ...tokens,
    };

    return this.setAuthCookie(response, responseData);
  }

  async logout(userId: number, response: Response) {
    await this.userService.removeRefreshToken(userId);
    response.clearCookie('Authentication');
    return response.sendStatus(200);
  }

  async getNewTokens(
    email: string,
    refreshToken: string,
    response: Response,
  ): Promise<Response> {
    const user = await this.userService.getByEmail(email);

    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Нет доступа');
    }

    const refreshTokenMatches = await verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Нет доступа');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    const responseData = {
      user: this.returnUserData(user),
      ...tokens,
    };

    this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return this.setAuthCookie(response, responseData);
  }

  private async generateTokens(userId: number, email: string): Promise<Tokens> {
    const data = { id: userId, email };

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRE'),
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
    });

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRE'),
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
    });

    return { accessToken, refreshToken };
  }

  private returnUserData(user: ReturnableUserDto) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarPath: user.avatarPath,
      balance: user.balance,
    };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Нет доступа');
    }

    const passwordMatches = await verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Нет доступа');
    }

    return user;
  }

  private setAuthCookie(response: Response, responseData: AuthData): Response {
    const { refreshToken, ...rest } = responseData;
    response.cookie('Authentication', refreshToken, {
      httpOnly: true,
    });

    return response.send(rest);
  }
}
