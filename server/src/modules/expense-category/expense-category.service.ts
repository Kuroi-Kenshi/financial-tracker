import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

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

  async findAll() {
    const categories = await this.prisma.expenseCategory.findMany();

    if (!categories.length) {
      throw new NotFoundException('Не найдено');
    }

    return categories;
  }

  async findById(id: number) {
    return await this.prisma.expenseCategory.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return await this.prisma.expenseCategory.update({
      where: { id },
      data: updateExpenseCategoryDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.expenseCategory.delete({
      where: { id },
    });
  }
}
