import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AtJwtStrategy, RtJwtStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RtJwtStrategy, AtJwtStrategy], // сервисы и другие провайдеры
  imports: [
    //сюда импортируем другие модули
    UserModule,
    ConfigModule,
    JwtModule.register({}),
  ],
})
export class AuthModule {}
