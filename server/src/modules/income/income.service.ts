import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Prisma } from '@prisma/client';
import { IncomeFilterQuery } from './income.types';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createIncomeDto: CreateIncomeDto) {
    return await this.prisma.income.create({
      data: {
        ...createIncomeDto,
        userId,
      },
      select: {
        categoryIncome: true,
        currency: true,
        amount: true,
        date: true,
        description: true,
        id: true,
        name: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.income.findMany();
  }

  async findByFilter(query: IncomeFilterQuery, userId: number) {
    const filter = this.composeFilter(query, userId);
    const incomes = await this.prisma.income.findMany(filter);
    return incomes;
  }

  async findById(id: number, userId: number) {
    return await this.prisma.income.findFirst({
      where: { id, userId },
    });
  }

  async update(id: number, userId: number, updateIncomeDto: UpdateIncomeDto) {
    const updated = await this.prisma.income.updateMany({
      where: { id, userId },
      data: updateIncomeDto,
    });

    if (updated.count) {
      return this.prisma.income.findFirst({
        where: { id, userId },
        include: {
          categoryIncome: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          currency: true,
        },
      });
    }
  }

  async remove(id: number, userId: number) {
    const removed = await this.prisma.income.deleteMany({
      where: { id, userId },
    });

    if (removed.count) return { id };

    throw new BadRequestException('Неверный id для удаления');
  }

  private composeFilter(
    query: IncomeFilterQuery,
    userId: number,
  ): Prisma.IncomeFindManyArgs {
    const {
      dateFrom,
      dateTo,
      categoryIds = '',
      orderBy: orderByString = '',
      skip,
      take,
    } = query;
    const include: Prisma.IncomeInclude = {
      categoryIncome: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
      currency: true,
    };
    let filter: Prisma.IncomeFindManyArgs = {
      include,
      orderBy: { date: 'desc' },
    };
    let where: Prisma.IncomeWhereInput = { userId };

    const categoryIdsNumber = this.stringIdsToNumber(categoryIds);
    // const orderBy = this.getOrderBy(orderByString);

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

  private getOrderBy(string: string) {
    const [field, orderType] = string.split('_');

    return { [field]: orderType };
  }
}
