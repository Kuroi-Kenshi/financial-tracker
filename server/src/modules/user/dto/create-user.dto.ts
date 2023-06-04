import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @MinLength(6, {
    message: 'Длина пароля должна быть не менее 6 символов',
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  avatarPath: string;
}
