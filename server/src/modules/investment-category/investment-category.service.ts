import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvestmentCategoryDto } from './dto/create-investment-category.dto';
import { UpdateInvestmentCategoryDto } from './dto/update-investment-category.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
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
      throw new BadRequestException({
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

  async findAll(): Promise<InvestmentCategory[] | undefined> {
    return await this.prisma.investmentCategory.findMany();
  }

  async findById(id: number): Promise<InvestmentCategory | undefined> {
    const category = await this.prisma.investmentCategory.findUnique({
      where: { id },
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
    updateInvestmentCategoryDto: UpdateInvestmentCategoryDto,
  ): Promise<InvestmentCategory | undefined> {
    return await this.prisma.investmentCategory.update({
      where: { id },
      data: updateInvestmentCategoryDto,
    });
  }

  async remove(id: number): Promise<InvestmentCategory | undefined> {
    return await this.prisma.investmentCategory.delete({
      where: { id },
    });
  }
}
