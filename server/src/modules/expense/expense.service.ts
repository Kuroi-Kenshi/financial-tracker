import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ExpenseFilterQuery } from './expense.types';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, createExpenseDto: CreateExpenseDto) {
    return await this.prisma.expense.create({
      data: {
        userId,
        ...createExpenseDto,
      },
      select: {
        categoryExpense: true,
        currency: true,
        amount: true,
        date: true,
        description: true,
        id: true,
        name: true,
        receipt: true,
      },
    });
  }

  async findByFilter(query: ExpenseFilterQuery, userId: number) {
    const filter = this.composeFilter(query, userId);
    const expenses = await this.prisma.expense.findMany(filter);

    return expenses;
  }

  async findById(id: number, userId: number) {
    const expense = await this.prisma.expense.findFirst({
      where: { id, userId },
      include: {
        categoryExpense: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        currency: true,
        receipt: {
          select: {
            fileName: true,
            filePath: true,
          },
        },
      },
    });

    if (!expense) {
      throw new NotFoundException(`Запись о тратах с id = ${id} не найдена`);
    }

    return expense;
  }

  async update(id: number, userId: number, updateExpenseDto: UpdateExpenseDto) {
    const updated = await this.prisma.expense.updateMany({
      where: { id, userId },
      data: {
        ...updateExpenseDto,
      },
    });

    if (updated.count) {
      return this.prisma.expense.findFirst({
        where: { id, userId },
        include: {
          categoryExpense: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          currency: true,
          receipt: {
            select: {
              fileName: true,
              filePath: true,
            },
          },
        },
      });
    }

    throw new BadRequestException(
      'У текущего пользователя нет записи с таким id',
    );
  }

  async remove(id: number, userId: number) {
    const removed = await this.prisma.expense.deleteMany({
      where: { id, userId },
    });

    if (removed.count) return { id };

    throw new BadRequestException('Неверный id для удаления');
  }

  private composeFilter(
    query: ExpenseFilterQuery,
    userId: number,
  ): Prisma.ExpenseFindManyArgs {
    const {
      dateFrom,
      dateTo,
      categoryIds = '',
      orderBy: orderByString = '',
      skip,
      take,
    } = query;
    const include: Prisma.ExpenseInclude = {
      categoryExpense: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
      receipt: {
        select: {
          fileName: true,
          filePath: true,
        },
      },
      currency: true,
    };
    let filter: Prisma.ExpenseFindManyArgs = {
      include,
      orderBy: { date: 'desc' },
    };
    let where: Prisma.ExpenseWhereInput = { userId };

    const categoryIdsNumber = this.stringIdsToNumber(categoryIds);
    // const orderBy: Prisma.SortOrder = this.getOrderBy(orderByString);

    if (categoryIds?.length) {
      where = {
        categoryId: { in: categoryIdsNumber },
      };
    }

    if (dateFrom && dateTo) {
      where = {
        ...where,
        date: {
          gte: dateFrom,
          lte: dateTo,
        },
      };
    }

    // if (orderBy) {
    //   filter = {
    //     ...filter,
    //     orderBy,
    //   };
    // }

    if (take) {
      filter = {
        ...filter,
        take: Number(take),
      };
    }

    if (skip) {
      filter = {
        ...filter,
        skip: Number(skip),
      };
    }

    if (Object.entries(where).length) {
      filter.where = where;
    }
    return filter;
  }

  private stringIdsToNumber(string: string): number[] {
    return string.split(',').map(id => {
      const numberId = Number(id);
      if (!isNaN(numberId)) {
        return numberId;
      }

      throw new BadRequestException(
        `Некорректное значение id категории = ${id}`,
      );
    });
  }

  private getOrderBy(string: string): Prisma.SortOrder {
    const [field, orderType] = string.split('_');

    if (!field) return Prisma.SortOrder.asc;

    return Prisma.SortOrder.asc;
  }
}
