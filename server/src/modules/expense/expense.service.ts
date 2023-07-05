import {
  BadRequestException,
  ConflictException,
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
    return await this.prisma.expense.updateMany({
      where: { id, userId },
      data: {
        ...updateExpenseDto,
      },
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.expense.deleteMany({
      where: { id, userId },
    });
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
    let filter: Prisma.ExpenseFindManyArgs = { include };
    let where: Prisma.ExpenseWhereInput = { userId };

    const categoryIdsNumber = this.stringIdsToNumber(categoryIds);
    const orderBy = this.getOrderBy(orderByString);

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

    if (orderBy) {
      filter = {
        ...filter,
        orderBy,
      };
    }

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

  private getOrderBy(string: string) {
    const [field, orderType] = string.split('_');

    return { [field]: orderType };
  }
}
