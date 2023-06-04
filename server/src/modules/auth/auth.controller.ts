import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators';
import { isPublic } from 'src/decorators';
import { RtGuard } from 'src/guards';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
  @isPublic()
  async registration(@Body() dto: AuthDto, @Res() response: Response) {
    const { refreshToken, ...rest } = await this.authService.registration(dto);
    response.cookie('Authentication', refreshToken, {
      httpOnly: true,
    });
    return response.send(rest);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @isPublic()
  async login(@Body() dto: LoginDto, @Res() response: Response) {
    const { refreshToken, ...rest } = await this.authService.login(dto);
    response.cookie('Authentication', refreshToken, {
      httpOnly: true,
    });
    return response.send(rest);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser('id') id: number) {
    return this.authService.logout(id);
  }

  @isPublic()
  @UseGuards(RtGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async getNewTokens(
    @CurrentUser('refreshToken') refreshToken: string,
    @CurrentUser('email') email: string,
    @Res() response: Response,
  ) {
    const { refreshToken: newRefreshToken, ...rest } =
      await this.authService.getNewTokens(email, refreshToken);

    response.cookie('Authentication', newRefreshToken, {
      httpOnly: true,
    });

    return response.send(rest);
  }
}
