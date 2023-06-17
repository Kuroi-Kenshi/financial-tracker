import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { ExpenseModule } from '../src/modules/expense/expense.module';
import { ExpenseService } from '../src/modules/expense/expense.service';
import { ExpenseCategoryModule } from '../src/modules/expense-category/expense-category.module';
import { ExpenseCategoryService } from '../src/modules/expense-category/expense-category.service';

describe('ExpenseController (e2e)', () => {
  let app: INestApplication;
  let expenseId: number | null = null;
  const nonExistExpenseId = 44;
  const expenseMock = {
    id: 55,
    amount: 3333.44,
    name: 'Продукты',
    date: '2023-05-16T19:20:30.451Z',
    categoryId: 1,
    currencyId: 8,
  };
  const mockExpenseService = {
    create: () => expenseMock,

    findById: (id: number) => {
      if (id === nonExistExpenseId) {
        throw new NotFoundException(
          `Запись о тратах с id = ${nonExistExpenseId} не найдена`,
        );
      }
      return expenseMock;
    },
  };
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ExpenseModule, ExpenseCategoryModule],
    })
      .overrideProvider(ExpenseService)
      .useValue(mockExpenseService)
      .overrideProvider(ExpenseCategoryService)
      .useValue(() => 33)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/expense (POST)', async () => {
    return request(app.getHttpServer())
      .post('/expense')
      .send({
        amount: 3333.44,
        name: 'Продукты',
        date: '2023-05-16T19:20:30.451Z',
        categoryId: 1,
        currencyId: 8,
      })
      .expect(201)
      .then(({ body }: request.Response) => {
        expenseId = body.id;
        expect(expenseId).toBeDefined();
      });
  });

  it('/expense/1 (GET)', () => {
    return request(app.getHttpServer())
      .get(`/expense/${expenseId}`)
      .expect(200)
      .expect({
        id: expenseId,
        amount: 3333.44,
        name: 'Продукты',
        date: '2023-05-16T19:20:30.451Z',
        categoryId: 1,
        currencyId: 8,
      });
  });

  it('/expense/1 (GET)', () => {
    return request(app.getHttpServer())
      .get(`/expense/${expenseId}`)
      .expect(200)
      .expect({
        id: expenseId,
        amount: 3333.44,
        name: 'Продукты',
        date: '2023-05-16T19:20:30.451Z',
        categoryId: 1,
        currencyId: 8,
      });
  });

  it('/expense/1 (GET) - fail', () => {
    return request(app.getHttpServer())
      .get(`/expense/${nonExistExpenseId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `Запись о тратах с id = ${nonExistExpenseId} не найдена`,
        error: 'Not Found',
      });
  });
});
