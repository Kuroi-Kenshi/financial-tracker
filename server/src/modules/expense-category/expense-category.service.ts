import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExpenseCategoryFilterQuery } from './expense-category.types';

@Injectable()
export class ExpenseCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createExpenseCategoryDto: CreateExpenseCategoryDto,
  ) {
    const category = await this.prisma.expenseCategory.findUnique({
      where: {
        name: createExpenseCategoryDto.name,
      },
    });

    if (category) {
      throw new BadRequestException('Категория с таким именем уже существует');
    }

    return await this.prisma.expenseCategory.create({
      data: {
        ...createExpenseCategoryDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.expenseCategory.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.expenseCategory.findFirst({
      where: { id, userId },
    });
  }

  async findWithExpenses(
    userId: number,
    dateFilter: ExpenseCategoryFilterQuery,
  ) {
    const categoriesWithExpensesTemp =
      await this.prisma.expenseCategory.findMany({
        where: {
          userId,
          expenses: {
            every: {
              date: {
                gte: dateFilter.dateFrom,
                lte: dateFilter.dateTo,
              },
            },
          },
        },
        include: {
          expenses: true,
        },
      });

    const categoriesWithExpenses = categoriesWithExpensesTemp.map(
      ({ expenses, ...restCategory }) => {
        const totalExpense = expenses.reduce((total, expense) => {
          return total + expense.amount;
        }, 0);

        return { ...restCategory, totalExpense };
      },
    );

    return categoriesWithExpenses;
  }

  async update(
    id: number,
    userId: number,
    updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    const updated = await this.prisma.expenseCategory.updateMany({
      where: { id, userId },
      data: updateExpenseCategoryDto,
    });

    if (updated.count) {
      return await this.prisma.expenseCategory.findFirst({
        where: { id },
      });
    }
  }

  async remove(id: number, userId: number) {
    const removed = await this.prisma.expenseCategory.deleteMany({
      where: { id, userId },
    });

    if (removed.count) return { id };
  }
}
