import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

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

  async findAll() {
    return await this.prisma.incomeCategory.findMany();
  }

  async findById(id: number) {
    return await this.prisma.incomeCategory.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateIncomeCategoryDto: UpdateIncomeCategoryDto) {
    return await this.prisma.incomeCategory.update({
      where: { id },
      data: updateIncomeCategoryDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.incomeCategory.delete({
      where: { id },
    });
  }
}
