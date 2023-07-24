import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IncomeCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createIncomeCategoryDto: CreateIncomeCategoryDto,
  ) {
    const category = await this.prisma.incomeCategory.findUnique({
      where: {
        name: createIncomeCategoryDto.name,
      },
    });

    if (category) {
      throw new BadRequestException({
        message: 'Категория с таким именем уже существует',
      });
    }

    return await this.prisma.incomeCategory.create({
      data: {
        ...createIncomeCategoryDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.incomeCategory.findMany({
      where: { userId },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.prisma.incomeCategory.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: number,
    userId: number,
    updateIncomeCategoryDto: UpdateIncomeCategoryDto,
  ) {
    const updated = await this.prisma.incomeCategory.updateMany({
      where: { id, userId },
      data: updateIncomeCategoryDto,
    });

    if (updated.count) {
      return await this.prisma.incomeCategory.findFirst({
        where: { id },
      });
    }
  }

  async remove(id: number, userId: number) {
    const removed = await this.prisma.incomeCategory.deleteMany({
      where: { id, userId },
    });

    if (removed.count) return { id };

    throw new BadRequestException('Неверный id категории');
  }
}
