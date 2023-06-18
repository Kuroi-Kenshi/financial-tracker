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
        ...createExpenseDto,
        userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.expense.findMany();
  }

  async findByFilter(query: ExpenseFilterQuery) {
    const filter = this.composeFilter(query);
    const expenses = await this.prisma.expense.findMany(filter);

    if (!expenses.length) {
      throw new NotFoundException('Нет данных');
    }
    return expenses;
  }

  async findById(id: number) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
      include: {
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
      },
    });

    if (!expense) {
      throw new NotFoundException(`Запись о тратах с id = ${id} не найдена`);
    }

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return await this.prisma.expense.update({
      where: { id },
      data: {
        ...updateExpenseDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.expense.delete({
      where: { id },
    });
  }

  private composeFilter(query: ExpenseFilterQuery): Prisma.ExpenseFindManyArgs {
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
    let where: Prisma.ExpenseWhereInput = {};

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
