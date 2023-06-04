import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { User } from '@prisma/client';
import { ReturnableUserDto } from './dto/returnable-user.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ReturnableUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new BadRequestException({
        message: 'Пользователь с таким email уже существует',
      });
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await hash(createUserDto.password),
        name: createUserDto.name,
      },
    });

    return this.getReturnableUser(newUser);
  }

  async getById(id: number): Promise<ReturnableUserDto | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'Пользователь не найден',
      });
    }

    return this.getReturnableUser(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'Пользователь не найден',
      });
    }

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateBalance(
    userId: number,
    updateUserBalanceDto: UpdateUserBalanceDto,
  ) {
    this.prisma.userBalance.updateMany({
      where: { userId, currencyId: updateUserBalanceDto.currencyId },
      data: {
        balance: updateUserBalanceDto.balance,
      },
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async removeRefreshToken(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
  }

  private getReturnableUser(user: User): ReturnableUserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarPath: user.avatarPath,
      balance: user.balance,
    };
  }
}
