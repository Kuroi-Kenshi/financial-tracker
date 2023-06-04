import { PrismaService } from 'src/modules/prisma/prisma.service';
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
    });
  }

  async findAll() {
    return await this.prisma.income.findMany();
  }

  async findByFilter(query: IncomeFilterQuery) {
    const filter = this.composeFilter(query);
    const incomes = await this.prisma.income.findMany(filter);
    return incomes;
  }

  async findById(id: number) {
    return await this.prisma.income.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return await this.prisma.income.update({
      where: { id },
      data: updateIncomeDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.income.delete({
      where: { id },
    });
  }

  private composeFilter(query: IncomeFilterQuery): Prisma.IncomeFindManyArgs {
    const {
      dateFrom,
      dateTo,
      categoryIds,
      orderBy: orderByString,
      skip,
      take,
    } = query;
    let filter: Prisma.IncomeFindManyArgs = {};
    let where: Prisma.IncomeWhereInput = {};

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
