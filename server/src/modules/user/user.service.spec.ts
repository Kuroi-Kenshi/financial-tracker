import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ReturnableUserDto } from './dto/returnable-user.dto';

describe('UsersService', () => {
  let usersService: UserService;
  let findUniqueMock: jest.Mock;
  beforeEach(async () => {
    findUniqueMock = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: findUniqueMock,
            },
          },
        },
      ],
    }).compile();

    usersService = await module.get(UserService);
  });
  describe('when the getById function is called', () => {
    describe('and the findUnique method returns the user', () => {
      let user: User;
      let returnableUser: ReturnableUserDto;
      beforeEach(() => {
        user = {
          id: 1,
          email: 'user1@example.com',
          password:
            '$argon2id$v=19$m=65536,t=3,p=4$+KwC+ikngOprHMjje2xdZQ$Q7HJV7bfYna/sXYwHlao7Upc42c00MsFbQtIHCU4t7I',
          name: 'User 1',
          avatarPath: 'default-avatar.png',
          createdAt: new Date('2023-06-03T14:49:31.253Z'),
          updatedAt: new Date('2023-06-03T14:49:31.253Z'),
          balance: 500,
          hashedRefreshToken: null,
        };

        returnableUser = {
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          avatarPath: 'default-avatar.png',
          balance: 500,
        };

        findUniqueMock.mockResolvedValue(user);
      });
      it('should return the user', async () => {
        const result = await usersService.getById(user.id);
        expect(result).toEqual(returnableUser);
      });
    });
    describe('and the findUnique method does not return the user', () => {
      beforeEach(() => {
        findUniqueMock.mockResolvedValue(undefined);
      });
      it('should throw the NotFoundException', async () => {
        return expect(async () => {
          await usersService.getById(44);
        }).rejects.toThrow(NotFoundException);
      });
    });
  });
});
