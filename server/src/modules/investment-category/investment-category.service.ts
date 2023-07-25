import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvestmentCategoryDto } from './dto/create-investment-category.dto';
import { UpdateInvestmentCategoryDto } from './dto/update-investment-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { InvestmentCategory } from '@prisma/client';

@Injectable()
export class InvestmentCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createInvestmentCategoryDto: CreateInvestmentCategoryDto,
  ): Promise<InvestmentCategory | undefined> {
    const category = await this.prisma.investmentCategory.findUnique({
      where: {
        name: createInvestmentCategoryDto.name,
      },
    });

    if (category) {
      throw new ConflictException({
        message: 'Категория с таким именем уже существует',
      });
    }

    return await this.prisma.investmentCategory.create({
      data: {
        ...createInvestmentCategoryDto,
        userId,
      },
    });
  }

  async findAll(userId: number): Promise<InvestmentCategory[] | undefined> {
    return await this.prisma.investmentCategory.findMany({
      where: { userId },
    });
  }

  async findById(
    id: number,
    userId: number,
  ): Promise<InvestmentCategory | undefined> {
    const category = await this.prisma.investmentCategory.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new NotFoundException({
        message: 'Категория не найдена',
      });
    }

    return category;
  }

  async update(
    id: number,
    userId: number,
    updateInvestmentCategoryDto: UpdateInvestmentCategoryDto,
  ) {
    return await this.prisma.investmentCategory.updateMany({
      where: { id, userId },
      data: updateInvestmentCategoryDto,
    });
  }

  async remove(id: number, userId: number) {
    return await this.prisma.investmentCategory.deleteMany({
      where: { id, userId },
    });
  }
}
