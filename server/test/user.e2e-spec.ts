import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { UserModule } from '../src/modules/user/user.module';
import { UserService } from '../src/modules/user/user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockUserService = {
    getById: (id: number) => {
      if (id === 44) {
        throw new NotFoundException({
          message: 'Пользователь не найден',
        });
      }
      return {
        id: 1,
        name: 'User 1',
        email: 'user1@example.com',
        avatarPath: 'default-avatar.png',
        balance: 500,
      };
    },
  };
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user/getById (GET)', () => {
    return request(app.getHttpServer()).get('/user/1').expect(200).expect({
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
      avatarPath: 'default-avatar.png',
      balance: 500,
    });
  });

  it('/user/getById (GET) - fail', () => {
    return request(app.getHttpServer()).get('/user/44').expect(404).expect({
      message: 'Пользователь не найден',
    });
  });
});
