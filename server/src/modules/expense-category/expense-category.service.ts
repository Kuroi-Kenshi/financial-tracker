import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from '../prisma/prisma.service';

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
      throw new BadRequestException({
        message: 'Категория с таким именем уже существует',
      });
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
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.expenseCategory.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    userId: number,
    updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return await this.prisma.expenseCategory.updateMany({
      where: { id, userId },
      data: updateExpenseCategoryDto,
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.expenseCategory.deleteMany({
      where: { id, userId },
    });
  }
}
